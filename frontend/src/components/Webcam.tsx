import React, { useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import axios from 'axios';

interface WebcamCaptureProps {
  mode: 'register' | 'login' | null;
  onSuccessfulLogin?: (userId: string) => void; // Callback prop for successful login
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ mode, onSuccessfulLogin }) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  };

  useEffect(() => {
    loadModels();
  }, []);

  const capture = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video && canvasRef.current) {
      const video = webcamRef.current.video as HTMLVideoElement;

      if (!video.videoWidth || !video.videoHeight) {
        console.error('Video dimensions are not available.');
        return;
      }

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (mode === 'login' && detections.length > 0) {
        const descriptor = detections[0].descriptor;

        if (!descriptor || descriptor.length === 0) {
          console.error('Face descriptor is missing or empty.');
          return;
        }

        try {
          const response = await axios.get('http://localhost:5000/api/employeeDescriptors');
          const employees = response.data;

          const labeledDescriptors = employees.map((employee: any) => {
            if (!employee.descriptor || employee.descriptor.length === 0) {
              console.warn(`Missing or empty descriptor for employee ${employee.name}`);
              return null;
            }
            return new faceapi.LabeledFaceDescriptors(
              employee.name,
              [new Float32Array(employee.descriptor)] // Use descriptor from the database
            );
          }).filter(Boolean);

          if (labeledDescriptors.length === 0) {
            console.error('No valid descriptors available for matching.');
            return;
          }

          const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors as faceapi.LabeledFaceDescriptors[], 0.6);
          const bestMatch = faceMatcher.findBestMatch(new Float32Array(descriptor));

          if (bestMatch.label !== 'unknown' && bestMatch.distance < 0.6) {
            if (onSuccessfulLogin) {
              // Pass the user ID to the onSuccessfulLogin callback
              onSuccessfulLogin(bestMatch.label); 
            }
          } else {
            console.warn('No matching face found or distance too high.');
          }
        } catch (error) {
          console.error('Error comparing faces:', error);
        }
      }

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.innerHTML = faceapi.createCanvasFromMedia(video).outerHTML;
        faceapi.matchDimensions(canvas, {
          width: video.videoWidth,
          height: video.videoHeight,
        });
        const resizedDetections = faceapi.resizeResults(detections, {
          width: video.videoWidth,
          height: video.videoHeight,
        });
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }
    }
  }, [webcamRef, canvasRef, mode, onSuccessfulLogin]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mode) {
        capture();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [capture, mode]);

  return (
    <div className="flex justify-center items-center">
      <div
        className="relative rounded-full overflow-hidden border-4 border-black"
        style={{ width: 400, height: 400 }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 400,
            height: 400,
            facingMode: 'user',
          }}
          className="rounded-full"
        />
        <canvas ref={canvasRef} className="absolute top-0 left-0 rounded-full" />
      </div>
    </div>
  );
};

export default WebcamCapture;

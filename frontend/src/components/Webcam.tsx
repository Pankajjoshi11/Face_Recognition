import React, { useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import axios from 'axios';

interface WebcamCaptureProps {
  mode: 'login' | null;
  onSuccess: () => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ mode, onSuccess }) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  const capture = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video && canvasRef.current) {
      const video = webcamRef.current.video as HTMLVideoElement;
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (mode === 'login' && detections.length > 0) {
        const descriptor = detections[0].descriptor;
        try {
          const response = await axios.get('http://localhost:5000/api/employeeDescriptors');
          const employees = response.data;

          if (employees.length === 0) {
            alert('No employee descriptors found. Please contact support.');
            return;
          }

          const descriptorLength = descriptor.length;
          const labeledDescriptors = employees.map((employee: any) => {
            if (!employee.descriptor) {
              console.warn(`Missing descriptor for employee ${employee.name}`);
              return null;
            }
            if (employee.descriptor.length !== descriptorLength) {
              console.warn(`Descriptor length mismatch for employee ${employee.name}`);
              return null;
            }
            return new faceapi.LabeledFaceDescriptors(
              employee.name,
              [new Float32Array(employee.descriptor)]
            );
          }).filter(Boolean);

          if (labeledDescriptors.length === 0) {
            alert('No valid face descriptors found. Please contact support.');
            return;
          }

          const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
          const bestMatch = faceMatcher.findBestMatch(new Float32Array(descriptor));

          if (bestMatch.label !== 'unknown' && bestMatch.distance < 0.6) {
            alert(`Welcome, ${bestMatch.label}!`);
            onSuccess();
          } else {
            alert('Face not recognized');
          }
        } catch (error) {
          console.error('Error comparing faces:', error);
          alert('An error occurred while comparing faces. Please try again later.');
        }
      }

      const canvas = canvasRef.current;
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
  }, [webcamRef, canvasRef, mode, onSuccess]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mode) {
        capture();
      }
    }, 1000);
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

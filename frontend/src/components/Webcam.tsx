import React, { useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import axios from 'axios';

interface WebcamCaptureProps {
  mode: 'register' | 'login' | null;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ mode }) => {
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
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (mode === 'register' && detections.length > 0) {
        const descriptor = detections[0].descriptor;
        const name = prompt('Enter your name:');
        if (name) {
          await axios.post('/api/register', { name, faceDescriptor: descriptor });
          alert('Face registered successfully');
        }
      } else if (mode === 'login' && detections.length > 0) {
        const descriptor = detections[0].descriptor;
        const response = await axios.get('/api/employeeDescriptors');
        const employees = response.data;

        const labeledDescriptors = employees.map((employee: any) => {
          return new faceapi.LabeledFaceDescriptors(employee.name, [new Float32Array(employee.faceDescriptor)]);
        });

        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
        const bestMatch = faceMatcher.findBestMatch(new Float32Array(descriptor));
        
        if (bestMatch.label !== 'unknown' && bestMatch.distance < 0.6) {
          alert(`Welcome, ${bestMatch.label}!`);
        } else {
          alert('Face not recognized');
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
  }, [webcamRef, canvasRef, mode]);

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

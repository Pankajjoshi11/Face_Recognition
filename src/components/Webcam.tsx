'use client'
import React, { useRef, useEffect, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [descriptors, setDescriptors] = useState<any[]>([]); // Store registered face descriptors
  const [faceMatcher, setFaceMatcher] = useState<faceapi.FaceMatcher | null>(null); // Face matcher instance

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  };

  useEffect(() => {
    loadModels();
  }, []);

  const registerFace = async () => {
    if (webcamRef.current && webcamRef.current.video) {
      const video = webcamRef.current.video as HTMLVideoElement;
      const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

      if (detection) {
        const descriptor = detection.descriptor;
        const newDescriptors = [...descriptors, descriptor];
        setDescriptors(newDescriptors);

        // Update the face matcher with the new descriptors
        const labeledDescriptors = newDescriptors.map((desc, index) => new faceapi.LabeledFaceDescriptors(`Person ${index + 1}`, [desc]));
        setFaceMatcher(new faceapi.FaceMatcher(labeledDescriptors));
        console.log('Face registered', descriptor);
      }
    }
  };

  const capture = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video && canvasRef.current) {
      const video = webcamRef.current.video as HTMLVideoElement;
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

      const canvas = canvasRef.current;
      canvas.innerHTML = faceapi.createCanvasFromMedia(video).outerHTML;
      faceapi.matchDimensions(canvas, {
        width: video.videoWidth,
        height: video.videoHeight
      });
      const resizedDetections = faceapi.resizeResults(detections, {
        width: video.videoWidth,
        height: video.videoHeight
      });
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      if (faceMatcher) {
        resizedDetections.forEach(detection => {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          console.log(bestMatch.toString());
        });
      }
    }
  }, [webcamRef, canvasRef, faceMatcher]);

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 100);
    return () => clearInterval(interval);
  }, [capture]);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="relative rounded-full overflow-hidden border-4 border-black" style={{ width: 400, height: 400 }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 400,
            height: 400,
            facingMode: 'user'
          }}
          className="rounded-full"
        />
        <canvas ref={canvasRef} className="absolute top-0 left-0 rounded-full" />
      </div>
      <button onClick={registerFace} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Register Face
      </button>
    </div>
  );
};

export default WebcamCapture;

import { useState } from 'react';
import WebcamCapture from "@/components/Webcam";
import scan from '../assets/images/scan.png';
import SubmitButton from '@/components/SubmitButton';

const Scan = () => {
  const [mode, setMode] = useState<'register' | 'login' | null>(null);

  return (
    <div className="flex-col max-h-screen">
      <div className="relative flex justify-center items-center ">
        <img
          src={scan}
          alt="Background circle"
          className="absolute z-0"
          style={{ width: 430, height: 430 }} 
        />
        <div className="relative z-10">
          {mode && <WebcamCapture mode={mode} />}
        </div>
      </div>
      <div className="flex-col relative items-center text-center text-white text-xl mt-16">
        <p>Move your head slowly to complete</p>
        <p>the circle</p>
      </div>
      <div className="flex justify-center mt-4">
        <SubmitButton
          onClick={() => setMode('register')}
          className="m-2 bg-blue-500 text-white z-10"
        >
          Register
        </SubmitButton>
        <SubmitButton
          onClick={() => setMode('login')}
          className="m-2 bg-green-500 text-white z-10"
        >
          Login
        </SubmitButton>
      </div>
      <div className="">
        {/* progress bar and loader */}
      </div>
    </div>
  );
};

export default Scan;

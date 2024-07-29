import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import WebcamCapture from '@/components/Webcam';
import SubmitButton from '@/components/SubmitButton';
import scan from '../assets/images/scan.png';

const Scan: React.FC = () => {
  const [mode, setMode] = useState< 'login' | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle successful login
  const handleSuccessfulLogin = (employeeId: string) => {
    console.log(`Redirecting to /successful/${employeeId}`);
    navigate(`/successful/${employeeId}`); // Redirect to the Successful page with user ID
  };
  

  return (
    <div className="flex-col max-h-screen">
      <div className="relative flex justify-center items-center">
        <img
          src={scan}
          alt="Background circle"
          className="absolute z-0"
          style={{ width: 430, height: 430 }}
        />
        <div className="relative z-10">
          <WebcamCapture mode={mode} onSuccessfulLogin={handleSuccessfulLogin} /> {/* Pass handler */}
        </div>
      </div>
      <div className="flex-col relative items-center text-center text-white text-xl mt-16">
        <p>Move your head slowly to complete</p>
        <p>the circle</p>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        {/* <SubmitButton onClick={() => setMode('register')} className="bg-blue-500">
          Register
        </SubmitButton> */}
        <SubmitButton onClick={() => setMode('login')} className="bg-green-500">
          Login
        </SubmitButton>
      </div>
    </div>
  );
};

export default Scan;

import centerImage from '../assets/images/main/centerImage.png';
import bgmain from '../assets/images/main/bgmain.png';
import {useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import SubmitButton from '@/components/SubmitButton';

const Main = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleStartAttendance = () => {
    navigate('/scan'); // Navigate to successful page
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen text-white p-4">
        <div className="relative items-center text-center justify-between m-1/2 md:h-80">
            <img
              src={centerImage}
              alt="face"
              className='h-full mb-4 md:h-120 sm:h-120'
            />
        </div>
            
        <div className="relative text-white text-center items-center">
            <h1 className='text-4xl font-bold'>Face <span className='text-orange-600'>ID</span></h1>
        </div>
        
        <div className="relative flex-col items-center text-center m-4 gap-2 p-2 md:text-lg">
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text </p>
            <p>commonly used to demonstrate the visual form of a document or a</p>
            <p> typeface without relying on meaningful content.</p>
        </div>
        
        <div className="relative items-center text-lg z-10">
          <SubmitButton 
            onClick={handleStartAttendance}
            className='p-2 font-bold bg-orange-600 text-lg px-4 hover:bg-orange-400 border border-white'>
            Start face attendance
          </SubmitButton>
        </div>
        
        <div className=" absolute">
            <img src={bgmain} 
                alt=""
            />
        </div>
      </div>
    </div>
  );
};

export default Main;

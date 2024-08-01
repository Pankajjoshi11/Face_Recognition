import WebcamCapture from "@/components/Webcam";
import scan from '../assets/images/scan.png';

const Scan = () => {
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
            <WebcamCapture mode='login'/>
        </div>
        </div>
        <div className="flex-col relative items-center text-center text-white text-xl mt-16">
            <p>Move your head slowly to complet</p>
            <p>the circle</p>
        </div>
        <div className="">
            {/* progress bar and loader */}
        </div>
    </div>
  );
};

export default Scan;

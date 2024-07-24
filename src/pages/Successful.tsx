import bgSuccess from '../assets/images/success/bgSuccess.png'
import john from '../assets/images/success/john.png'
import RightDropdown from '@/components/RightDropdown'
const Successful = () => {
  return (
    <div className="text-white flex-col">
      <div className="">
        <RightDropdown/>
      </div>
      <div className="flex-col m-2 p-2 justify-center ">
        <h1 className='text-orange-600 gap-2 text-4xl'>Successful!</h1>
        <div className="flex text-xl p-2 m-2 text-center justify-center ">
            <p>Face Detected.</p>
            <p>ID confirmed.</p>
        
            
        </div>
        <div className="flex flex-col items-center justify-center mt-16 mb-4 z-5">
            <img src={john} 
                alt="" 
            />
        </div>
        <div className="absolute top-3/4 md:top-1/2 xl:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <img src={bgSuccess} 
                alt=""
                className='w-full'
                style={{ maxHeight: '600px' }} />
        {/*size of the background image is not changing whatever i do*/}
        {/*position of absoulte image is a big issue*/}
        </div>
            <div className="relative font-bold text-lg">
                <p>Employee: <span className='text-orange-600'>Thomas Jackson</span></p>
            </div>
        </div>
        <section className='flex-col bg-customBlue border font-bold border-white rounded-md mx-16 my-8'>
            <div className="flex justify-between m-6 px-6">
                <div className="flex-col text-white p-2">
                    <h3 className='flex justify-between pb-2'>Date</h3>
                    <h3 className='text-orange-600'>3rd May, 2024</h3>
                </div>
                <div className="flex-col text-white justify-between  p-2">
                    <h3 className='flex justify-between pb-2'>In Time</h3>
                    <h3 className='text-orange-600'>3rd May, 2024</h3>
                </div>
                <div className="flex-col text-white justify-between  p-2">
                    <h3 className='flex justify-between pb-2'>Out Time</h3>
                    <h3 className='text-orange-600'>3rd May, 2024</h3>
                </div>
            </div>
            <div className="flex justify-between m-6 px-6">
                <div className="flex-col text-white  p-2">
                    <h3 className='flex justify-between pb-2'>Employee Id</h3>
                    <h3 className='text-orange-600'>3rd May, 2024</h3>
                </div>
                <div className="flex-col text-white  p-2">
                    <h3 className='flex justify-between pb-2'>Designation</h3>
                    <h3 className='text-orange-600'>3rd May, 2024</h3>
                </div>
                <div className="flex-col text-white p-2">
                    <h3 className='flex justify-between pb-2'>Age</h3>
                    <h3 className='text-orange-600'>3rd May, 2024</h3>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Successful

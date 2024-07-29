import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import bgSuccess from '../assets/images/success/bgSuccess.png';
import john from '../assets/images/success/john.png'; // Replace with dynamic image if available
import RightDropdown from '@/components/RightDropdown';

const Successful: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employee, setEmployee] = useState<{
    name: string;
    designation: string;
    employeeId: string;
    age: number;
    image: string; // URL or path to employee image
  } | null>(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employeeDescriptors/${employeeId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    if (employeeId) {
      fetchEmployeeDetails();
    }
  }, [employeeId]);

  if (!employee) {
    return <div>Loading...</div>; // Or a loading spinner/component
  }

  return (
    <div className="text-white flex-col">
      <div>
        <RightDropdown />
      </div>
      <div className="flex-col m-2 p-2 justify-center">
        <h1 className='text-orange-600 gap-2 text-4xl'>Successful!</h1>
        <div className="flex text-xl p-2 m-2 text-center justify-center">
          <p>Face Detected.</p>
          <p>ID confirmed.</p>
        </div>
        <div className="flex flex-col items-center justify-center mt-16 mb-4 z-5">
          <img 
            src={employee.image || john} // Display employee image or fallback image
            alt={`${employee.name}'s profile`} 
          />
        </div>
        <div className="absolute top-3/4 md:top-1/2 xl:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img 
            src={bgSuccess} 
            alt="Success Background"
            className='w-full'
            style={{ maxHeight: '600px' }} 
          />
        </div>
        <div className="relative font-bold text-lg">
          <p>Employee: <span className='text-orange-600'>{employee.name}</span></p>
        </div>
        <section className='flex-col bg-customBlue border font-bold border-white rounded-md mx-16 my-8'>
          <div className="flex justify-between m-6 px-6">
            <div className="flex-col text-white p-2">
              <h3 className='flex justify-between pb-2'>Date</h3>
              <h3 className='text-orange-600'>3rd May, 2024</h3> {/* Replace with actual date */}
            </div>
            <div className="flex-col text-white justify-between p-2">
              <h3 className='flex justify-between pb-2'>In Time</h3>
              <h3 className='text-orange-600'>3rd May, 2024</h3> {/* Replace with actual in time */}
            </div>
            <div className="flex-col text-white justify-between p-2">
              <h3 className='flex justify-between pb-2'>Out Time</h3>
              <h3 className='text-orange-600'>3rd May, 2024</h3> {/* Replace with actual out time */}
            </div>
          </div>
          <div className="flex justify-between m-6 px-6">
            <div className="flex-col text-white p-2">
              <h3 className='flex justify-between pb-2'>Employee Id</h3>
              <h3 className='text-orange-600'>{employee.employeeId}</h3>
            </div>
            <div className="flex-col text-white p-2">
              <h3 className='flex justify-between pb-2'>Designation</h3>
              <h3 className='text-orange-600'>{employee.designation}</h3>
            </div>
            <div className="flex-col text-white p-2">
              <h3 className='flex justify-between pb-2'>Age</h3>
              <h3 className='text-orange-600'>{employee.age}</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Successful;

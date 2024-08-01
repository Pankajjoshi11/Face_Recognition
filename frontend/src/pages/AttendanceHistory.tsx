import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import RightDropdown from '@/components/RightDropdown';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface AttendanceRecord {
  date: string;
  checkInTime: string;
  checkOutTime: string | null;
}

const AttendanceHistory: React.FC = () => {
  const location = useLocation();
  const employeeId = location.state?.employeeId as string; // Explicitly type as string
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeeDesignation, setEmployeeDesignation] = useState<string>("");

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get<AttendanceRecord[]>(`https://face-recognition-pcdq.onrender.com/api/attendance/${employeeId}`);
        setAttendanceRecords(response.data);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get('https://face-recognition-pcdq.onrender.com/api/employees/employeeDescriptors');
        const foundEmployee = response.data.find((emp: any) => emp.employeeId === employeeId);
        if (foundEmployee) {
          setEmployeeName(foundEmployee.name);
          setEmployeeDesignation(foundEmployee.designation);
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    if (employeeId) {
      fetchEmployeeDetails();
      fetchAttendanceRecords();
    }
  }, [employeeId]);

  return (
    <div className="flex flex-col relative text-white">
      <div>
        <RightDropdown onViewAttendance={() => {}} /> {/* Dummy function since it's already handled */}
      </div>
      <div className="relative text-2xl font-bold mt-6">
        <h1>Welcome {employeeName}</h1>
      </div>
      <div className="relative font-bold text-lg">
        <p>
          Employee: <span className="text-orange-600">{employeeName}</span>
        </p>
        <p>Designation: {employeeDesignation}</p>
      </div>
      <div className="text-center m-2 p-2">
        <Table className="border text-white rounded-md">
          <TableHeader className="justify-center text-center">
            <TableRow>
              <TableHead className="text-orange-600 text-xl text-center">Date</TableHead>
              <TableHead className="text-orange-600 text-xl text-center">Check-in Time</TableHead>
              <TableHead className="text-orange-600 text-xl text-center">Check-out Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceRecords.map((record, index) => (
              <TableRow key={index} className="bg-white text-customBlue">
                <TableCell className="text-lg font-medium">{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-lg font-medium">{new Date(record.checkInTime).toLocaleTimeString()}</TableCell>
                <TableCell className="text-lg font-medium">{record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString() : "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AttendanceHistory;


const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
    },
  });
  
  module.exports = mongoose.model('Attendance', attendanceSchema);
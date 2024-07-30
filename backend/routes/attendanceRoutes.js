const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Check-in route
router.post('/checkin', async (req, res) => {
  const { employeeId } = req.body;

  try {
    const newCheckIn = new Attendance({ employeeId, checkInTime: new Date() });
    await newCheckIn.save();
    res.status(201).json(newCheckIn);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:employeeId', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ employeeId: req.params.employeeId }).sort({ date: -1 });
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// Endpoint to register a new face descriptor
router.post('/register', async (req, res) => {
  const { name, age, designation, employeeId, descriptor } = req.body;

  try {
    const newEmployee = new Employee({ name, age, designation, employeeId, descriptor });
    await newEmployee.save();
    res.status(201).send('Employee registered successfully');
  } catch (error) {
    res.status(500).send('Error registering employee');
  }
});

// Endpoint to fetch all employee details
router.get('/employeeDescriptors', async (req, res) => {
  try {
    const employees = await Employee.find({}, 'name age designation employeeId descriptor');
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send('Error retrieving employee descriptors');
  }
});

module.exports = router;

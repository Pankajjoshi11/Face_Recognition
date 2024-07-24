const mongoose = require('mongoose');

// Define the schema for the Employee
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  designation: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  descriptor: { type: [Number], required: true } // Array of numbers for face descriptors
});

// Create a model for the Employee
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

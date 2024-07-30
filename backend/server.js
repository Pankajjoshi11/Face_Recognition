const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes=require('./routes/attendanceRoutes')
require('dotenv').config(); // Import and configure dotenv


const app = express();
const port = process.env.PORT || 5000; // Use port from environment variable or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


//database name is to b checked out and fix webcam.tsx and scn.tsx
// rest all will be comparatively easy 
// successful page is left integrate oops section whithin it using ternery
//and then make a table displaying employee records

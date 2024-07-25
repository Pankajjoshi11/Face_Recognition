
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main'; // Adjust the path if needed
import Successful from './pages/Successful';
import Scan from './pages/Scan';
import LoginMain from './pages/LoginMain';
import Register from './pages/Register';
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/successful/:employeeId" element={<Successful />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/login" element={<LoginMain />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
      
    </>
  )
}

export default App

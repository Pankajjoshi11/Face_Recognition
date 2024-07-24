
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main'; // Adjust the path if needed
import Successful from './pages/Successful';
import Scan from './pages/Scan';
import LoginMain from './pages/LoginMain';
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/successful" element={<Successful />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/login" element={<LoginMain />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
      
    </>
  )
}

export default App

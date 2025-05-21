import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from './home/Home';
import CourseDetail from './course/courseDetails';
import './index.css';
import Footer from './footer/Footer';
import Login from './login/Login';
import Signup from './signup/signup';
import Courses from './course/Coureses';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

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
import Exam from './exam/Exam';
function App() {
  return (
    <Router>
      <Navbar />
      <div className='mb-20'>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/exam" element={<Exam />} />
        
      </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

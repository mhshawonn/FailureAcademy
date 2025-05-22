import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/image/EdTech.jpg';
import {toast} from 'react-toastify'

function Signup() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
    formData.append('phone', e.target.phone.value);
    formData.append('image', profileImage); // ✅ Correct key name

    try {
      const res = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        body: formData,
      });
     if (res.ok) {
      //const data = await res.json();
      toast.success('Signup successful!');
    } else {
    const errorData = await res.json();

    if (errorData.detail === "User account already created, just login") {
      toast.error("An account with this email already exists. Please login.");
    } else {
      toast.error(`Signup failed: ${errorData.detail || 'Unknown error'}`);
    }
    }
  }catch (err) {
    toast.error('Signup failed: Server not responding');
    console.error(err);
  }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:flex md:w-2/5 items-center justify-center p-4">
          <img
            src={img}
            alt="Signup Illustration"
            className="w-64 h-64 object-cover rounded-full shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign Up for Failure Academy
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <input name="name" type="text" className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input name="email" type="email" className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input name="password" type="password" className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              <input name="phone" type="tel" className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

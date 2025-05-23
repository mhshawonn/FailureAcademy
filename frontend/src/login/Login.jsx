import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
function Login() {

  const [loginData, setLoginData]=useState({
    email:"",
    password: ""
  })

    const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  
  const nav=useNavigate()
  const handleOnSubmit= async (e)=>{
    e.preventDefault();
       try {
          const res = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
           headers: {
                'Content-Type': 'application/json'  
              },
              body: JSON.stringify(loginData)
          });
         if (res.ok) {
          //const data = await res.json();
          toast.success('Login successful!');
          nav('/')
          
        } else {
        const errorData = await res.json();
    
        if (errorData.detail === "'user not found, please register then try to login'") {
          toast.error("You have no account, please register first");
        }
        else if(errorData.detail ==='password is not match'){
          toast.error("Wrong password insertion");

        }
        
        else {
          toast.error(`Signup failed: ${errorData.detail || 'Unknown error'}`);
        }
        }
      }catch (err) {
        toast.error('Login failed: Server not responding');
        console.error(err);
      }
    
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Failure Academy</h2>
        <form className="space-y-4" onSubmit={handleOnSubmit}>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input type="email"
            name='email'
            value={loginData.email}
            onChange={handleOnChange} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input type="password" 
            name='password'
            value={loginData.password}
            onChange={handleOnChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

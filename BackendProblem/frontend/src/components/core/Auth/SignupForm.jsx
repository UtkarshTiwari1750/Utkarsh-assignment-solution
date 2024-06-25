import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import {setSignupData} from "../../../slices/authSlice"
import {sendOtp} from "../../../services/operations/authAPI"
import toast from 'react-hot-toast';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {firstName, lastName, email, password, confirmPassword} = formData;


  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData( (prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value,
      } 
    ))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error("Password Do Not Match");
      return;
    }

    const signupData = {
      ...formData,
    }

    // setting signup data and state
    // To be used after otp verification
    dispatch(setSignupData(signupData));

    // Send OTP to user for Verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    
  }

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleOnSubmit} className='flex flex-col w-full gap-y-4'> 
        <div className='flex gap-x-4'>
          <label>
            <p className='mb-1 text-sm'>
              First Name <sup className='text-red-600'>*</sup>
            </p>

            <input 
            required
            type="text"
            name='firstName'
            value={firstName}
            onChange={handleOnChange}
            placeholder='Enter first name'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className='border-2 border-blue-600  w-full rounded-lg p-3 text-black'
            />
          </label>
          
          <label>
            <p className='mb-1 text-sm '>
              Last Name <sup className='text-red-600'>*</sup>
            </p>

            <input 
            required
            type="text"
            name='lastName'
            value={lastName}
            onChange={handleOnChange}
            placeholder='Enter last name'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className='border-2 border-blue-600 w-full rounded-lg p-3'
            />
          </label>
          
        </div>

        <label>
            <p className='mb-1 text-sm '>
              Email Address <sup className='text-red-600'>*</sup>
            </p>

            <input 
            required
            type="text"
            name='email'
            value={email}
            onChange={handleOnChange}
            placeholder='Enter email address'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className='border-2 border-blue-600 w-full rounded-lg p-3'
            />
        </label>

        <div className='flex gap-x-4'>
            <label className='relative'>
              <p className='mb-1 text-sm'>
                Create Password <sup className='text-red-600'>*</sup>
              </p>

              <input 
              required
              type={`${showPassword ? "text" : "password"}`}
              name='password'
              value={password}
              onChange={handleOnChange}
              placeholder='Enter Password'
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className=' border-2 border-blue-600 w-full rounded-lg p-3'
              />

              <span 
              onClick={() => setShowPassword((prev) => !prev)}
              className='text-2xl absolute right-3 top-[36px] z-[10] cursor-pointer'>
                {
                  showPassword 
                  ? (<AiOutlineEyeInvisible />)
                  : (<AiOutlineEye />)
                }
              </span>
            </label>
          
            <label className='relative'>
              <p className='mb-1 text-sm'>
                Confirm Password <sup className='text-red-600'>*</sup>
              </p>

              <input 
              required
              type={`${showConfirmPassword ? "text" : "password"}`}
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder='Confirm Password'
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className='border-2 border-blue-600 w-full rounded-lg p-3'
              />

              <span 
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className='text-2xl absolute right-3 top-[36px] z-[10] cursor-pointer'>
                {
                  showConfirmPassword 
                  ? (<AiOutlineEyeInvisible />)
                  : (<AiOutlineEye />)
                }
              </span>
            </label>
        </div>
        
        <button
          type='submit'
          className='mt-2 rounded-lg bg-yellow-300 py-2 px-3 font-medium'
        >
          Create Account
        </button>

      </form>
    </div>
  )
}

export default SignupForm
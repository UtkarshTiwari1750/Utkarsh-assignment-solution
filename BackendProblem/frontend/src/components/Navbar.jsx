import React, { useState } from 'react';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/operations/authAPI';
import ConfirmationModal from './ConfirmationModal';

const Navbar = () => {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile)
  const [confirmationModal, setConfirmationModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("User", user)
  return (
    <div className='w-full bg-[#5865F2]'>
      <div className='w-full max-w-[1280px] mx-auto py-3  flex justify-between items-center'>
        <Link 
            to='/'
            className='text-white font-semibold text-2xl'
        >
            Expense Tracker
        </Link>
        {
          !token ? (
            <div className='flex gap-x-5'>
                <Button text='Login' link='/login' custom={"bg-white text-[#000000] hover:bg-gray-100"}/>
                <Button text='Sign Up' link='/signup' custom={"bg-white text-[#000000] hover:bg-gray-100"}/>
            </div>
          )
          : (
            <div className='flex justify-between items-center gap-x-10'>
              <div className='flex items-center justify-between gap-x-3 '>
                <div className='w-full'>
                  <img src={user?.image} alt="Profile Image" 
                    className='w-8 h-8 rounded-full object-cover'
                  />
                </div>
                <div>
                  <p className='text-xs font-semibold'>
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className='text-xs'>
                    {user?.email}
                  </p>
                </div>
              </div>
              
              <button className='text-white border px-3 py-1 rounded-md hover:scale-95 transition-all duration-300'
                onClick={() => setConfirmationModal({
                  text1: "Are you  sure ?",
                  text2: "You will be logged out of your Account",
                  btn1Text: "Cancel",
                  btn2Text: "Logout",
                  btn1Handler: () => {
                    setConfirmationModal(null)
                  },
                  btn2Handler: () =>  {
                    dispatch(logout(navigate));
                    setConfirmationModal(null);
                  }
                })}
              >
                Logout
              </button>
            </div>
          )
        }
      </div>
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
      }
    </div>
  );
}

export default Navbar;

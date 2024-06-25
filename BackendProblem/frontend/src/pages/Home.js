import React from 'react';
import { Link } from 'react-router-dom';
import Image from "../assests/homePage.png"
import Button from '../components/Button';

const Home = () => {
  return (
    <div className='w-full mt-12'>
        <div className='w-full max-w-[1180px] mx-auto flex flex-col gap-y-5 py-6'>
            <div className='flex flex-col items-center mx-auto gap-y-5'>
                <h1 className='text-center  text-4xl font-bold  tracking-wider leading-snug'> 
                    Visualize your workflow 
                    <br />
                    & facilitate your expenses management
                </h1>

                <h2 className='text-gray-500 text-center w-3/6'>
                    Expense Tracker is a simple and easy-to-use tool that helps you to manage your expenses and visualize your workflow.
                    Start using it today and make your life easier!
                </h2>

                <div className='flex items-center gap-x-10 mt-2'>
                    <Button text='Login' link='/login' custom={"text-white"}/>
                    <Button text='Sign Up' link='/signup' custom={"text-white"}/>
                </div>
            </div>
            
            <div>
                <img src={Image} alt="Expense Tracker" />
            </div>
        </div> 
    </div>
  );
}

export default Home;

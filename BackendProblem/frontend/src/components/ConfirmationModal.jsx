import React from 'react'
import Button from './Button'

const ConfirmationModal = ({modalData}) => {
    
  return (
    <div className='fixed inset-0 z-[1000] bg-white bg-opacity-10 backdrop-blur-sm mt-0 grid place-items-center overflow-auto'>
        <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'> 
            <p className='text-2xl font-semibold text-richblack-5'>
                {modalData.text1}
            </p>

            <p className='mt-3 mb-5 leading-6 text-richblack-200'>
                {modalData.text2}
            </p>

            <div className='flex items-center gap-x-4'>
                <button 
                    className='cursor-pointer rounded-md bg-gray-300 py-2 px-5 font-semibold text-white'
                    onClick={modalData?.btn1Handler}
                >
                    {modalData?.btn1Text}
                </button>

                <button
                className='cursor-pointer rounded-md bg-red-600 py-2 px-5 font-semibold text-white'
                onClick={modalData?.btn2Handler}
                >
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal
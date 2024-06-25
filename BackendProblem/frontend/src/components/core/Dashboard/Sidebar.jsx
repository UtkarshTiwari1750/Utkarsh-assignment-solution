import React, { useState } from 'react'
import SidebarLink from './SidebarLink'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import { GiExpense } from "react-icons/gi";

const sidebarLinks = [
    {
        id: 1,
        name: "My Profile",
        path: "/dashboard/my-profile",
        icon: <VscAccount />,
    },
    {
        id: 2,
        name: "Expense",
        path: "/dashboard/expenses",
        icon: <GiExpense />,
    },
]

const Sidebar = () => {
    const {loading: profileLoading } = useSelector( (state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null)
    if(profileLoading || authLoading) {
        return (
            <div className='grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800'>
                <div className='spinner'></div>
            </div>
        )
    };

  return (
    <div>
        <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-black
        h-[calc(100vh-3.5rem)] bg-black py-10 text-richblack-300 '>
            <div className='flex flex-col '>
                {
                    sidebarLinks.map( (link,index) => {
                        return (
                            <SidebarLink link={link} icon={link.icon} key={index}/>
                        )
                    })
                }
            </div> 
        </div>
    </div>
  )
}

export default Sidebar
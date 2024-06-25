import React from 'react'

import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
const SidebarLink = ({link, icon}) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname)
    }


  return (
    <NavLink
    to={link.path}
    className={`relative px-6 py-2 text-sm font-medium 
    ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50 border-l-2 border-yellow-50" : "bg-opacity-0" }
    transition-all duration-200`}
    >
        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>

        <div className='flex items-center gap-x-2 text-white'>
            {icon}
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink
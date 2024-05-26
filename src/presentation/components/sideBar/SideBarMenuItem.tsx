import React from 'react'
import { NavLink } from 'react-router-dom'

interface ISideBarMenuItemProps{
    route:{
        to:string;
        icon:string;
        title:string;
        description:string;
    }
}

const SideBarMenuItem = ({route}:ISideBarMenuItemProps) => {
  return (
    <NavLink
    key={route.to}
    to={route.to}
    className={({ isActive }) =>
        isActive
            ? 'flex justify-center items-center bg-gray-800 rounded-md p-2 transition-color '
            : 'flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors'
    }
>
    <i className={`${route.icon} text-2xl text-indigo-400`} />
    <div className='flex flex-col flex-grow'>
        <span className='text-white text-lg font-semibold'>
            {route.title}
        </span>
        <span className='text-gray-400 text-sm'>
            {route.description}
        </span>
    </div>
</NavLink>
  )
}

export default SideBarMenuItem
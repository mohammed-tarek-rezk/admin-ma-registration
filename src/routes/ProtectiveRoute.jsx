import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { MAIN_LINKS } from '../constants'

import Sidebar from '../components/Sidebar'

function ProtectiveRoute() {
    let moderator = useSelector((state)=> state.moderator)
  return moderator._id?(
    <div className='flex'>
      <Sidebar />
      <div className='p-5 flex-grow overflow-x-auto'>
        <Outlet />
      </div>
    </div>
  ):(<Navigate to={MAIN_LINKS.LOGIN} />)
}

export default ProtectiveRoute
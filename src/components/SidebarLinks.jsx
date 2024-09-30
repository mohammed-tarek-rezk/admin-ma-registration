import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function SidebarLinks({to , label, Icon}) {
    let location = useLocation()
  return (
    <Link to={to} className={`flex gap-2 items-center p-3 hover:bg-gray-100 hover:text-black transition-all rounded-lg my-2 ${location.pathname === to ? "bg-gray-100 text-black" :""}`}><span className= "text-xl">{<Icon />}</span> <span className="hidden lg:block">{label}</span></Link>
  )
}

export default SidebarLinks
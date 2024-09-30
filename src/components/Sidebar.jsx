import React from 'react'
import { MAIN_LINKS } from '../constants'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLinks from './SidebarLinks'
import { useLoginModeratorMutation } from '../store/RTK/mainApi'
import toast from 'react-hot-toast'
import { clearUser } from '../store/slices/moderatorSlice'
import { CiLogout, CiSettings } from 'react-icons/ci'
import { AiOutlineDashboard } from 'react-icons/ai'
import { IoPeople } from 'react-icons/io5'
import { GrUserAdmin } from 'react-icons/gr'

function Sidebar() {
    let moderator  =useSelector(status => status.moderator)
    const [logout , {loading}] = useLoginModeratorMutation()
    let dispatch = useDispatch()
    let links;
    if(moderator.isAdmin){
        links  = [
            {label: 'Dashboard', icon: AiOutlineDashboard , to: MAIN_LINKS.HOME},
            {label: 'All Members',icon: IoPeople ,to: MAIN_LINKS.ALL_MEMBERS},
            {label: 'Moderators', icon: GrUserAdmin,to: MAIN_LINKS.MODERATORS},
            {label: 'Settings', icon: CiSettings ,to: MAIN_LINKS.PROFILE},
        ]
    }else{
        links  = [
            {label: 'Dashboard', icon: AiOutlineDashboard , to: MAIN_LINKS.HOME},
            {label: 'All Members',icon: IoPeople ,to: `${MAIN_LINKS.HOME}/moderators/${moderator._id}`},
            {label: 'Settings', icon: CiSettings ,to: MAIN_LINKS.PROFILE},
        ]
    }
    const logoutHandler = (e)=>{
        let {data , error} = logout()
    if(error) {
        toast.error("Something went wrong try again")    
        return
    }
    dispatch(clearUser())
    toast.success("logout successfully")   
    }
  return (
    <div className='sticky p-3 top-0 left-0 flex flex-col  justify-between h-screen min-w-[65px] w-[65px] lg:w-[250px]  lg:min-w-[250px] overflow-hidden bg-gray-800 text-white'>
        <div>
        <div className='hidden lg:block text-xl font-bold my-5'>MA Registration App</div>
        <div className='text-xl lg:hidden font-bold my-5'>MA</div>
        
        <div>
            {
                links.map((link, index) => (
                    <SidebarLinks key={index} to={link.to} label={link.label} Icon ={link.icon}/>
                ))
            }
        </div>
        </div>
        <div  className=' flex items-center gap-2 font-bold py-3 cursor-pointer' onClick={logoutHandler}>
            <span className='font-bold text-xl'><CiLogout /></span><span className="hidden lg:block">Logout</span>
        </div>
    </div>
  )
}

export default Sidebar
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MAIN_LINKS } from '../constants'
import { Button } from 'flowbite-react'
import { useChangeModeratorStatusMutation } from '../store/RTK/mainApi'
import toast from 'react-hot-toast'

function ModeratorCard({el}) {
  let [changeStatus , {isLoading}] = useChangeModeratorStatusMutation()
  let [active , setActive] = useState(el.isActive)
  const ActiveHandler = async(e)=>{
    e.preventDefault()
    let {data , error} = await changeStatus(el._id)
    if(error){
      toast.error("something went wrong refresh and try again")
      return
    }
    toast.success("Status updated successfully")
    setActive(!active)
  }
  return (
    <Link to={`${MAIN_LINKS.HOME}/moderators/${el._id}`}>
        <div className=' p-5 border rounded-lg text-center bg-gray-300'>
            <Button className='bg-gray-800 text-white' onClick={ActiveHandler}>{active ? "active" : "not active"}</Button>
            <div className=' my-3 text-center text-3xl'>{el.membersCount}</div>
            <div className='text-xs'>{el.name}</div>
            <div className='text-xs'>{el.email}</div>
        </div>
    </Link>
  )
}

export default ModeratorCard
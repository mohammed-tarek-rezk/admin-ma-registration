import { Button, Modal } from 'flowbite-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useChangeStatusMutation } from '../store/RTK/mainApi';
import toast from 'react-hot-toast';
import { MAIN_LINKS } from '../constants';
import { TiEdit } from 'react-icons/ti';
import { BiSolidShow } from 'react-icons/bi';

function TableRow({el, i}) {
    const [openModal, setOpenModal] = useState(false);
    let [status , setStatus ] = useState(el.status);
    let [changeStatus , {isLoading}] = useChangeStatusMutation()
    let getFinalStatus = ()=>{
        let result = {}
        let oldStatus = status
        result = oldStatus.reduce((acc , el)=>{
            if(el.done === true){
                return el
            }
            else{
                return acc
            }
        }, {})
        return result.state
    }

    let changeStatusHandler = async(id)=>{
        let {error , data} = await changeStatus({memberId: el._id , id: id})
        if(error){
            toast.error("Couldn't change status refresh and try again")
            return
        }
        console.log(data)
        toast.success("Status updated successfully")
        let newStatus = status.map((s)=>{
            if(s.id === +id){
                return {...s, data: new Date() ,done:!s.done}
            }
            return s
        })
        setStatus(newStatus)

    }

    const bageColor = (status)=>{
        switch(status){
            case 'application submitted':
                return "bg-blue-800"
            case 'under review':
                return "bg-pink-300"
            case 'interview scheduled':
                return "bg-yellow-400"
            case 'interview completed':
                return "bg-zinc-400"
           case 'pending task':
                return "bg-gray-800"
           case 'accepted':
                return "bg-green-800"
           case "rejected":
                return "bg-red-800"
            default :
                return ""

        }
    }
  return (
    <>
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {i}
    </th>
    <td className="px-6 py-4">
        {el?.name}
    </td>
    <td className="px-6 py-4">
        {el.email}
    </td>
    <td className="px-6 py-4">
        {el.phone}
    </td>
    <td className="px-6 py-4">
        {el.university}
    </td>
    <td className="px-6 py-4">
        {el.faculty}
    </td>
    <td className="px-6 py-4">
        {el.firstCommunity}
    </td>
    <td className="px-6 py-4">
        {el.secondCommunity}
    </td>
    <td className="px-6 py-4">
        <span className={`bg-blue-100  text-white text-xs font-medium me-2 flex justify-center min-w-fit px-2.5 py-0.5 rounded ${bageColor(getFinalStatus())}`}>{getFinalStatus()}</span>
    </td>
    <td className="px-2 py-4 min-w-fit ">
        {el.acceptedIn.map(el => <span className='block whitespace-nowrap' key={el}>{el}</span>)}
    </td>
    <td className="px-6 py-4 flex gap-2">
        <button onClick={() => setOpenModal(true)} className="font-medium  text-blue-600  text-xl hover:underline"><TiEdit /></button>
        <Link  to={`${MAIN_LINKS.HOME}/member/${el._id}`} className="font-medium text-green-600  text-xl hover:underline"><BiSolidShow /></Link>
    </td>
</tr>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Edit {el.name} status</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
            {
            status.map((st)=>{
                return (
                <div key={st.id} className='flex  justify-between items-center'>
                    <div>
                       {st.id + 1} -  {st.state}
                    </div>
                    {
                        st.done && (
                            <div>{new Date(st.date).toLocaleString()}</div>
                        )
                    }
                    <div>
                        {st.done? <Button onClick={()=>changeStatusHandler(`${st.id}`)} color={"gray"} className=''>cancel</Button> : <Button  onClick={ ()=> changeStatusHandler(`${st.id}`)} >set done</Button>}
                    </div>
                </div>)
            })
            }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpenModal(false)}>Done</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default TableRow
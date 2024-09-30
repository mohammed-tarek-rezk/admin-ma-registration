import React, { useEffect, useState } from 'react'
import { useGetAllMembersQuery } from '../store/RTK/mainApi'
import Loading from './Loading'
import TableRow from './TableRow'
import PageTitle from './PageTitle'
import { COMMUNITIES, STATUS } from '../constants'
import {filtering} from '../utils/filtring'

function AllMemebers() {
  let {data , error , isLoading} = useGetAllMembersQuery()
  let [members , setMembers] = useState()
  let [community , setCommunity] = useState("All")
  let [status , setStatus] = useState("All")
  let [accept , setAccept] = useState("All")

  useEffect(()=>{
      if(!isLoading){
          setMembers(filtering(data.data, community , status , accept))
      }
  },[isLoading , community , status, accept])
  return isLoading? <Loading /> :(
<div>
<PageTitle title={"All Members"} />
<div className='flex flex-col md:flex-row justify-between items-center gap-3 my-6'>
    <div className='flex gap-4 items-center'>Members Count: <span className='text-xl bg-blue-500 text-white font-bold block px-3 rounded-md'>{data?.data?.length}</span> / <span className='text-xl bg-green-500 text-white font-bold block px-3 rounded-md'>{members?.length}</span></div>

    <div className='flex gap-3'>
        <form className="" >
        <label htmlFor="community" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Community</label>
        <select id="community" onChange={(e)=> setCommunity(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue={"All"} >All</option>
            {
                COMMUNITIES.map((el , index)=>(
                    <option key={index} defaultValue={el}>{el}</option>
                ))
            }
        </select>
        </form>
        <form className="">
        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">last status</label>
        <select id="status" onChange={(e)=> setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue={"All"} >All</option>
            {
                STATUS.map((el , index)=>(
                    <option key={index} defaultValue={el}>{el}</option>
                ))
            }
        </select>
        </form>
        <form className="" >
        <label htmlFor="a" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Accepted In</label>
        <select id="a" onChange={(e)=> setAccept(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue={"All"} >All</option>
            {
                COMMUNITIES.map((el , index)=>(
                    <option key={index} defaultValue={el}>{el}</option>
                ))
            }
        </select>
        </form>
    </div>
</div>


<div className="relative overflow-x-auto shadow-md rotate-180  t-div   sm:rounded-lg pt-10" >
    <table className="w-full text-sm text-left rtl:text-right rotate-180 text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 ">
            <tr className='sticky top-0 '>
                <th scope="col" className="px-6 py-3">
                    id
                </th>
                <th scope="col" className="px-6 py-3">
                    name
                </th>
                <th scope="col" className="px-6 py-3">
                    email
                </th>
                <th scope="col" className="px-6 py-3">
                    phone
                </th>
                <th scope="col" className="px-6 py-3">
                    university
                </th>
                <th scope="col" className="px-6 py-3">
                    faculty
                </th>
                <th scope="col" className="px-6 py-3">
                    first community
                </th>
                <th scope="col" className="px-6 py-3">
                    second community
                </th>
                <th scope="col" className="px-6 py-3">
                    lastStatus
                </th>
                <th scope="col" className="px-6 py-3">
                    Accepted In
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        {
            isLoading? <Loading /> :<tbody>
            {members?.map((el , index)=> <TableRow key={el._id} el={el} i={index + 1}/>)}
          </tbody>
        }
    </table>
    </div>
    </div>
  )
}

export default AllMemebers
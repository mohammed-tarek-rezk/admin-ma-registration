import React from 'react'
import { useChangeAcceptedInMutation, useGetSingleMemberQuery } from '../store/RTK/mainApi'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import PageTitle from '../components/PageTitle'
import DataDev from '../components/DataDev'
import { COMMUNITIES } from '../constants'
import { Button } from 'flowbite-react'
import toast from 'react-hot-toast'

function SingleMemberPage() {
    let id = useParams().id
    let {data , isLoading} = useGetSingleMemberQuery(id)
    let member = data?.data
    let acceptedIn = member?.acceptedIn
    let [changeAcceptedIn , {isLoading: accLoading}] = useChangeAcceptedInMutation()
    const acceptedInHandler = async(e)=>{
      e.preventDefault();
      let selected = document.getElementById("accepted").selectedOptions
      let vlaues =  Array.from(selected).map(({ value }) => value);
      if(vlaues.length > 0){
        let {data , error} = await changeAcceptedIn({id: member._id , data: vlaues})
        if(error){
          console.log(error)
          toast.error("something went wrong refresh and try again")
          return
        }
        toast.success("accepted In updated successfully")
        acceptedIn = vlaues
      }
    }
  return isLoading ? <Loading /> :(
    <div>
        <PageTitle title={member.name} />
        <h2 className='my-3 underline  underline-offset-8 text-lg font-bold '>personal Information</h2>
        <div className='lg:grid   lg:grid-cols-2 lg:gap-5'>
          <DataDev title={"name"} value={member.name} />
          <DataDev title={"email"} value={member.email} />
          <DataDev title={"phone"} value={member.phone} />
          <DataDev title={"Id number"} value={member.idNumber} />
          <DataDev title={"university"} value={member.university} />
          <DataDev title={"faculty"} value={member.faculty} />
          <DataDev title={"department"} value={member.department} />
          <DataDev title={"academic year"} value={member.academicYear} />
          <DataDev title={"facebook"} value={member.facebook} />
        </div>
        <hr/>
        <h2 className='my-3 underline  underline-offset-8 text-lg font-bold '>Extra Information</h2>
        <div className='my-5'>
          <div className=''>
            <div className='flex gap-2'>
              <h2>first time in chapter</h2>
              {member.first ? <span className='px-2 bg-green-400 text-white rounded-lg h-fit'>True</span> : <span className='px-2 bg-red-400 text-white rounded-lg h-fit'>false</span>}

            </div>
            <DataDev title={"open space"} value={member.open || "NO Data provided"} />
  
        </div>
        <hr/>
        <h2 className='my-3 underline  underline-offset-8 text-lg font-bold '>Status information</h2>
        <div className='lg:grid   lg:grid-cols-2 lg:gap-5'>
          <DataDev title={"first community"} value={member.firstCommunity} />
          <DataDev title={"second community"} value={member.secondCommunity} />
          <DataDev title={"moderator"} value={member.moderator.name} />

        </div>
          <div>
            <h3>status</h3>
            

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    id
                </th>
                <th scope="col" className="px-6 py-3">
                    status
                </th>
                <th scope="col" className="px-6 py-3">
                    done
                </th>
                <th scope="col" className="px-6 py-3">
                    data
                </th>
            </tr>
        </thead>
        <tbody>
          {
            member.status.map((st)=>(
              <tr className="bg-white border-b " key={st.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {st.id +1}
              </th>
              <td className="px-6 py-4">
                  {st.state}
              </td>
              <td className="px-6 py-4">
                  {st.done ? <span className='px-2 bg-green-400 text-white rounded-lg'>True</span> : <span className='px-2 bg-red-400 text-white rounded-lg'>false</span>}
              </td>
              <td className="px-6 py-4">
                  {st.done ? new Date(st.date).toLocaleString() : ""}
              </td>
          </tr>
            ))
          }


        </tbody>
    </table>
</div>
          {
            member.status[6].done &&           <div>
            <h3 className='my-3'>Accepted In</h3>
            <form className="max-w-sm" onSubmit={acceptedInHandler}>
              <select multiple  id="accepted" className="bg-gray-50 border my-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                {
                  COMMUNITIES.map((com)=>{
                    if(acceptedIn.includes(com)){
                      return <option key={com} value={com} selected>{com}</option>
                    }
                    else{
                    return <option key={com} value={com}>{com}</option>
                    }
                  }
                  
                  )
                }
              </select>
              <Button type='submit'  >Save</Button>
            </form>
          </div>
          }

          </div>
    </div>
    </div>
  )
}

export default SingleMemberPage
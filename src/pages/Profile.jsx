import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from '../components/PageTitle'
import DataDev from '../components/DataDev'
import { Alert, Button, Label, Modal, TextInput } from 'flowbite-react'
import { useChangePasswordMutation } from '../store/RTK/mainApi'
import validator from 'validator'
import toast from 'react-hot-toast'
import { clearUser } from '../store/slices/moderatorSlice'

function Profile() {
    let moderator = useSelector((status)=> status.moderator)
    let [openModal , setOpenModal] = useState(false)
    let [password, setPassword] = useState("")
    let [conPassword, setConPassword] = useState("")
    let [changePassword , {isLoading}] = useChangePasswordMutation()
    let [message , setMessage] = useState("")
    let dispatch = useDispatch()
    const submitHandler = async(e)=>{
        setMessage("")
        e.preventDefault()

        switch(true){
            case !validator.isStrongPassword(password.trim()):
                setMessage("please enter a valid password");
                return;
              case !validator.matches(conPassword.trim(), password.trim()):
                setMessage("password and confirm password should match");
                return;
        }

        let {data , error} = await changePassword({password: password.trim()}) 
        if(error){
            setMessage(error.data.message)
            return
        }

        toast.success("Password changed successfully")
        dispatch(clearUser())

    }

  return (
    <div>
        <PageTitle title={"Profile"} />
        <DataDev title={"Name"} value={moderator.name}/>
        <DataDev title={"Email"} value={moderator.email}/>
        <DataDev title={"Members Count"} value={moderator.membersCount}/>
        <DataDev title={"isAdmin"} value={moderator.isAdmin ? "true" : "false"}/>
        <Button onClick={()=> setOpenModal(true)} >Change Password</Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Change Password</Modal.Header>
        <Modal.Body>
        {
                message && <Alert color={"failure"} >{message}</Alert>
        }
        <form onSubmit={submitHandler} noValidate>
        <div>
        <div className="mb-2 block">
          <Label  value=" New Password" />
        </div>
        <TextInput type="Password" onChange={(e)=> setPassword(e.target.value)} required />
        <div className="mb-2 block">
          <Label  value="re-write New password" />
        </div>
        <TextInput  type="password" onChange={(e)=> setConPassword(e.target.value)} required />
      </div>
      <div className='my-2'>
      <Button type="submit" className={`bg-gray-800 ${isLoading? "disabled" : ""}`} >{isLoading ? "loading...." :"Submit"}</Button>

      </div>


            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Profile
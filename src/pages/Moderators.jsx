import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'
import { useAddModeratorMutation, useGetModeratorsQuery } from '../store/RTK/mainApi'
import Loading from '../components/Loading'
import ModeratorCard from '../components/ModeratorCard'
import { Alert, Button, Label, Modal, TextInput } from 'flowbite-react'
import validator from 'validator'
import toast from 'react-hot-toast'

function Moderators() {
    let {data , isLoading} = useGetModeratorsQuery()
    const [openModal, setOpenModal] = useState(false);
    const [name , setName ] =useState("")
    const [email , setEmail ] =useState("")
    const [password , setPassword ] =useState("")
    const [conPassword , setConPassword ] =useState("")
    const [message , setMessage ] =useState("")

    let [addModerator , {isLoading : addLoading}] = useAddModeratorMutation()

    const submitHandler = async (e) => {
        setMessage("")
        e.preventDefault();
    switch (true) {
      case validator.isEmpty(name.trim()):
        setMessage("Name is required");
        return;
      case !validator.isEmail(email.trim()):
        setMessage("Please enter a valid email");
        return;
      case !validator.isStrongPassword(password.trim()):
        setMessage("please enter a valid password");
        return;
      case !validator.matches(conPassword.trim(), password.trim()):
        setMessage("password and confirm password should match");
        return;
    }

    let {data , error} = await addModerator({name , email , password})
    if (error) {
        setMessage(error.data.message);
        return;
      }
      window.location.reload();
      toast.success("moderator added successfully");
      setOpenModal(false)
    }
  return isLoading? <Loading /> :(
    <div>
        <PageTitle title={"Moderators"} />
        <div className='flex justify-end my-6'>
            <Button onClick={() => setOpenModal(true)} className='bg-gray-800' >Add Moderator</Button>
        </div>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Moderator</Modal.Header>
        <Modal.Body>
            {
                message && <Alert color={"failure"} >{message}</Alert>
            }
        <form className="flex  flex-col gap-4" onSubmit={submitHandler} noValidate>
      <div>
        <div className="mb-2 block">
          <Label  value="Name" />
        </div>
        <TextInput  type="text" placeholder="" onChange={(e)=> setName(e.target.value)} required />
        <div className="mb-2 block">
          <Label  value="Email" />
        </div>
        <TextInput  type="email" placeholder="" onChange={(e)=> setEmail(e.target.value)} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label  value="Password" />
        </div>
        <TextInput type="password" onChange={(e)=> setPassword(e.target.value)} required />
        <div className="mb-2 block">
          <Label  value="re-write password" />
        </div>
        <TextInput  type="password" onChange={(e)=> setConPassword(e.target.value)} required />
      </div>
      <Button type="submit" className={`bg-gray-800 ${addLoading? "disabled" : ""}`} >{addLoading ? "loading...." :"Submit"}</Button>
    </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {
            data.data.map((el,i)=>{
                return <ModeratorCard  key={i} el={el}/>
            })
        }
        </div>
    </div>
  )
}

export default Moderators
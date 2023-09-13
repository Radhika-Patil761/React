import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

const AddAcademy = () => {
    let [signupstate,setSignupstate]=useState({
        academyName:"",
        email:"",
        description:"",
        contact:""
       })
       let {id}=useParams()
       let{academyName,email,description,contact}=signupstate
       let navigate=useNavigate()
       let token=window.localStorage.getItem("token")
       let [state,setState]=useState(false)
       let handleToggle=()=>{
        setState(!state)
       }
       
       let handleChange=(e)=>{
        let{name,value}=e.target
        // let name=e.target.name;
        // let value=e.target.value;
        setSignupstate({...signupstate,[name]:value})
       }
     
       
       let handleSubmit=async(e)=>{
        try {
            e.preventDefault()
            // console.log(signupstate);
            let payload={academyName,email,description,contact}
          await axiosInstance.post(`/academies/saveacademy?managerId=${id}`,payload,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
          )
         
          alert(`${academyName} Added Successfully`)
          navigate("/adminDashboard/viewAcademy")
        } catch (error) {
            alert(error.code)
        }
       }
  return (
    <div id="academy">
      <h1>Add Academy</h1>
          <form > 
            <table>
              <tr>
                <td><label htmlFor='username'>Academy Name<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text' id="input" name="academyName"  onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='contact'>Contact<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text' id="input" name="contact" value={contact} onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='description'>Description<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='textarea' id="input" name="description" value={description} onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='email'>email<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text' id="input" name="email" value={email} onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='id'>Id<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text' id="input" name="id" onChange={handleChange} value={id} readOnly/></td>
              </tr>
              </table>
              <button onClick={handleSubmit} >Add Academy</button>
              </form>
    </div>
  )
}

export default AddAcademy

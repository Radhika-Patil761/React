import React, { useEffect, useState } from 'react'
// import { TbEyeCheck,TbEyeClosed } from "react-icons/tb";
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

const UpdateAcademyDetails = () => {
  let [signupstate,setSignupstate]=useState({
    academyName:"",
    contact:"",
    description:"",
    email:""
   })
   
   let {id}=useParams()
   let{academyName,contact,description,email}=signupstate   //destructring
   let navigate=useNavigate()
   let token=window.localStorage.getItem("token")
  // let [state,setState]=useState(false)
  //  let handleToggle=()=>{
  //   setState(!state)
  //  }
   
   let handleChange=(e)=>{
    let{name,value}=e.target
    // let name=e.target.name;
    // let value=e.target.value;
    setSignupstate({...signupstate,[name]:value})
   }
   useEffect(()=>{
    let fetch=async()=>{
      try {
        let {data}=await axiosInstance.get(`/academies/get/${id}`,
        {
          headers:{Authorization:`Bearer ${token}`}
        } )
        let finaldata=data.data
      setSignupstate(finaldata)
     
      }  
      catch (error) 
      {
        console.log(error.code);
      }
      
    }
    fetch()
  },[])
   
   let handlesubmit=async(e)=>{
    try {
        e.preventDefault()
        let payload={academyName,contact,description,email,id}
      await axiosInstance.put("/academies/update",payload,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      )
     
      alert(`${email} Updated Successfully`)
      navigate("/adminDashboard/academyUpdate")
    } catch (error) {
        alert(error.code)
    }
   }
  return (
    <div id='addMang'>
       
      <div id="regForm">
        <h1>Update  Academy  Details</h1>
          <form > 
            <table>
              <tr>
                <td><label htmlFor='username'>Academy Name<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text' id="input" name="academyName" value={signupstate.academyName} onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='contact'>Contact<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text' id="input" name="contact" value={signupstate.contact} onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='description'>Description<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='textarea' id="input" name="description" value={signupstate.description} onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='email'>email<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text' id="input" name="email" value={signupstate.email} onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='id'>Id<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text' id="input" name="id" onChange={handleChange} value={id} readOnly/></td>
              </tr>
            </table>
          <button id="input" onClick={handlesubmit}>Submit</button><br/>
    </form>
    </div >
  </div>
  )

}

export default UpdateAcademyDetails

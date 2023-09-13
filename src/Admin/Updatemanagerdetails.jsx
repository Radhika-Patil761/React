import React, { useEffect, useState } from 'react'
import { TbEyeCheck,TbEyeClosed } from "react-icons/tb";
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

const Updatemanagerdeatils = () => {
  let [signupstate,setSignupstate]=useState({
    userName:"",
    email:"",
    password:"",
    dob:"",
    gender:"",
    phone:""
   })
   
   let {id}=useParams()
   let{userName,email,password,dob,gender,phone}=signupstate   //destructring
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
   useEffect(()=>{
    let fetch=async()=>{
      try {
        let {data}=await axiosInstance.get(`/academymanagers/get/${id}`,
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
        let payload={userName,email,password,dob,gender,phone,id}
      await axiosInstance.put("/academymanagers/update",payload,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      )
     
      alert(`${email} Updated Successfully`)
      navigate("/adminDashboard/viewAcademyMan")
    } catch (error) {
        alert(error.code)
    }
   }
  return (
    <div id='addMang'>
       
      <div id="regForm">
        <h1>Update  Academy Manager Details</h1>
          <form > 
            <table>
              <tr>
                <td><label htmlFor='username'>User Name<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text' id="input" name="userName" onChange={handleChange}  value={userName}/></td>
              </tr>
              <tr>
                <td><label htmlFor='email' >Email<span style={{color:'red'}}>*</span></label></td>
                <td>: <input type='text'id="input" name="email" onChange={handleChange} value={email}/></td>
              </tr>
              <tr>
                <td><label htmlFor='passord'>Password<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type={state?'text':'password'} id="input" name="password" onChange={handleChange} placeholder='Enter new password'/>{state?<TbEyeCheck onClick={handleToggle}/>:<TbEyeClosed  onClick={handleToggle}/>} </td>
              </tr>
              
              <tr>
                <td><label htmlFor='phone'>Phone Number<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text'id="input" name="phone" onChange={handleChange} value={phone}/></td>
              </tr>
              <tr>
                <td><label htmlFor='gender'>Gender <span style={{color:'red'}}>*</span></label></td>
                <td> : {gender==="Male"?<>
                <input type="radio" name="gender"  value="Male" onChange={handleChange} checked/>Male
                <input type="radio" name="gender"  value="Female" onChange={handleChange}/>Female 
                <input type="radio" name="gender"  value="Others" onChange={handleChange}/>Others</>:"" }
                   
                {gender==="Female"?<>
                <input type="radio" name="gender"  value="Male" onChange={handleChange} />Male
                <input type="radio" name="gender"  value="Female" onChange={handleChange} checked/>Female 
                <input type="radio" name="gender"  value="Others" onChange={handleChange}/>Others</>:"" }
                   
                {gender==="Others"?<>
                <input type="radio" name="gender"  value="Male" onChange={handleChange} />Male
                <input type="radio" name="gender"  value="Female" onChange={handleChange}/>Female 
                <input type="radio" name="gender"  value="Others" onChange={handleChange} checked />Others</>:"" }
                   
                </td>
              </tr>
              <tr>
                <td><label htmlFor='dob' >DOB  </label></td>
                <td>: <input type="date"id="input" name="dob"  onChange={handleChange} value={dob}/></td>
              </tr>
            </table>
          <button id="input" onClick={handlesubmit}>Submit</button><br/>
    </form>
    </div >
  </div>
  )

}

export default Updatemanagerdeatils

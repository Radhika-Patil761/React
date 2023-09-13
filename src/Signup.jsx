import React, { useState } from 'react'
import { TbEyeCheck,TbEyeClosed } from "react-icons/tb";
import { Link } from 'react-router-dom' 
import { useNavigate } from 'react-router-dom'
import axiosInstance from './axiosInstance'
import "./css/signup.css"
// import img from "./Assests/image.jpg"
const Signup = () => {
  let [signupstate,setSignupstate]=useState({
    userName:"",
    email:"",
    password:"",
    dob:"",
    gender:"",
    phone:""
   })

   let{userName,email,password,dob,gender,phone}=signupstate
   let navigate=useNavigate()

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
 
   
   let handlesubmit=async(e)=>{
    try {
        e.preventDefault()
        console.log(signupstate);
        let payload={userName,email,password,dob,gender,phone}
      await axiosInstance.post("/users/save",payload)
      alert(`${email} Registered Successfully`)
      navigate("/login")
    } catch (error) {
        alert(error.code)
    }
   }
  return (
    <div id='signupcss'>
       
      <div id="regForm">
        <h1>User Register</h1>
          <form > 
            <table>
              <tr>
                <td><label htmlFor='username'>User Name<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text' id="input" name="userName" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='email' >Email<span style={{color:'red'}}>*</span></label></td>
                <td>: <input type='text'id="input" name="email" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='passord'>Password<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type={state?'text':'password'} id="input" name="password" onChange={handleChange} />{state?<TbEyeCheck onClick={handleToggle}/>:<TbEyeClosed  onClick={handleToggle}/>} </td>
              </tr>
              
              <tr>
                <td><label htmlFor='phone'>Phone Number<span style={{color:'red'}}>*</span></label></td>
                <td> : <input type='text'id="input" name="phone" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor='gender'>Gender <span style={{color:'red'}}>*</span></label></td>
                <td> :   <input type="radio" name="gender" id="gender" value="Male" onChange={handleChange} />Male  
          <input type="radio" name="gender" id="gender" value="Female" onChange={handleChange}/>Female  
          <input type="radio" name="gender" id="gender" value="Others" onChange={handleChange}/>Others
                </td>
              </tr>
              <tr>
                <td><label htmlFor='dob' >DOB  </label></td>
                <td>: <input type="date"id="input" name="dob"  onChange={handleChange}/></td>
              </tr>
            </table>
          <button id="input" onClick={handlesubmit}>Submit</button><br/>
          <Link to={'/login'}> Already have an account? Login</Link>
      
    </form>
    </div >
    <div id="admin">
    <button  id="input"><Link to={"/adminRegister"} id="input">Admin Register</Link></button>
    </div>
   
  </div>
  )
}
export default Signup


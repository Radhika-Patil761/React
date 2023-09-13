import React, { useState } from 'react'
import { TbEyeCheck,TbEyeClosed } from "react-icons/tb";
import { useNavigate } from 'react-router-dom'
import axiosInstance from './axiosInstance'
import "./css/login.css"
// import img from "./Assests/image.jpg"
const Login = () => {
  let [login,setLogin]=useState({
    userEmail:"",
    password:"" 
   })

   let{userEmail,password}=login
   let navigate=useNavigate()
  let handleChange=(e)=>{
    let{name,value}=e.target
    // let name=e.target.name;
    // let value=e.target.value;
    setLogin({...login,[name]:value})
   }
 
   
   let handlesubmit=async(e)=>{
    try {
        e.preventDefault()
        let payload={userEmail,password}
      let {data}=await axiosInstance.post("/authenticate",payload)
      let token=data.token
      let role=data.role
      if(token){
        window.localStorage.setItem("token",token)
        window.localStorage.setItem("role",role)
         alert(`Login Successfully`)
         if(role==="ROLE_ADMIN")
      navigate("/adminDashboard")
    else
    navigate("/home")
      }else{
        window.localStorage.removeItem("token",token)
        window.localStorage.removeItem("role",role)
      }
    } catch (error) {
        alert(error.code)
    }
   }
   
   let [state,setState]=useState(false)
   let handleToggle=()=>{
    setState(!state)
   }

  return (
    <>
    <div id="logincss">
    {/* <img src={img} alt="" /> */}
    <div id="logForm">
      <div><h1>Login Page</h1></div>
      <div>
      <form>
      <table>
        <tr>
          <td><label htmlFor='userEmail'>Email Id:<span style={{color:'red'}}>*</span></label></td>
          <td><input type='userEmail'id="input" name="userEmail" onChange={handleChange}></input></td>
        </tr>
        <tr>
          <td><label htmlFor='password'>Password:<span style={{color:'red'}}>*</span></label></td>
          <td><input type= {state?'text':'password'}  id="input" name="password" onChange={handleChange} />{state?<TbEyeCheck onClick={handleToggle}/>:<TbEyeClosed  onClick={handleToggle}/>} <br/></td>
        </tr>
      </table>
      <button id="input" onClick={handlesubmit}>Login</button>
      </form>
      </div>
    </div>
    </div>
    
    </>
  )
}

export default Login

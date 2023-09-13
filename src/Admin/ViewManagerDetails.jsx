import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'

const ViewManagerDetails = () => {
    let[details,setDetails]=useState([])
  let token=window.localStorage.getItem("token")
  let {id}=useParams()
  let navigate=useNavigate()
  useEffect(()=>{
    let fetch=async()=>{
      try {
        console.log(id);
        let {data}=await axiosInstance.get(`/academymanagers/getall`,
        {
          headers:{Authorization:`Bearer ${token}`}
        } )

      setDetails(data.data)
     
      }  
      catch (error) 
      {
        console.log(error.code);
      }
      
    }
    fetch()
  })
 
  let handleDelete=async(e)=>{
    try {
        e.preventDefault()
        // let payload={userName,email,password,dob,gender,phone,id}
      await axiosInstance.delete(`/academymanagers/delete/${id}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      )
     
      alert(` Deleted Successfully`)
      navigate("/adminDashboard/view")
    } catch (error) {
        alert(error.code)
    }
   }



  return (
    <div id="cards">
      <h1>Manager Details</h1>
      <div id="mangcards">
          <h5>Name:-</h5>
          <li>{details.userName}</li>
          <h5>Role:-</h5>
          <li>{details.role}</li>
          <h5>Ph-no:-</h5>
          <li>{details.phone}</li>
          <h5>Email-id:-</h5>
          <li>{details.email}</li>
          <h5>Gender:-</h5>
          <li>{details.gender}</li>
          <h5>DOB:-</h5>
          <li>{details.dob}</li>
          <div>
          <Link to={`/adminDashboard/academies/addacademy/${details.id}`}><button>Add Academy</button></Link>
          <Link to={`/adminDashboard/update/${details.id}`}><button>Update</button></Link>
          <button onClick={handleDelete}>delete</button>
          </div>
          
        </div>
    </div>
  )
}

export default ViewManagerDetails

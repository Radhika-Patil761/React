import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'

const ViewAcademyManager = () => {
  let[details,setDetails]=useState([])
  let token=window.localStorage.getItem("token")
  useEffect(()=>{
    let fetch=async()=>{
      try {
        let {data}=await axiosInstance.get("/academymanagers/getall",
        {
          headers:{Authorization:`Bearer ${token}`}
        } )

      setDetails(data.data)
      // console.log(details);
      } 
      catch (error) 
      {
        console.log(error.code);
      }
      
    }
    fetch()
  })
  
  return (
    <div>
      <h1>Academy managers Details</h1>
      <div id="card">
      {details.map((x)=>{
      return (
        <div id="mangcard">
          <h5>Name:-</h5>
          <li>{x.userName}</li>
          <h5>Role:-</h5>
          <li>{x.role}</li>
          <h5>Ph-no:-</h5>
          <li>{x.phone}</li>
          <h5>Email-id:-</h5>
          <li>{x.email}</li>
          <h5>Gender:-</h5>
          <li>{x.gender}</li>
          <h5>DOB:-</h5>
          <li>{x.dob}</li>
          <Link to={`/adminDashboard/view/${x.id}`}><button>View</button></Link>
        </div>
      )
     })}
      </div>
    </div>
  )
}

export default ViewAcademyManager


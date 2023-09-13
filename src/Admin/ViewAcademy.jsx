import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'

const ViewAcademy = () => {
  let[details,setDetails]=useState([])
  let token=window.localStorage.getItem("token")
  useEffect(()=>{
    let fetch=async()=>{
      try {
        let {data}=await axiosInstance.get("/academies/getall",
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
      <h1>Academy  Details</h1>
      <div id="card">
      {details.map((x)=>{
      return (
        <div id="mangcard">
          <h5>AcademyName:-</h5>
          <li>{x.academyName}</li>
          <h5>Contact:-</h5>
          <li>{x.contact}</li>
          <h5>Email:-</h5>
          <li>{x.email}</li>
          <h5>Description:-</h5>
          <li>{x.description}</li>
          <h5>Academy-Id:-</h5>
          <li>{x.id}</li>
          <Link to={`/adminDashboard/viewAcademy/${x.id}`}><button>View</button></Link>
          {/* /adminDashboard/view/${x.id} */}
        </div>
      )
     })}
      </div>
    </div>
  )
}

export default ViewAcademy


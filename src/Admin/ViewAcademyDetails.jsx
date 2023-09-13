import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'

const ViewAcademyDetails = () => {
    let[details,setDetails]=useState([])
  let token=window.localStorage.getItem("token")
  let {id}=useParams()
  let navigate=useNavigate()
  useEffect(()=>{
    let fetch=async()=>{
      try {
        console.log(id);
        let {data}=await axiosInstance.get(`/academies/get/${id}`,
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
      await axiosInstance.delete(`/academies/delete/${id}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      )
     
      alert(` Deleted Successfully`)
      navigate("/adminDashboard/viewAcademy")
    } catch (error) {
        alert(error.code)
    }
   }



  return (
    <div id="cards">
      <h1>Academy Details</h1>
      <div id="mangcards">
          <h5>Academy Name:-</h5>
          <li>{details.academyName}</li>
          <h5>Contact:-</h5>
          <li>{details.contact}</li>
          <h5>Description:-</h5>
          <li>{details.description}</li>
          <h5>Email:-</h5>
          <li>{details.email}</li>
          <h5>Academy-Id:-</h5>
          <li>{details.id}</li>
          <div>
            <br/><br/>
          <Link to={`/adminDashboard/academyUpdate/${details.id}`}><button>Update</button></Link>
          <button onClick={handleDelete}>delete</button>
          <Link to={`/adminDashboard/addBranch/${details.id}`}><button>Add Branch</button></Link>
          </div>
          
        </div>
    </div>
  )
}

export default ViewAcademyDetails

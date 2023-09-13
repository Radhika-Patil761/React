import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const ViewBranch = () => {

  let [state,setState]=useState([]);


  useEffect(()=>{

    let token=localStorage.getItem("token");
    async function ViewData(){
let {data}=await axiosInstance.get("/branches/getall",{headers:{Authorization:`Bearer ${token}`}});
console.log(data.data);
setState(data.data);
console.log(state);
    }
ViewData();

  },[])
let token=localStorage.getItem("token");

  let handleDelete= async(id)=>{
    try{
  await axiosInstance.delete(`/branches/delete/${id}`,{headers:{Authorization:`Bearer ${token}`}})
  window.location.assign('/adminDashboard/viewBranch');
    }
    catch(error){
      console.log(error);
      alert("untill academy deleted branch can't be deleted");
    }
  }
  // await axiosInstance.delete(`academies/delete/${id}`);
  return (
    <div id="viewBranch">
    <h1 >View Branch</h1>
    
    <table  cellPadding={2} cellSpacing={5} border={3} >
      <tr><th>Branch Id</th><th>Address</th><th>City</th><th>Phone</th><th>Pincode</th><th>Delete</th><th>Add Course</th><th>Edit</th></tr>
    {state.map((e)=>{
      return(
<tr>
  <td>{e.id}</td>
<td>{e.address}</td>

<td>{e.city}</td>
<td>{e.phone}</td>
<td>{e.pincode}</td>
<td><button onClick={()=>{handleDelete(e.id)}}>Delete</button></td>
<td><button><Link to={`/adminDashboard/viewBranch/AddCourse/${e.id}`}>Add Course</Link></button></td>
<td><button><Link to={`/adminDashboard/viewBranch/UpdateBranch/${e.id}`}>Edit</Link></button></td>
</tr>
      )
    })}
    
    </table>
    
        </div>
  )
}

export default ViewBranch
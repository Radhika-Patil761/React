import React, { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const AddCourse = () => {

    let [state,setState]=useState({
        courseDurationInMonths:"",
        fee:"",
        imageDate:"",
        name:"",
        type:""
    })
    let {courseDurationInMonths,fee,type}=state;
    let {id}=useParams();
    let token=localStorage.getItem("token");
    let navigate=useNavigate();

    let handlechange=(e)=>{
        let {name,value}=e.target;
        setState({...state,[name]:value});
    }
    let handleSubmit=async (e)=>{
        e.preventDefault();
        let payload={courseDurationInMonths,fee,type};
        console.log(payload.courseDurationInMonths);
        
     try{
        await axiosInstance.post(`/dancecourses/save?branchid=${id}`,payload,{headers:{Authorization:`Bearer ${token}`}})
        alert('dance course added');
        navigate('/adminDashboard/viewCourse');
     }catch(error){
        console.log(error);
        alert("enter all details properly");
     }


    }
    
  return (
    <div id='addCourse'>
        <form action="" encType='multipart'>
            <h1>Add Course</h1>
            <table>
                <tr><td>CourseDuration: </td>
                   <td><input type="number" name='courseDurationInMonths' placeholder='CourseDurationInMonths' onChange={handlechange}/></td>
                </tr>
                <tr>
                    <td>Fee: </td>
                   <td><input type="number" name='fee' placeholder='fee' onChange={handlechange}/></td>
                </tr>
                
                {/* <tr>
                    <td></td>
                   <td><input type="file" name='imageDate' placeholder='imageData' /></td>
                </tr> */}
               
                <tr>
                    <td>TypeOfDance:</td>
                   <td><input type="text" name='type' placeholder='typeOfDance' onChange={handlechange}/></td>
                </tr>
                <tr>
                    <td><button type='submit' onClick={handleSubmit} >Submit</button></td>
                </tr>
            </table>
        </form>
    </div>
  )
}
/*onClick={handleSubmit} */
export default AddCourse
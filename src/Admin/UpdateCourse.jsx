import React, { useState,useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const UpdateCourse = () => {
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
        await axiosInstance.put(`/dancecourses/update/${id}`,payload,{headers:{Authorization:`Bearer ${token}`}})
        alert('dance course updated');
        navigate('/adminDashBoard/viewCourse');
 
       }catch(error){
        console.log(error);
        alert("enter all details properly")
       }

    }

    useEffect(()=>{

        let getDetails= async ()=>{
        
           let  {data}=await axiosInstance.get(`/dancecourses/get/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        console.log(data.data);
        setState(data.data);
        console.log(state.email);
        }
        getDetails();
        
            },[])
        
        

  return (
    <div id='updateCourse'>
        <form action="" >
            <h1>Update Course</h1>
            <table>
                <tr>
                    <td>Course Duration:</td>
                   <td> <input type="number" name='courseDurationInMonths' placeholder='CourseDurationInMonths' onChange={handlechange} value={courseDurationInMonths}/></td>
                </tr>
                <tr><td>Fee: </td>
                   <td><input type="number" name='fee' placeholder='fee' onChange={handlechange} value={fee}/></td>
                </tr>
                
                {/* <tr>
                   <td><input type="file" name='imageDate' placeholder='imageData' /></td>
                </tr> */}
               
                <tr>
                    <td>TypeOfDance:</td>
                   <td> <input type="text" name='type' placeholder='typeOfDance' onChange={handlechange} value={type}/></td>
                </tr>
                <tr>
                    <td><button type='submit' onClick={handleSubmit} >Submit</button></td>
                </tr>
            </table>
        </form>
    </div>
  )
}

export default UpdateCourse
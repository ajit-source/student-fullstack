import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
export default function Home() {
    const [students,setStudents]=useState([]);

    const {id} = useParams()

    useEffect(()=>{
        loadStudents();
    }, [])

    const loadStudents = async()=>{
        const result =await axios.get("http://myrestapistud-env.eba-ji57ysmu.ap-south-1.elasticbeanstalk.com/webapi/student/")
        setStudents(result.data);
    };

    const deleteStudent= async (id)=>{
      await axios.delete(`http://myrestapistud-env.eba-ji57ysmu.ap-south-1.elasticbeanstalk.com/webapi/student/delete/${id}`)
      loadStudents()
    }

  return (
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">PRN NO</th>
      <th scope="col">NAME</th>
      <th scope="col">CLASS</th>
      <th scope="col">CITY</th>
    </tr>
  </thead>
  <tbody>
    {
      students.map((student,index)=>(
        <tr>
      <th scope="row" key={index}>{index + 1}</th>
      <td>{student.student_No}</td>
      <td>{student.student_Name}</td>
      <td>{student.student_Class}</td>
      <td>{student.student_City}</td>
      <td>
        <Link className='btn btn-primary mx-2'
        to={`/viewstudent/${student.student_No}`}
        >View</Link>
        <Link className='btn btn-outline-primary mx-2'
        to={`/editstudent/${student.student_No}`}
        >Edit</Link>
        <button className='btn btn-danger mx-2' onClick={()=>deleteStudent(student.student_No)}>Delete</button>
      </td>
    </tr>
      ))
    }
    
  </tbody>
</table>
        </div>
    </div>
  )
}

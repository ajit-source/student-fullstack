import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewStudent() {
    const [student, setStudent]= useState({
        student_No:"",
        student_Name:"",
        student_Class:"",
        student_City:""
    });

    //const {id} = useParams();
    const params = useParams();
    const no = params.student_No;

    useEffect(()=>{
        loadStudent()
    }, [])

    const loadStudent = async () => {
        if (no) {
     const result = await axios.get(`http://myrestapistud-env.eba-ji57ysmu.ap-south-1.elasticbeanstalk.com/webapi/student/search/${no}`);
     setStudent(result.data);
      } else {
     console.error('No parameter found in URL');
       }
     };
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Student Details</h2>
                <div className='card'>
                    <div className='card-header'>
                        Details of Student PRN NO: {student.student_No}
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Name: </b>
                                {student.student_Name}
                            </li>
                            <li className='list-group-item'>
                                <b>Class: </b>
                                {student.student_Class}
                            </li>
                            <li className='list-group-item'>
                                <b>City: </b>
                                {student.student_City}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to={"/"}>Back to Home</Link>
            </div>
        </div>
    </div>
  )
}

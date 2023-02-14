import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditStudent() {

    let navigate = useNavigate()

    //const id = useParams()

    //console.log(id)

    const [student, setStudent] = useState({
        student_No:"",
        Student_Name:"",
        Student_Class:"",
        Student_City:""
    });

    const{student_No,student_Name,student_Class,student_City}=student

    const onInputChange=(e)=>{
        setStudent({...student, [e.target.name]:e.target.value});

    };

    useEffect(()=>{
        loadStudent()
    }, []);

    const onSubmit=async (e)=>{
        e.preventDefault();
        await axios.put("http://myrestapistud-env.eba-ji57ysmu.ap-south-1.elasticbeanstalk.com/webapi/student/update/", student)
        navigate("/")

    };
    const params = useParams();
    const no = params.student_No;

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
                <h2 className='text-center m-4'>Edit Student</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                <div className='mb-3'>
                    <label htmlFor='Student_No' className='form-label'>PRN NO</label>
                    <input
                    type={"text"}
                    className='form-control'
                    placeholder='Enter Your PRN NO'
                    name='student_No'
                    value={student_No}
                    onChange={(e)=>onInputChange(e)}
                    readOnly
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='Student_Name' className='form-label'>NAME</label>
                    <input
                    type={"text"}
                    className='form-control'
                    placeholder='Enter Your Name'
                    name='student_Name'
                    value={student_Name}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='Student_Class' className='form-label'>CLASS</label>
                    <input
                    type={"text"}
                    className='form-control'
                    placeholder='Enter Your Class'
                    name='student_Class'
                    value={student_Class}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='Student_City' className='form-label'>CITY</label>
                    <input
                    type={"text"}
                    className='form-control'
                    placeholder='Enter Your City'
                    name='student_City'
                    value={student_City}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <button type='submit' className='btn btn-outline-primary'>
                    Submit
                </button>
                <Link className='btn btn-outline-danger mx-2' to="/">
                    Cancel
                </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

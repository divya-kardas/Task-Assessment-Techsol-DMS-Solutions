import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
  
  let navigate = useNavigate();

  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    const handleSubmit= async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            },
        body: JSON.stringify({ name:credentials.name,email:credentials.email, password:credentials.password,cpassword:credentials.cpassword }),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert("Account created successfully","success");

      }     
      else{
        props.showAlert("Invalid credentials","danger");
      }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className='conatiner mt-2'>
      <h3 className='my-2'>Craete an Account to user</h3>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" name="name" id="name" onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" name="email" id="email" onChange={onChange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" name="password" id="password" minLength={5} required onChange={onChange}/>
    </div>

    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" name="cpassword" id="cpassword" minLength={5} required onChange={onChange}/>
    </div>
  
    <button type="submit" className="btn btn-primary" >Submit</button>
     </form>
    </div>
  )
}

export default Signup

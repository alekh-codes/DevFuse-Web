import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [formData,setFormData] = useState({
    emailId:"alekh@example.com",
    password:"Thakur@1234"
  })

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async () =>{
    try{
      const res = await axios.post("http://localhost:3000/login",formData)
      console.log(res.data);
      
    }
    catch(err){
      console.log(err);
    }
  }
  return (    
      <div className="flex justify-center items-center my-20 text-black">
      
      <div className="card  w-96 border-black/20 border-2 ">
        <div className="card-body">
          <h2 className="card-title  text-3xl">Login</h2>
          <div>
            <fieldset className="fieldset my-4">
            <label className="label" htmlFor="name">
              Username
            </label>
            <input type="text"  name="emailId" value={formData.emailId} onChange={handleChange} className="bg-white border-2 p-2 rounded-lg"/>
          </fieldset>
          <fieldset className="fieldset my-4">
            <label className="label" htmlFor="name">
              Password
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="bg-white border-2 p-2 rounded-lg"/>
            <a className="text-blue-700 underline" href="#">Forgot password?</a>
          </fieldset>
          </div>
          <div className="card-actions justify-center ">
            <button type="button" onClick={handleSubmit} className="btn btn-primary rounded-2xl">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

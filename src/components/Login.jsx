import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const user = useSelector(store => store.user);
  const [formData, setFormData] = useState({
    emailId: "alekh@example.com",
    password: "Thakur@1234",
  });
  const[errors,setErrors] = useState("");
  const[loading,setLoading]= useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(BASE_URL + "/login", formData, {
        withCredentials: true,
      });
      
      dispatch(addUser(res.data.user)); 
      navigate("/")
      
    } catch (err) {
       console.log(err?.response?.data);
       
       setErrors(err?.response?.data ||  "Something went wrong!")
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user,navigate])
  return (
    <div className="flex justify-center items-center my-20  ">
      <div className="card  w-96 border-black/20 border-2 shadow-lg bg-[#464343]">
        <div className="card-body">
          <h2 className="card-title  text-3xl">Login</h2>
          <div>
            <fieldset className="fieldset my-4">
              <label className="label" htmlFor="name">
                Username
              </label>
              <input
                type="text"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className=" border-2 p-2 rounded-lg"
              />
            </fieldset>
            <fieldset className="fieldset my-4">
              <label className="label" htmlFor="name">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className=" border-2 p-2 rounded-lg"
              />
              <p
              className="text-red-600">{errors}</p>
              <a className="text-blue-700 underline" href="#">
                Forgot password?
              </a>
            </fieldset>
            
          </div>
          <div className="card-actions justify-center ">

            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary rounded-2xl"
            >
              {loading ? <div>
                Logging in...<span className="loading loading-spinner loading-xs"></span>
              </div>: "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

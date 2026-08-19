import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const user = useSelector(store => store.user);
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    emailId: "",
    password: "",
  });
  const[errors,setErrors] = useState("");
  const[loading,setLoading]= useState(false);
  const[isLoginForm,setIsLoginForm] = useState(true);
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
      setErrors("");
      setLoading(true);
      const endpoint = isLoginForm ? "/login" : "/signup";

      const res = await axios.post(BASE_URL + endpoint, formData,{withCredentials:true});
      
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
    <div className="flex justify-center items-center my-12  ">
      <div className="card  w-96 border-black/20 border-2 shadow-lg bg-[#464343]">
        <div className="card-body">
          <h2 className="card-title  text-3xl">{isLoginForm ? "Login" : "Sign up"}</h2>
          <div>
            {
              !isLoginForm && (
                <>
                <fieldset className="fieldset my-4">
              <label className="label" htmlFor="name">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className=" border-2 p-2 rounded-lg"
              />
            </fieldset>
            <fieldset className="fieldset my-4">
              <label className="label" htmlFor="name">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className=" border-2 p-2 rounded-lg"
              />
            </fieldset>
                </>
              )
            }
            <fieldset className="fieldset my-4">
              <label className="label" htmlFor="name">
                {isLoginForm ? "Username" : "Email"}
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
              <div className="flex justify-between items-center gap-20">
                <p 
              onClick={()=> setIsLoginForm(value => !value)}
              className="text-blue-400 underline cursor-pointer">
                {isLoginForm ? "New to DevFuse? Sign up" : "Already a user? Login here"}
              </p>
              <Link to="/edit/password"
              className="text-blue-400 underline cursor-pointer"
              >Forgot password?</Link>
              </div>
            </fieldset>
            
          </div>
          <div className="card-actions justify-center ">

            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary rounded-2xl"
            >
              {loading ? <div>
                {isLoginForm ? "Logging in..." : "Signing in...."}<span className="loading loading-spinner loading-xs"></span>
              </div>: isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

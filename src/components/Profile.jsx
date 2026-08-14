import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "@/utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, about, age, gender, emailId } = user || {};
  const [formData, setFormData] = useState({
    firstName: firstName ,
    lastName: lastName ,
    emailId:emailId,
    about: about ,
    age:  age ,
    gender: gender ,
  });

  const fetchUser = async () => {
      if (user) return;
      try {
        const res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        if (err.status === 401) {
          navigate("/login");
        }
      }
    };
    useEffect(() => {
      fetchUser();
    }, []);

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit =async () =>{
    const res = await axios.patch(BASE_URL + "/profile/edit",formData,{withCredentials:true});
    dispatch(addUser(res.data.user));
    navigate("/profile");
    
  }

  return (
    user && (
      <div className={`flex justify-center items-center   rounded-2xl `}>
        <div className="card  w-96 border-black/20 bg-[#464343] border-2 shadow-lg">
          <div className="card-body">
            <h2 className="card-title  text-3xl">Edit details</h2>
            <div>
              <fieldset className="fieldset ">
                <label className="label" htmlFor="name">
                  FirstName:
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className=" border-2 p-2 rounded-lg"
                />
              </fieldset>
              <fieldset className="fieldset my-1">
                <label className="label" htmlFor="name">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border-2 p-2 rounded-lg"
                />
              </fieldset>
              <fieldset className="fieldset my-1">
                <label className="label" htmlFor="name">
                  Email:
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  className="border-2 p-2 rounded-lg"
                />
              </fieldset>
              <fieldset className="fieldset my-1">
                <label className="label" htmlFor="name">
                  Gender:
                </label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                   onChange={handleChange}
                  className=" border-2 p-2 rounded-lg"
                />
              </fieldset>
              <fieldset className="fieldset my-1">
                <label className="label" htmlFor="name">
                  Age:
                </label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                   onChange={handleChange}
                  className=" border-2 p-2 rounded-lg"
                />
              </fieldset>
              <fieldset className="fieldset my-1">
                <label className="label" htmlFor="name">
                  About:
                </label>
                <input
                  type="text"
                  name="about"
                  value={formData.about}
                   onChange={handleChange}
                  className=" border-2 p-2 rounded-lg"
                />
              </fieldset>
            </div>
            <div className="card-actions justify-center ">
              <Link to="/profile"
              type="button" className="btn bg-white text-black rounded-2xl">
                Cancel
              </Link>
              <button onClick={handleSubmit} type="button" className="btn btn-primary rounded-2xl">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";

const Profile = ({ user,editForm, onCancel }) => {
  const { firstName, lastName, about, age, gender, emailId } = user || {};
  const [formData, setFormData] = useState({
    firstName: firstName ,
    lastName: lastName ,
    emailId:emailId,
    about: about ,
    age:  age ,
    gender: gender ,
  });

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  return (
    user && (
      <div className={`flex justify-center items-center  bg-[#464343] rounded-2xl ${editForm === true ? "block" :"hidden"}`}>
        <div className="card  w-96 border-black/20 border-2 shadow-lg">
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
              <button 
              onClick={onCancel}
              type="button" className="btn bg-white text-black rounded-2xl">
                Cancel
              </button>
              <button type="button" className="btn btn-primary rounded-2xl">
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

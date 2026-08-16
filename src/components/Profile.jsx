import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "@/utils/userSlice";
import { RiCloseLine } from "react-icons/ri";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, about, age, gender, emailId, skills } =user || {};
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    about: about,
    age: age,
    gender: gender,
    skills: skills,
  });
  const [skillInput, setSkillInput] = useState("");
  const [error,setError] = useState(null);
  const [toast,setToast] = useState(false);
  const [loading,setLoading] = useState(false);

  const addSkill = () => {
    if (!skillInput.trim()) return;

    setFormData({
      ...formData,
      skills: [...formData.skills, skillInput.trim()],
    });
    setSkillInput("");
  };

  const deleteSkill = (index) =>{
    setFormData({
      ...formData,
      skills: formData.skills.filter((item,i) => i !== index)
    })
  }
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

  useEffect(() => {
    setFormData({
      firstName: firstName || "",
      lastName: lastName || "",
      gender: gender || "",
      age: age || "",
      about: about || "",
      skills: skills || [],
    });
  }, [user]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setError("");   
    try{
      setLoading(true);
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
      withCredentials: true,
    });
     
    
    dispatch(addUser(res.data.user));
     setToast(true)
     const i = setTimeout(()=>{
      setToast(false);
      navigate("/profile");
     },2000)
    }catch(err){
      console.log("ERROR:", err);
  console.log("RESPONSE:", err.response?.data);

      setError(err?.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return (
    user && (
      <div className={`flex justify-center items-center   rounded-2xl `}>
        <div className="card w-96 border-black/20 bg-[#464343] border-2 shadow-lg">
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
                  value={emailId}
                  disabled
                  className="border-2 p-2 rounded-lg bg-gray-100/40 cursor-not-allowed"
                />
              </fieldset>
              <fieldset className="fieldset my-1">
                <label className="label" htmlFor="name">
                  Gender:
                </label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="bg-[#464343] p-2 border-2 rounded-lg" id="">
                    <option hidden defaultValue="select a gender" value="">Select a gender</option>
                      <option name="male" value="male">Male</option>
                      <option name= "female" value="female">Female</option>
                      <option name="others" value="others">Others</option>
                    
                  </select>
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
              <fieldset className="fieldset my-1">
                <label className="label" htmlFor="name">
                  Skills:
                </label>
                <div className="w-fit">
                  <input
                    type="text"
                    name="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className=" border-2 p-2 rounded-lg"
                  />
                  <button
                    onClick={addSkill}
                    className="border-2 mx-2 p-2 rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((item, index) => (
                    <div
                      key={index}
                      className="group relative p-2 pr-3 rounded-2xl bg-zinc-800/80 text-[#7df9ff] border border-[#7df9ff]/30"
                    >
                      <span className="text-xs shadow-sm">{item}</span>

                      <button
                        type="button"
                        onClick={()=>deleteSkill(index)}
                        className="absolute -top-2 -right-2 cursor-pointer hidden group-hover:flex items-center justify-center w-5 h-5 rounded-full bg-zinc-700 text-gray-200"
                      >
                        <RiCloseLine size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </fieldset>
              <p className="text-red-500 text-sm">{error}</p>
            </div>
            <div className="card-actions justify-center ">
              <Link
                to="/profile"
                type="button"
                className="btn bg-white text-black rounded-2xl"
              >
                Cancel
              </Link>
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary rounded-2xl"
              >
                {loading ?  <div>Saving....
                    <span className="loading loading-spinner loading-xs"></span>
                  </div>: <span>Save</span>}
              </button>
            </div>
          </div>
        </div>
        {
          toast && (
            <div className="toast toast-top toast-end mt-10">
          <div className="alert alert-info">
            <span>Profile saved successfully!</span>
          </div>
        </div>
          )
        }
      </div>
    )
  );
};

export default Profile;

import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { div, p } from "motion/react-client"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditPassword = () =>{
    const [passData,setPassData] = useState({
        emailId:"",
        password:"",
        newPassword:""
    })
    const[errors,setErrors] = useState("");
    const[showToast,setShowtoast] = useState(false);
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setPassData({
            ...passData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async () =>{
        setErrors("");
        setLoading(true);
        try{
        const res = await axios.patch(BASE_URL + "/edit/password", passData);
        setShowtoast(true);
        setTimeout(() => {
            setShowtoast(false);
            navigate("/login")
        }, 2000);
        
        }catch(err){            
            setErrors(err?.response?.data || "Something went wrong");
            setShowtoast(true)
            setTimeout(() => {
                setShowtoast(false);
            }, 2000);
        }
        finally{
            setLoading(false);
            
        }
        
    }
    return(
        <div className="flex justify-center items-center my-12  ">
        {
            showToast && (
                <div className="toast toast-top toast-center">
                    <div className={`${errors ? "bg-red-400" : "bg-green-500"} alert alert-success`}>
                    {
                    errors ? 
                    <span>{errors}</span>:
                    <span>Password updated successfully!</span>
                    }
                    </div>
                </div>
            )
        }
      <div className="card  w-96 border-black/20 border-2 shadow-[0_0_22px_22px_rgba(0,0,0,0.3)]">
        <div className="card-body">
          <h2 className="card-title  text-3xl">Edit password</h2>
          <div>
            
                
                <fieldset className="fieldset my-4">
              <label className="label" htmlFor="name">
                Email:
              </label>
              <input
                type="text"
                name="emailId"
                value={passData.emailId}
                onChange={handleChange}
                className=" border-2 p-2 rounded-lg"
              />
            </fieldset>
                <fieldset className="fieldset my-4">
              <label className="label" htmlFor="name">
                Current Password
              </label>
              <input
                type="text"
                name="password"
                value={passData.password}
                onChange={handleChange}
                className=" border-2 p-2 rounded-lg"
              />
            </fieldset>
            <fieldset className="fieldset my-4">
              <label className="label" htmlFor="name">
                New Password
              </label>
              <input
                type="text"
                name="newPassword"
                value={passData.newPassword}
                onChange={handleChange}
                className=" border-2 p-2 rounded-lg"
              />
              
            </fieldset>
            <div className="card-actions justify-center ">
                <button
                onClick={handleSubmit}
              type="button"
              className="btn btn-primary rounded-2xl"
            >
             {loading ? <p>Saving....<span className="loading loading-spinner loading-xs"></span></p> : <p>Save Password</p>}
            </button>
            </div>
           
           
              
          </div>
          
        </div>
      </div>
    </div>
    )
}

export default EditPassword;
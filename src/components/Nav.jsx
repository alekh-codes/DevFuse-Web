import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";
import { removeConnections } from "@/utils/connectionsSlice";
import { removeRequest } from "@/utils/requestSlice";
import { removeFeed, removeUserFromfeed } from "@/utils/feedSlice";
const Nav = () => {
    const user = useSelector((store) => store.user);
    const[showPop,setShowPop] = useState(false);
    const[error,setError] = useState("");
    const {firstName,imagUrl} = user || {};
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () =>{
      try{
        const user = await axios.post(BASE_URL + "/logout",{},{withCredentials:true});
        dispatch(removeUser());
        
        navigate("/login");
      }catch(err){
        
      }
    }
    const handleDelete = async()=>{
      try{
        const user = await axios.post(BASE_URL + "/deleteUser",{},{withCredentials:true})
        dispatch(removeUser(user))
        setShowPop(false);
        navigate("/login")
      }catch(err){
        if(err.response?.status === 500){
          setError(err.response?.data?.message);
        }
      }
    }
  return (
    <>
    <div className="flex justify-between items-center  mt-3">
      <div className="flex items-center">
        <img src={Logo} className="w-10 md:w-13 lg:w-15" alt="" />
        <Link to="/" className=" text-xl md:text-2xl lg:text-3xl font-medium -mt-0.5">DevFuse</Link>
      </div>
      {user && (

        <div className="dropdown dropdown-end mx-4 flex items-center">
        
        <div className="text-sm  mx-4 hidden md:block">
            Hello {firstName}!
        </div>    
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar flex items-center"
        >
            
          <div className="rounded-full">
            <img
                src={`${BASE_URL}${imagUrl}`}
                 alt={firstName}
            />
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-37 w-52 p-2 shadow"
        >
          <li>
            <Link to="/profile" className="justify-between">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/connections">Connections</Link>
          </li>
          <li>
            <Link to="/requests/received">Pending requests</Link>
          </li>
          <li>
            <button
            onClick={()=>setShowPop(true)}
            >Delete my account</button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          
        </ul>
        </div>
      
      )}
    </div>
    {
      showPop &&(
        <div className="flex justify-center items-center">
      <div className="flex flex-col bg-[#444144] rounded-xl p-5">
        <p className="text-[15px] z-1000 font-bold">Are you sure you want to delete your account?</p>
        {
          error && <p className="text-red-500">{error}</p>
        }
        <div className="flex justify-end gap-4 mt-4">
        <button
        onClick={()=>setShowPop(false)}
        className="cursor-pointer bg-white hover:bg-white/90 p-2 text-black rounded-xl">Cancel</button>
        <button 
        onClick={handleDelete}
        className="cursor-pointer bg-red-500 hover:bg-red-600 p-2 text-black rounded-xl">Delete</button>
      </div></div>
    </div>
      )
    }
    </>
  );
};
export default Nav;

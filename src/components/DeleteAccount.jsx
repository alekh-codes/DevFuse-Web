import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "@/utils/userSlice";

const DeleteAccount = ({setShowPop}) =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[error,setError] = useState("");
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
    return(
        <div className="fixed flex justify-center items-center w-full h-full bg-black/80">
      <div className="flex flex-col bg-[#444144] rounded-xl mx-5 p-5">
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

export default DeleteAccount
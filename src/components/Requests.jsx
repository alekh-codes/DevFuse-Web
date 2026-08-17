import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addRequests } from '@/utils/requestSlice'

const Requests = () =>{
    const requests = useSelector(store => store.requests);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchRequests = async () =>{
        try{
            const res = await axios.get(BASE_URL + "/requests/received",{withCredentials:true});
            console.log(res.data.data);
            dispatch(addRequests(res?.data?.data));
            
        }catch(err){
           if (err.status === 401) {
            navigate("/error");
           }
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    if(!requests) return;
    if(requests.length ===0) return <h1 className='text-xl font-bold text-white'>No request found</h1>

    return(
        <div className='flex justify-center'>
      <div className='shadow-xl bg-[#464343] rounded-xl p-2 m-20'>
        <h1 className='text-xl font-medium'>Requests</h1>
        <hr className='mt-2 opacity-40' />
        {
          requests.map(request =>{ 
            const {_id,firstName , lastName,imagUrl,about} = request.fromUserId;
            
            return (
            
            <div key={_id} className='flex m-5 border-2 shadow-md border-gray-400/20 p-2 rounded-xl'>
              <div className=''>
                <img src={imagUrl} className='h-20 w-20 rounded-full' alt="" />
              </div>
              <div className='m-3'>
                <p className="font-bold text-xl">{lastName ? (firstName + ' ' + lastName) : firstName}</p>
                <p>{about}</p>
              </div>
            </div>
          )})
        }
      </div>
    </div>
    )
}

export default Requests;
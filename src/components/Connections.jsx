import { addConnections } from '@/utils/connectionsSlice'
import { BASE_URL } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Connections = () => {
    const connections = useSelector(store => store.connections);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getConnections = async () =>{
        try{
            
        const res = await axios.get(BASE_URL + "/connections",{withCredentials:true});
        dispatch(addConnections(res?.data?.user))
        }catch(err){
            navigate("/error");
        }
    }

    useEffect(()=>{
        getConnections();
    },[])

    if(!connections) return;
    if(connections.length ===0) return <h1 className='text-xl font-bold text-white'>No connections found</h1>
  return (
    <div className='flex justify-center'>
      <div className='shadow-xl bg-[#464343] rounded-xl p-2 m-20'>
        <h1 className='text-xl font-medium'>Connections</h1>
        <hr className='mt-2 opacity-40' />
        {
          connections.map(connection =>{ 
            const {firstName, lastName,_id,about,imagUrl} = connection;
            return (
            
            <div key={_id} className='flex m-5 border-2 shadow-md border-gray-400/20 p-2 rounded-xl'>
              <div className=''>
                <img src={imagUrl} className='h-20 w-20 rounded-full' alt="" />
              </div>
              <div className='m-3'>
                <p>{lastName ? (firstName + ' ' + lastName) : firstName}</p>
                <p>{about}</p>
              </div>
            </div>
          )})
        }
      </div>
    </div>
  )
}

export default Connections

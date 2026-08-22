import { addConnections } from '@/utils/connectionsSlice'
import { BASE_URL } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Connections = () => {
    const connections = useSelector(store => store.connections);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [noConnection,setNoConnection] = useState(false);
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

    useEffect(()=>{
      setTimeout(()=>{
        setNoConnection(true)
      },5000)
    },[connections])
    

    if(!connections) return;
    if(connections.length ===0) return <div className='text-xl text-center mt-20 font-bold text-white'>
      {
        !noConnection ? (
          <>
          <span>DevFuse</span>
            <span className="loading loading-infinity text-4xl loading-xl"></span>
          </>
        ):(
          <div className="mt-4">No connections found</div>
        )
      }
    </div>
  return (
    <div className='flex justify-center mx-5 mt-10'>
      <div className='shadow-[0_0_22px_22px_rgba(0,0,0,0.3)] rounded-xl p-3 bg-zinc-950/80 '>
        <h1 className='text-xl font-medium'>Connections</h1>
        <hr className='mt-2 opacity-40' />
        {
          connections.map(connection =>{ 
            const {firstName, lastName,_id,about,imagUrl} = connection;
            return (
            
            <div key={_id} className='flex items-center m-5 border-2  shadow-md border-gray-400/20 p-2 rounded-xl'>
              <div className='w-20 h-20 shrink-0'>
                <img src={`${BASE_URL}${imagUrl}`} className='border-2 border-white h-full w-full rounded-full' alt="" />
              </div>
              <div className='m-3'>
                <p className='text-[16px] md:text-xl font-medium' >{lastName ? (firstName + ' ' + lastName) : firstName}</p>
                <p className='text-gray-400/60'>{about}</p>
              </div>
            </div>
          )})
        }
      </div>
    </div>
  )
}

export default Connections

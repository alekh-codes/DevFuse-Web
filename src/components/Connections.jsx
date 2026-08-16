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
        console.log(res.data.user);
        dispatch(addConnections(res?.data?.user))
        }catch(err){
            navigate("/error");
        }
    }

    useEffect(()=>{
        getConnections();
    },[])
  return (
    <div>
      Connections page
    </div>
  )
}

export default Connections

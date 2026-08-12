import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addfeed } from '../utils/feedSlice';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const getFeed = async () => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
    dispatch(addfeed(res.data))
    }catch(err){
      navigate("/error");
    }

  }

  useEffect(()=>{
    getFeed();
  },[])

  return feed && (
    <div className='text-black text-2xl flex justify-center'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed

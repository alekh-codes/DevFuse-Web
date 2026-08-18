import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addfeed } from '../utils/feedSlice';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import { RiCheckLine } from 'react-icons/ri';
import GradientText from './GradientText';

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const getFeed = async () => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
    dispatch(addfeed(res?.data?.data))
    }catch(err){
      navigate("/error");
    }

  }

  useEffect(()=>{
    getFeed();
  },[])

  if(!feed) return null;
  if(feed.length === 0) return(
    <div className='flex flex-col justify-center items-center '>
      <GradientText
      colors={["#75e9ee","#56ee0e","#2b52f0"]}
      animationSpeed={4}
      showBorder={false}
      className="custom-class"
      >
        <h1 className='font-bold text-2xl mt-20'>All caught up! Check back later for new profiles</h1>
      </GradientText>
     
      <RiCheckLine className='text-6xl mt-12 bg-green-600 p-2 rounded-full'/>
    </div>
  )
  return feed && (
    <div className='text-black text-2xl flex justify-center'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed

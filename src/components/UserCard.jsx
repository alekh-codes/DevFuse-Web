import { BASE_URL } from "@/utils/constants";
import { removeUserFromfeed } from "@/utils/feedSlice";
import axios from "axios";
import { RiCodeSSlashFill, RiGitPullRequestFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import TinderCard from "react-tinder-card";
const UserCard = ({user}) =>{
  
  const { _id, firstName, lastName,about,imagUrl,age,gender,skills=[]} = user || {};

  const dispatch = useDispatch();
  const sendRequest = async (status,userId) =>{    
    
    const res = await axios.post(BASE_URL + "/request/send/" + status +  "/" + userId, {} , {withCredentials:true});
    dispatch(removeUserFromfeed(userId));


  }

  const onSwipe = (direction) =>{
    if(direction==="left"){
      sendRequest("ignored", _id)
    }else if(direction === "right"){
      sendRequest("interested",_id);
    }
  }
    return(
        <TinderCard
      onSwipe={onSwipe}
      preventSwipe={["up","down"]}
      className="absolute cursor-grab active:cursor-grabbing"
      >
        <div className="p-6 flex mx-6 flex-col bg-zinc-900 justify-center items-center w-100 h-120  rounded-xl  text-center ">
            <div className="w-22 h-22 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#7df9ff] shadow-[0_0_15px_rgba(125,249,255,0.3)] mb-4">
              <img
                src={`${BASE_URL}${imagUrl}`}
                alt={firstName}
                className="w-full h-full object-full "
              />
              
            </div>

            <h1 className="text-2xl text-white font-bold ">
              {lastName ? `${firstName} ${lastName}` : firstName}
            </h1>

            <p className="text-sm text-zinc-400 mt-1 capitalize font-medium">
              {gender} {gender && age ? "·" : ""} {age}
            </p>

            <p className="text-sm text-zinc-300 mt-4 leading-relaxed max-w-xs">
              {about}
            </p>

            <div className="mt-5 w-full">
              <h3 className="text-xs uppercase font-semibold text-zinc-400 mb-2 tracking-wider">
                Skills & Interests
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full text bg-zinc-900/80 text-[#0ff7f7] border-2 border-zinc-400 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm mt-7 flex gap-4 ">
              <button 
              title="Ignore"
              onClick={()=> sendRequest("ignored",_id)}
              className="hidden xl:block cursor-pointer bg-red-500 p-3 text-2xl text-white border-white border-2 rounded-xl"><RiCodeSSlashFill/></button>
              <button
              title="Interested"
              onClick={()=> sendRequest("interested", _id)}              
              className="hidden xl:block cursor-pointer bg-blue-500 p-3 text-2xl text-white border-white border-2 rounded-xl"><RiGitPullRequestFill/></button>

            </div>
          </div>
      </TinderCard>
      
    )
}
export default UserCard
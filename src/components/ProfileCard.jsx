import {  RiEdit2Line } from "react-icons/ri";
import ElectricBorder from "./ElectricBorder";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/utils/constants";

const ProfileCard = () => {
  const user = useSelector((store) => store.user);
  
  const { firstName, lastName, age, gender, about, skills, imagUrl } =
    user || {};
  
  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    user && (
      <div className={`flex justify-center text-white p-4 flex-col items-center `}>
        <ElectricBorder
          color="#7df9ff"
          speed={1}
          chaos={0.12}
          thickness={2}
          style={{ borderRadius: 16 }}
        >
          <div className="p-6 flex flex-col justify-center items-center w-100 text-center ">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#7df9ff] shadow-[0_0_15px_rgba(125,249,255,0.3)] mb-4">
              <img
                src={`${BASE_URL}${imagUrl}`}
                alt={firstName}
                className="w-full h-full object-cover"
              />
              <div className="absolute right-5 top-4 ">
                <Link to="/profile/edit">
                <RiEdit2Line
                    className="text-white cursor-pointer"
                  />
                </Link>
              </div>
            </div>

            <h1 className="text-2xl font-bold tracking-wide">
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
              <div className="flex flex-wrap  gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-zinc-800/80 text-[#7df9ff] border border-[#7df9ff]/30 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ElectricBorder>

       
        
      </div>
    )
  );
};

export default ProfileCard;

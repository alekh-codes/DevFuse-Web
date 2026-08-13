import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
const Nav = () => {
    const user = useSelector((store) => store.user);
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
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo} width="64" alt="" />
        <Link to="/" className=" text-3xl font-medium -mt-0.5">DevFuse</Link>
      </div>
      {user && (

        <div className="dropdown dropdown-end mx-4 flex items-center">
        
        <div className=" mx-4">
            Welcome {user.firstName}!
        </div>    
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar flex items-center"
        >
            
          <div className="w-10 rounded-full">
            <img
                src={user.imagUrl}
                 alt={user.firstName}
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
            <a>Settings</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
        </div>
      
      )}
    </div>
  );
};
export default Nav;

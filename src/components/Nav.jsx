import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
const Nav = () => {
    const user = useSelector((store) => store.user);
    const {firstName,imagUrl} = user || {};
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
    <div className="flex justify-between items-center  mt-5">
      <div className="flex items-center">
        <img src={Logo} className="w-10 md:w-13 lg:w-15" alt="" />
        <Link to="/" className=" text-sm md:text-2xl lg:text-3xl font-medium -mt-0.5">DevFuse</Link>
      </div>
      {user && (

        <div className="dropdown dropdown-end mx-4 flex items-center">
        
        <div className="text-sm  mx-4 hidden md:block">
            Hello {firstName}!
        </div>    
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar flex items-center"
        >
            
          <div className="rounded-full">
            <img
                src={`${BASE_URL}${imagUrl}`}
                 alt={firstName}
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
            <Link to="/connections">Connections</Link>
          </li>
          <li>
            <Link to="/requests/received">Pending requests</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          
        </ul>
        </div>
      
      )}
    </div>
  );
};
export default Nav;

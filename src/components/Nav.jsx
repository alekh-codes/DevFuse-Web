import { useSelector } from "react-redux";
import Logo from "../assets/Logo.png";
const Nav = () => {
    const user = useSelector((store) => store.user)
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo} width="64" alt="" />
        <span className="text-black text-3xl font-medium -mt-0.5">DevFuse</span>
      </div>
      {user && (

        <div className="dropdown dropdown-end mx-4 flex items-center">
        
        <div className="text-black mx-4">
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
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
        </div>
      
      )}
    </div>
  );
};
export default Nav;

import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)

  const fetchUser = async () => {
    if(user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status === 401){
        navigate("/login");
      }
    }
  };
  useEffect(() => {
        fetchUser();
    
  }, []);

  return (
    <div className="">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;

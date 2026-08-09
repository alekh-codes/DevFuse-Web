import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

const Body = () =>{
    return(
        <div className="">
            <Nav/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default Body;
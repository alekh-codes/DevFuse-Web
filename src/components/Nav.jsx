import Logo from "../assets/Logo.png"
const Nav = () =>{
    return(
        <div>
            <div className="flex items-center">
                <img src={Logo}                
                width="64"
                alt="" />
                <span className="text-black text-3xl font-medium -mt-0.5">DevFuse</span>
            </div>
        </div>
    )
}
export default Nav;
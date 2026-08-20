import { RiLinkedinBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"
const Footer = () => {
  return (
   <footer className="footer sm:footer-horizontal flex flex-col md:flex-row justify-center items-center p-4">
  <aside className="grid-flow-col items-center">
     <img
          src={Logo}
          alt="Logo"
          className="w-10"
        />
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col md:place-self-center md:justify-self-end">
    <Link to="https://www.linkedin.com/in/code-alekh22/" className="text-3xl">
      <RiLinkedinBoxFill/>
    </Link>
  </nav>
</footer>
  );
};

export default Footer;
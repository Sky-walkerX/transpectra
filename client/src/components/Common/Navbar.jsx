import { AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "../core/ProfileDropDown";
import logo from "../../assets/Images/Logo.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  // Paths where navbar should be hidden
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  // Check if the current page is the homepage to make the navbar fully transparent
  const isHomePage = location.pathname === "/";
  
  // Check if the navbar is at the top of the page
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    // Call once to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hideNavbar) {
    return null;
  }



  return (
    <div
      className={`w-full flex h-14 items-center justify-center ${
        isHomePage ? "fixed top-0 left-0" + (isAtTop ? " bg-transparent h-20" : " bg-blu") : "bg-blu"
      } transition-all duration-200 z-50`}
    >
      <div className="flex w-10/12 h-14 max-w-maxContent items-center justify-between">
        <Link to="/" className="flex items-center h-14">
          <img src={logo} alt="Logo" className={`h-full transition-all duration-300 object-contain py-1 pl-6 ${isAtTop && isHomePage ? "scale-125" : ""}`}/>
        </Link>
        {/* Login / Signup / Dashboard */}
        <div className="items-center gap-x-4 md:flex">
          {token === null && (
            <Link to="/login">
              <button className="rounded-md bg-richblue-5 px-5 py-2 text-richblue-700 font-medium transition-all duration-200 hover:outline hover:outline-2 hover:outline-richblue-100 hover:outline-offset-2 focus:outline focus:outline-2 focus:outline-richblue-100 focus:outline-offset-2">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-md bg-richblue-5 px-5 py-2 text-richblue-700 font-medium transition-all duration-200 hover:outline hover:outline-2 hover:outline-richblue-100 hover:outline-offset-2 focus:outline focus:outline-2 focus:outline-richblue-100 focus:outline-offset-2">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;

import { AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation, matchPath } from "react-router-dom"; // Added matchPath for active link styling
import ProfileDropdown from "../core/ProfileDropDown";
import logo from "../../assets/Images/Logo.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Define your navigation links here
const NavbarLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

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

  // Function to determine if a link is active
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`w-full flex h-14 items-center justify-center 
                  ${isHomePage && isAtTop ? "fixed top-0 left-0 bg-transparent h-20" : "bg-richblue-900"} 
                  transition-all duration-200 z-50`}
    >
      <div className="flex w-10/12 h-14 max-w-maxContent items-center justify-between">
        <Link to="/" className="flex items-center h-14">
          <img 
            src={logo} 
            alt="Logo" 
            className={`h-full transition-all duration-300 object-contain py-1 pl-6 
                        ${isAtTop && isHomePage ? "scale-125" : ""}`}
          />
        </Link>

        {/* Main Navigation Links */}
        <nav className="hidden md:flex"> {/* Hidden on small screens, flex on medium and larger */}
          <ul className="flex flex-row gap-x-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.path}
                  className={`text-slate-200 font-medium 
                              ${matchRoute(link.path) ? "text-blue-400 font-bold" : "hover:text-blue-300"} 
                              transition-colors duration-200`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="flex items-center gap-x-4"> {/* Keep this flexible for visibility on all screen sizes */}
          {token === null && (
            <> {/* Use a fragment to group buttons */}
              <Link to="/login" className="hidden md:block"> {/* Hide on small screens to prioritize space */}
                <button 
                  className="rounded-md px-5 py-2 font-medium 
                             bg-slate-700 text-slate-100       
                             transition-all duration-200 
                             hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-offset-2 
                             focus:outline focus:outline-2 focus:outline-blue-400 focus:outline-offset-2"
                >
                  Log In
                </button>
              </Link>
              <Link to="/signup" className="hidden md:block"> {/* Hide on small screens */}
                <button 
                  className="rounded-md px-5 py-2 font-medium 
                             bg-slate-700 text-slate-100       
                             transition-all duration-200 
                             hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-offset-2 
                             focus:outline focus:outline-2 focus:outline-blue-400 focus:outline-offset-2"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Hamburger Menu Icon (for mobile - appears when md: is not met for links/buttons) */}
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
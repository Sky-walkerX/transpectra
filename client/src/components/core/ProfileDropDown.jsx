import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import img from "../../assets/Images/profile.jpg" // Assuming this path is correct
import useOnClickOutside from "../../hooks/useOnClickOutside" // Assuming this hook exists
import { logout } from "../../services/oparations/authAPI" // Assuming this service exists

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  // Ensure user data is available before rendering
  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={img} // Using the imported image
          alt={user?.firstName || 'User Profile'} // Fallback alt text
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        {/* Caret icon text color should be light for dark mode */}
        <AiOutlineCaretDown className="text-sm text-slate-200" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when clicking inside
          className="absolute top-[118%] right-0 z-[1000]
                     divide-y-[1px] divide-slate-600       {/* Darker divider */}
                     overflow-hidden rounded-md border-[1px] border-slate-600 {/* Darker border */}
                     bg-slate-700                         {/* Dark background for dropdown */}
                     shadow-lg                            {/* Add a subtle shadow */}
                     "
          ref={ref}
        >
          {/* Dashboard Link */}
          <Link to="/dashboard/analytics" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[8px] px-[22px] text-sm
                            text-slate-100                  {/* Light text color */}
                            hover:bg-slate-600              {/* Darker hover background */}
                            hover:text-slate-50             {/* Slightly lighter text on hover */}
                            transition-colors duration-200" 
            >
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          {/* Logout Button */}
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[8px] px-[22px] text-sm
                       text-slate-100                     {/* Light text color */}
                       hover:bg-slate-600                 {/* Darker hover background */}
                       hover:text-slate-50                {/* Slightly lighter text on hover */}
                       transition-colors duration-200 cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}
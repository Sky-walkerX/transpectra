import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

// import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
    //   onClick={() => dispatch(resetCourseState())}
      className={`relative text-sm font-medium`}
    >
      <div className={`flex items-center gap-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
        matchRoute(link.path)
          ? "bg-white text-richblue-700"
          : "text-white hover:bg-richblue-500"
      }`}>
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}
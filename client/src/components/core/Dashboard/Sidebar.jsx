import { useState } from "react"
import { VscSignOut, VscSettingsGear, VscDashboard } from "react-icons/vsc" // Imported VscDashboard for clarity
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links" // Assuming this path is correct
import { logout } from "../../../services/oparations/authAPI" // Assuming this path is correct

import ConfirmationModal from "../../Common/ConfirmationModal" // Assuming this path is correct
import SidebarLink from "./SidebarLinks" // Assuming this path is correct

export default function Sidebar() {
  const { user, loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-richblue-700 bg-richblue-800">
        <div className="spinner"></div> {/* Assuming 'spinner' class is defined elsewhere */}
      </div>
    )
  }

  // console.log("Sidebar user:", user) // Keep for debugging if needed, otherwise remove

  return (
    <>
      {/* Sidebar aside element - Adjusted for dark mode */}
      <aside className="flex h-[calc(100vh-3.5rem)] min-w-[250px] flex-col justify-between
                        border-r border-richblue-700           {/* Darker border */}
                        bg-richblue-800                        {/* Dark background */}
                        text-slate-100                         {/* Light text color */}
                        px-4 py-6 shadow-sm">
        {/* Navigation Links */}
        <div className="flex flex-col gap-y-3">
          {sidebarLinks.map((link) => {
            // Conditionally render links based on user account type
            if (link.type && user?.accountType !== link.type) return null
            return (
              // SidebarLink component should be designed to handle dark mode active/hover states internally
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>

        {/* Divider - Adjusted for dark mode */}
        <hr className="my-6 border-t border-dashed border-richblue-700" />

        {/* Settings + Logout */}
        <div className="space-y-3">
          {/* Settings Link - Assuming SidebarLink handles dark mode */}
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          {/* Logout Button - Adjusted for dark mode hover */}
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            // Text color remains white for contrast, hover background adjusted
            className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium text-white
                       hover:bg-richblue-700           {/* Darker hover background */}
                       transition"
          >
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Confirmation Modal - Assuming this component is also dark mode compatible */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
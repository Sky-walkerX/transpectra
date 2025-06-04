import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/oparations/authAPI"

import ConfirmationModal from "../../Common/ConfirmationModal"
import SidebarLink from "./SidebarLinks"

export default function Sidebar() {
  const { user, loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-richblue-700 bg-richblue-800">
        <div className="spinner"></div>
      </div>
    )
  }

  console.log("Sidebar user:", user)

  return (
    <>
      <aside className="flex h-[calc(100vh-3.5rem)] min-w-[250px] flex-col justify-between border-r border-richblue-200 bg-white text-blue-5 px-4 py-6 shadow-sm dark:bg-richblue-700 dark:border-richblue-700">
        {/* Navigation Links */}
        <div className="flex flex-col gap-y-3">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>

        {/* Divider */}
        <hr className="my-6 border-t border-dashed border-richblue-200 dark:border-richblue-700" />

        {/* Settings + Logout */}
        <div className="space-y-3">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
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
            className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-richblue-500 transition"
          >
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
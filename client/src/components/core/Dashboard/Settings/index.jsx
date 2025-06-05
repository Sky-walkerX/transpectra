import { useState } from "react";
import { useSelector } from "react-redux";
import ChangeInventoryExcelSheet from "./ChangeInventoryExcel";
import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import ProfileCard from "../ProfileCard";

export default function Settings() {
  const user = useSelector((state) => state.auth?.user || null);
  const isStore = user?.accountType === "Warehouse_Manager";
  const isYard = user?.accountType === "Yard_managers";

  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="flex items-center justify-center pt-8">
      {/* Changed max-w-[1000px] to max-w-[700px] */}
      <div className="max-w-[700px] w-full px-4">
        <h1 className="mb-6 text-3xl font-medium text-white">Settings</h1>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          {/* View Profile Button */}
          <button
            onClick={() => setActiveTab("view")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md
              ${
                activeTab === "view"
                  ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            👁️ View Profile
          </button>

          {/* Edit Profile Button */}
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md
              ${
                activeTab === "edit"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            ✏️ Edit Profile
          </button>
        </div>

        {/* Conditional Sections */}
        {activeTab === "view" && <ProfileCard />}

        {activeTab === "edit" && (
          <>
            {!isYard && <ChangeProfilePicture />}
            {isStore && <ChangeInventoryExcelSheet />}
            {!isYard && <EditProfile />}
            <DeleteAccount />
          </>
        )}
      </div>
    </div>
  );
}
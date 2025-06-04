import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/core/Dashboard/Sidebar";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.auth);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)]">
      <div className="flex">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] bg-richblue-800 flex-1 overflow-y-auto no-scrollbar">
        <div className="mx-auto w-full max-w-[1300px] px-3 py-3">
          <Outlet />
        </div>
      </div>
      </div>

    </div>
  );
}

export default Dashboard;

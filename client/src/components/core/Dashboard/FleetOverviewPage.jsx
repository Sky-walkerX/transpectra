// app/dashboard/FleetOverviewPage.js
"use client"

import ProfileCard from "./ProfileCard"
import YardActivities from "./YardActivites"

const FleetOverviewPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-richblue-800 shadow-sm border-b border-richblue-200">
        <div className="max-w-full px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Fleet Overview</h1>
            <p className="text-richblue-50 mt-1">Monitor and manage yard activities in real-time</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full px-6 py-8 grid grid-cols-1 xl:grid-cols-10 gap-8">
        <div className="xl:col-span-3">
          <ProfileCard />
        </div>
        <div className="xl:col-span-7">
          <YardActivities />
        </div>
      </div>
    </div>
  )
}

export default FleetOverviewPage

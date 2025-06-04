"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchDepartedFleetDetails } from "../../../services/oparations/YardAPI"
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaIdCard, FaSearch } from "react-icons/fa"

// Hardcoded data for demonstration
const mockFleetData = [
  {
    licenseNumber: "TRK001",
    driver: "John Smith",
    arrivalTime: "2024-03-20T09:00:00",
    departureTime: "2024-03-20T11:30:00",
    purpose: "Loading",
    yard: { dock: "Dock A" },
    yardManager: { email: "john.smith@example.com" },
    productsLink: true,
    status: "In Progress",
  },
  {
    licenseNumber: "TRK002",
    driver: "Sarah Johnson",
    arrivalTime: "2024-03-20T10:15:00",
    departureTime: null,
    purpose: "Unloading",
    yard: { dock: "Dock B" },
    yardManager: { email: "sarah.j@example.com" },
    productsLink: true,
    status: "Pending",
  },
  {
    licenseNumber: "TRK003",
    driver: "Mike Brown",
    arrivalTime: "2024-03-20T08:45:00",
    departureTime: "2024-03-20T10:30:00",
    purpose: "Loading",
    yard: { dock: "Dock C" },
    yardManager: { email: "mike.b@example.com" },
    productsLink: true,
    status: "Completed",
  },
]

const FleetOverviewPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth?.user || null)
  const departedFleets = useSelector((state) => state.departedFleet?.departedFleets || [])

  // Combine API data with mock data for demonstration
  const allFleetData = [...departedFleets, ...mockFleetData]

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchDepartedFleetDetails({ managerId: user._id }))
    }
  }, [dispatch, user])

  const [selectedActivity, setSelectedActivity] = useState("all")

  // Mock data for yard activities
  const yardActivities = [
    {
      licenseNumber: "TRK004",
      driver: "Alex Wilson",
      arrivalTime: "2024-03-20T09:00:00",
      departureTime: "2024-03-20T11:30:00",
      purpose: "Loading",
      yard: { dock: "Dock A" },
      yardManager: { email: "alex.w@example.com" },
      productsLink: true,
      status: "Completed",
      details: "Loaded 25 pallets of electronics",
    },
    {
      licenseNumber: "TRK005",
      driver: "Emma Davis",
      arrivalTime: "2024-03-20T10:15:00",
      departureTime: null,
      purpose: "Unloading",
      yard: { dock: "Dock B" },
      yardManager: { email: "emma.d@example.com" },
      productsLink: true,
      status: "In Progress",
      details: "Unloading 15 containers of furniture",
    },
    {
      licenseNumber: "TRK006",
      driver: "James Miller",
      arrivalTime: "2024-03-20T08:45:00",
      departureTime: "2024-03-20T10:30:00",
      purpose: "Inspection",
      yard: { dock: "Dock C" },
      yardManager: { email: "james.m@example.com" },
      productsLink: true,
      status: "Completed",
      details: "Routine safety inspection completed",
    },
  ]

  // Combine all data
  const allActivities = [...allFleetData, ...yardActivities]

  // Filter activities based on search term and selected activity
  const filteredActivities = allActivities.filter((activity) => {
    const matchesSearch =
      activity.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.yard.dock.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesActivity = selectedActivity === "all" || activity.purpose.toLowerCase() === selectedActivity
    return matchesSearch && matchesActivity
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-richblue-800 shadow-sm border-b border-richblue-200">
        <div className="max-w-full px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Fleet Overview</h1>
              <p className="text-richblue-50 mt-1">Monitor and manage yard activities in real-time</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-blue-700 font-medium">
                  Active Operations: {filteredActivities.filter((a) => a.status === "In Progress").length}
                </span>
              </div>
              <div className="bg-[#32FF32] px-4 py-2 rounded-lg">
                <span className="text-green-700 font-medium">
                  Completed Today: {filteredActivities.filter((a) => a.status === "Completed").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-8">
          {/* Profile Card - Optimized width */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-fit sticky top-8">
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 px-6 py-8">
                <div className="flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
                    <FaUser className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold text-white">John Doe</h2>
                  <p className="text-blue-100 mt-1 text-sm">Warehouse Manager</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
                      <FaEnvelope className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Email</p>
                      <p className="text-gray-900 text-sm font-medium truncate">john.doe@company.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
                      <FaPhone className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Phone</p>
                      <p className="text-gray-900 text-sm font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
                      <FaMapMarkerAlt className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Location</p>
                      <p className="text-gray-900 text-sm font-medium">Main Warehouse, Building A</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
                      <FaBuilding className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Department</p>
                      <p className="text-gray-900 text-sm font-medium">Logistics & Operations</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
                      <FaIdCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Employee ID</p>
                      <p className="text-gray-900 text-sm font-medium">WM-2024-001</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Yard Activities - Expanded width */}
          <div className="xl:col-span-7">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-4 py-6 border-b border-richblue-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Yard Activities</h2>
                    {/* <p className="text-gray-600 mt-1">Real-time monitoring of all yard operations</p> */}
                  </div>

                  <div className="relative pt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search activities, drivers, docks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 w-full lg:w-80 border border-richblue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 mt-1 mx-auto">Real-time monitoring of all yard operations</p>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  {[
                    { key: "all", label: "All Activities", count: allActivities.length },
                    {
                      key: "loading",
                      label: "Loading",
                      count: allActivities.filter((a) => a.purpose.toLowerCase() === "loading").length,
                    },
                    {
                      key: "unloading",
                      label: "Unloading",
                      count: allActivities.filter((a) => a.purpose.toLowerCase() === "unloading").length,
                    },
                    {
                      key: "inspection",
                      label: "Inspection",
                      count: allActivities.filter((a) => a.purpose.toLowerCase() === "inspection").length,
                    },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setSelectedActivity(filter.key)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                        selectedActivity === filter.key
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                      }`}
                    >
                      <span>{filter.label}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          selectedActivity === filter.key ? "bg-white/20 text-white" : "bg-white text-gray-600"
                        }`}
                      >
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-4">
                  {filteredActivities.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">🔍</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                      <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                  ) : (
                    filteredActivities.map((activity, index) => (
                      <div
                        key={`${activity.licenseNumber}-${index}`}
                        className="bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl p-6 hover:shadow-md transition-all duration-200 border border-richblue-100 hover:border-richblue-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div
                              className={`px-4 py-2 rounded-xl font-medium text-sm ${
                                activity.purpose === "Loading"
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : activity.purpose === "Unloading"
                                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                                    : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              }`}
                            >
                              {activity.purpose}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {activity.details || `${activity.purpose} operation`}
                                </h3>
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                  {activity.licenseNumber}
                                </span>
                              </div>
                              <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <span className="flex items-center space-x-1">
                                  <FaMapMarkerAlt className="h-3 w-3" />
                                  <span>{activity.yard.dock}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <FaUser className="h-3 w-3" />
                                  <span>{activity.driver}</span>
                                </span>
                                <span className="text-gray-500">
                                  {new Date(activity.arrivalTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span
                              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                                activity.status === "Completed"
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : activity.status === "In Progress"
                                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                                    : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              }`}
                            >
                              {activity.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FleetOverviewPage

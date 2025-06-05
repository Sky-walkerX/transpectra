// components/YardActivities.js
"use client"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDepartedFleetDetails } from "../../../services/oparations/YardAPI";
import { FaSearch, FaMapMarkerAlt, FaUser } from "react-icons/fa"

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

const YardActivities = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth?.user)
  const departedFleets = useSelector((state) => state.departedFleet?.departedFleets || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedActivity, setSelectedActivity] = useState("all")

  useEffect(() => {
    if (user?._id) dispatch(fetchDepartedFleetDetails({ managerId: user._id }))
  }, [dispatch, user])

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

  const allActivities = [...departedFleets, ...mockFleetData, ...yardActivities]

  const filteredActivities = allActivities.filter((activity) => {
    const matchesSearch =
      activity.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.yard.dock.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesActivity = selectedActivity === "all" || activity.purpose.toLowerCase() === selectedActivity
    return matchesSearch && matchesActivity
  })

  const filters = [
    { key: "all", label: "All Activities" },
    { key: "loading", label: "Loading" },
    { key: "unloading", label: "Unloading" },
    { key: "inspection", label: "Inspection" },
  ]

  return (
    <div className="bg-richblue-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="px-4 py-6 border-b border-richblue-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Fleet Activities</h2>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search activities, drivers, docks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full lg:w-80 border border-richblue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <p className="text-white mt-1">Real-time monitoring of all warehouse operations</p>

        <div className="flex flex-wrap gap-3 mt-6">
          {filters.map((filter) => {
            const count = allActivities.filter(
              (a) => filter.key === "all" || a.purpose.toLowerCase() === filter.key
            ).length
            return (
              <button
                key={filter.key}
                onClick={() => setSelectedActivity(filter.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all ${
                  selectedActivity === filter.key
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-pure-greys-100 hover:bg-gray-200"
                }`}
              >
                <span>{filter.label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-400 text-white">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-8">
        {filteredActivities.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No matching activities found.</div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((activity, idx) => (
              <div
                key={idx}
                className="bg-cardbg rounded-xl p-6 border border-richblue-100 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-lg font-semibold">{activity.details || activity.purpose}</span>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{activity.licenseNumber}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><FaMapMarkerAlt className="h-3 w-3" /> {activity.yard.dock}</span>
                      <span className="flex items-center gap-1"><FaUser className="h-3 w-3" /> {activity.driver}</span>
                      <span>
                        {new Date(activity.arrivalTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <div>
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default YardActivities

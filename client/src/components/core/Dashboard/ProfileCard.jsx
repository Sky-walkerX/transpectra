// components/ProfileCard.js
"use client"

import React from "react"
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaIdCard } from "react-icons/fa"

const ProfileCard = () => {
  return (
    <div className="bg-cardbg rounded-2xl shadow-lg overflow-hidden h-fit sticky top-8">
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

      <div className="p-6 space-y-4">
        {[
          { label: "Email", value: "john.doe@company.com", icon: <FaEnvelope /> },
          { label: "Phone", value: "+1 (555) 123-4567", icon: <FaPhone /> },
          { label: "Location", value: "Main Warehouse, Building A", icon: <FaMapMarkerAlt /> },
          { label: "Department", value: "Logistics & Operations", icon: <FaBuilding /> },
          { label: "Employee ID", value: "WM-2024-001", icon: <FaIdCard /> },
        ].map((item, idx) => (
          <div className="flex items-start space-x-3" key={idx}>
            <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0 text-blue-600">{item.icon}</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">{item.label}</p>
              <p className="text-gray-900 text-sm font-medium truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileCard

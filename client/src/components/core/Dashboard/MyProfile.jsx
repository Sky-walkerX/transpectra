import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartedFleetDetails } from "../../../services/oparations/YardAPI";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaIdCard } from "react-icons/fa";

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
    status: "In Progress"
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
    status: "Pending"
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
    status: "Completed"
  }
];

const FleetOverviewPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user || null);
  const departedFleets = useSelector(
    (state) => state.departedFleet?.departedFleets || []
  );

  // Combine API data with mock data for demonstration
  const allFleetData = [...departedFleets, ...mockFleetData];

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchDepartedFleetDetails({ managerId: user._id }));
    }
  }, [dispatch, user]);

  const [selectedActivity, setSelectedActivity] = useState("all");

  // Mock data for yard activities
  const yardActivities = [
    {
      id: 1,
      type: "loading",
      status: "completed",
      time: "09:00 AM",
      location: "Dock A",
      details: "Loaded 25 pallets of electronics",
    },
    {
      id: 2,
      type: "unloading",
      status: "in-progress",
      time: "10:30 AM",
      location: "Dock B",
      details: "Unloading 15 containers of furniture",
    },
    {
      id: 3,
      type: "inspection",
      status: "scheduled",
      time: "02:00 PM",
      location: "Warehouse C",
      details: "Routine safety inspection",
    },
  ];

  // Filter activities based on search term and selected activity
  const filteredActivities = yardActivities.filter(activity => {
    const matchesSearch = activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActivity = selectedActivity === "all" || activity.type === selectedActivity;
    return matchesSearch && matchesActivity;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
                <div className="flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-white/20 flex items-center justify-center">
                    <FaUser className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-white">John Doe</h2>
                  <p className="text-white/80 mt-1">Warehouse Manager</p>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <FaEnvelope className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">john.doe@company.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <FaPhone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <FaMapMarkerAlt className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">Main Warehouse, Building A</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <FaBuilding className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="text-gray-900">Logistics & Operations</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <FaIdCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Employee ID</p>
                      <p className="text-gray-900">WM-2024-001</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Yard Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Yard Activities</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute left-3 top-2.5">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setSelectedActivity("all")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedActivity === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    All Activities
                  </button>
                  <button
                    onClick={() => setSelectedActivity("loading")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedActivity === "loading"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Loading
                  </button>
                  <button
                    onClick={() => setSelectedActivity("unloading")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedActivity === "unloading"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Unloading
                  </button>
                  <button
                    onClick={() => setSelectedActivity("inspection")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedActivity === "inspection"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Inspection
                  </button>
                </div>
                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${
                            activity.type === "loading"
                              ? "bg-green-100"
                              : activity.type === "unloading"
                              ? "bg-blue-100"
                              : "bg-yellow-100"
                          }`}>
                            <span className={`text-sm font-medium ${
                              activity.type === "loading"
                                ? "text-green-600"
                                : activity.type === "unloading"
                                ? "text-blue-600"
                                : "text-yellow-600"
                            }`}>
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">{activity.details}</p>
                            <p className="text-sm text-gray-500">{activity.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">{activity.time}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            activity.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : activity.status === "in-progress"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}>
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetOverviewPage;
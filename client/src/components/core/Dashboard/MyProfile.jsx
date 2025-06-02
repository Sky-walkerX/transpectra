import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartedFleetDetails } from "../../../services/oparations/YardAPI";
import TruckCard from "./TruckCard";

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

  // Filter fleet data based on search term and status
  const filteredData = allFleetData.filter((truck) => {
    const matchesSearch = truck.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || truck.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="px-8 min-h-screen">
      {/* Heading */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-blue-900">Fleet Overview</h1>
        <p className="text-md text-gray-600">
          Track and manage all yard activities in real time.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search by License Number"
          className="w-full px-4 py-3 border rounded-md shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* Status Filter Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleStatusChange("all")}
            className={`px-4 py-2 rounded-md ${
              selectedStatus === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleStatusChange("Pending")}
            className={`px-4 py-2 rounded-md ${
              selectedStatus === "Pending"
                ? "bg-yellow-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleStatusChange("In Progress")}
            className={`px-4 py-2 rounded-md ${
              selectedStatus === "In Progress"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => handleStatusChange("Completed")}
            className={`px-4 py-2 rounded-md ${
              selectedStatus === "Completed"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Fleet Cards */}
      <div className="space-y-4">
        {filteredData.length ? (
          filteredData.map((truck, index) => (
            <TruckCard
              key={truck.licenseNumber}
              truck={{
                id: truck.licenseNumber,
                driverName: truck.driver,
                arrivalTime: truck.arrivalTime,
                departureTime: truck.departureTime || "N/A",
                status: truck.purpose,
                dock: truck.yard?.dock || "Unknown",
                driverContact: truck.yardManager?.email || "N/A",
                productList: truck.productsLink
                  ? [
                      { id: "P001", name: "Instant Noodles", quantity: 100 },
                      { id: "P002", name: "Stainless Steel Utensils", quantity: 200 },
                    ]
                  : [],
              }}
              isAlternate={index % 2 !== 0}
            />
          ))
        ) : (
          <p className="text-gray-600">No trucks match the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FleetOverviewPage;
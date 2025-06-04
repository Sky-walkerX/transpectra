import React, { useState } from 'react';
import { FaSearch, 
  // FaFilter, FaSort, 
  FaEye, FaTruck, FaBox, FaCheckCircle, FaClock } from "react-icons/fa";

// Mock data for ongoing orders
const ongoingOrders = [
  { id: 'ORD-2001', date: '2024-03-20', supplier: 'TechSupplies Ltd', destination: 'Bharat Logistics, Gurgaon', items: 45, status: 'In Transit', totalValue: '₹1,25,000', priority: 'High' },
  { id: 'ORD-2002', date: '2024-03-19', supplier: 'Digital World', destination: 'Bharat Logistics, Gurgaon', items: 30, status: 'Processing', totalValue: '₹95,000', priority: 'Medium' },
  { id: 'ORD-2003', date: '2024-03-18', supplier: 'Nice FMCG', destination: 'Bharat Logistics, Gurgaon', items: 60, status: 'In Transit', totalValue: '₹1,80,000', priority: 'High' },
  { id: 'ORD-2004', date: '2024-03-17', supplier: 'Hera Ltd', destination: 'Bharat Logistics, Gurgaon', items: 25, status: 'Processing', totalValue: '₹75,000', priority: 'Low' },
];

const pastDeliveries = [
    { id: 'DEL-1001', date: '2024-09-25', supplier: 'Saksham Pvt Ltd', destination: 'Bharat Logistics, Gurgaon', items: 50, status: 'Delivered', totalValue: '₹1,50,000' },
    { id: 'DEL-1002', date: '2024-09-22', supplier: 'Akash Electronics', destination: 'Bharat Logistics, Gurgaon', items: 75, status: 'Delivered', totalValue: '₹2,00,000' },
    { id: 'DEL-1003', date: '2024-09-18', supplier: 'TechSupplies Ltd', destination: 'Bharat Logistics, Gurgaon', items: 100, status: 'Delivered', totalValue: '₹3,25,000' },
    { id: 'DEL-1004', date: '2024-09-15', supplier: 'Digital World', destination: 'Bharat Logistics, Gurgaon', items: 60, status: 'Delivered', totalValue: '₹1,80,000' },
    { id: 'DEL-1005', date: '2024-09-10', supplier: 'TechPoint Inc.', destination: 'Bharat Logistics, Gurgaon', items: 85, status: 'Delivered', totalValue: '₹2,50,000' },
  
    { id: 'DEL-1006', date: '2024-09-28', supplier: 'Nice FMCG', destination: 'Bharat Logistics, Gurgaon', items: 90, status: 'Delivered', totalValue: '₹1,75,000' },
    { id: 'DEL-1007', date: '2024-09-30', supplier: 'Hera Ltd', destination: 'Bharat Logistics, Gurgaon', items: 65, status: 'Delivered', totalValue: '₹1,20,000' },
    { id: 'DEL-1008', date: '2024-09-12', supplier: 'Saksham Pvt Ltd', destination: 'Bharat Logistics, Gurgaon', items: 110, status: 'Delivered', totalValue: '₹3,50,000' },
    { id: 'DEL-1009', date: '2024-09-08', supplier: 'Adhya FMCG', destination: 'Bharat Logistics, Gurgaon', items: 95, status: 'Delivered', totalValue: '₹2,30,000' },
    { id: 'DEL-1010', date: '2024-09-03', supplier: 'Nice FMCG', destination: 'Bharat Logistics, Gurgaon', items: 100, status: 'Delivered', totalValue: '₹2,10,000' },
  
    { id: 'DEL-1011', date: '2024-08-30', supplier: 'Hera Ltd', destination: 'Bharat Logistics, Gurgaon', items: 120, status: 'Delivered', totalValue: '₹3,00,000' },
    { id: 'DEL-1012', date: '2024-08-25', supplier: 'Saksham Pvt Ltd', destination: 'Bharat Logistics, Gurgaon', items: 55, status: 'Delivered', totalValue: '₹1,10,000' },
    { id: 'DEL-1013', date: '2024-08-22', supplier: 'Adhya FMCG', destination: 'Bharat Logistics, Gurgaon', items: 85, status: 'Delivered', totalValue: '₹2,60,000' },
    { id: 'DEL-1014', date: '2024-08-18', supplier: 'Nice FMCG', destination: 'Bharat Logistics, Gurgaon', items: 95, status: 'Delivered', totalValue: '₹2,40,000' },
    { id: 'DEL-1015', date: '2024-08-15', supplier: 'Hera Ltd', destination: 'Bharat Logistics, Gurgaon', items: 105, status: 'Delivered', totalValue: '₹2,75,000' },
  
    { id: 'DEL-1016', date: '2024-08-12', supplier: 'Saksham Pvt Ltd', destination: 'Bharat Logistics, Gurgaon', items: 70, status: 'Delivered', totalValue: '₹1,90,000' },
    { id: 'DEL-1017', date: '2024-08-09', supplier: 'Adhya FMCG', destination: 'Bharat Logistics, Gurgaon', items: 120, status: 'Delivered', totalValue: '₹3,20,000' },
    { id: 'DEL-1018', date: '2024-08-05', supplier: 'Nice FMCG', destination: 'Bharat Logistics, Gurgaon', items: 80, status: 'Delivered', totalValue: '₹2,00,000' },
    { id: 'DEL-1019', date: '2024-08-01', supplier: 'Hera Ltd', destination: 'Bharat Logistics, Gurgaon', items: 90, status: 'Delivered', totalValue: '₹2,50,000' },
    { id: 'DEL-1020', date: '2024-07-28', supplier: 'Saksham Pvt Ltd', destination: 'Bharat Logistics, Gurgaon', items: 110, status: 'Delivered', totalValue: '₹3,75,000' },
  ];
  

const PastDeliveryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [ongoingSearchTerm, setOngoingSearchTerm] = useState("");
  const itemsPerPage = 5;

  // Filter ongoing orders based on search term
  const filteredOngoingOrders = ongoingOrders.filter((order) => 
    order.id.toLowerCase().includes(ongoingSearchTerm.toLowerCase()) ||
    order.supplier.toLowerCase().includes(ongoingSearchTerm.toLowerCase()) ||
    order.destination.toLowerCase().includes(ongoingSearchTerm.toLowerCase())
  );

  // Filter deliveries based on search term
  const filteredDeliveries = pastDeliveries.filter((delivery) => 
    delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);

  // Get deliveries for current page
  const currentDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewDetails = (delivery) => {
    setSelectedDelivery(delivery);
    setShowDetails(true);
  };

  return (
    <div className="p-6 bg-richblue-800 min-h-screen">
      {/* Ongoing Orders Section */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-white mb-2">Ongoing Orders</h1>
        <p className="text-blue-25">Track your current deliveries</p>
        
        {/* Ongoing Orders Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-richblue-900 p-6 rounded-lg shadow-lg border border-richblue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-25">Active Orders</p>
                <p className="text-2xl font-bold text-white">{filteredOngoingOrders.length}</p>
              </div>
              <div className="bg-richblue-700 p-3 rounded-full">
                <FaClock className="text-blue-25 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-richblue-900 p-6 rounded-lg shadow-lg border border-richblue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-25">In Transit</p>
                <p className="text-2xl font-bold text-blue-25">
                  {filteredOngoingOrders.filter(order => order.status === 'In Transit').length}
                </p>
              </div>
              <div className="bg-richblue-700 p-3 rounded-full">
                <FaTruck className="text-blue-25 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-richblue-900 p-6 rounded-lg shadow-lg border border-richblue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-25">Processing</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {filteredOngoingOrders.filter(order => order.status === 'Processing').length}
                </p>
              </div>
              <div className="bg-richblue-700 p-3 rounded-full">
                <FaBox className="text-blue-25 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Ongoing Orders Search */}
        <div className="mt-6 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ongoing orders..."
              value={ongoingSearchTerm}
              onChange={(e) => setOngoingSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-richblue-900 border border-richblue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-400"
            />
            <FaSearch className="absolute left-3 top-3 text-blue-400" />
          </div>
        </div>

        {/* Ongoing Orders Table */}
        <div className="bg-richblue-800 rounded-lg shadow-lg border border-richblue-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-richblue-700">
              <thead className="bg-richblue-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                    Manufacturer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-richblue-600 divide-y divide-blue-700">
                {filteredOngoingOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-richblue-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                      {order.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                      {order.destination}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                      {order.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.priority === 'High' ? 'bg-[#FF2323] text-[#FFCCCC]' :
                        order.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-[#00AA00] text-[#FFF]'
                      }`}>
                        {order.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                      {order.totalValue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                      <button 
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-25 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <FaEye /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Past Deliveries Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Past Deliveries</h1>
        <p className="text-blue-25">View and manage your delivery history</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-richblue-900 p-6 rounded-lg shadow-lg border border-richblue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-25">Total Deliveries</p>
                <p className="text-2xl font-bold text-white">{filteredDeliveries.length}</p>
              </div>
              <div className="bg-richblue-700 p-3 rounded-full">
                <FaBox className="text-blue-25 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-richblue-900 p-6 rounded-lg shadow-lg border border-richblue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-25">Total Items Delivered</p>
                <p className="text-2xl font-bold text-blue-25">
                  {filteredDeliveries.reduce((sum, delivery) => sum + delivery.items, 0)}
                </p>
              </div>
              <div className="bg-richblue-700 p-3 rounded-full">
                <FaTruck className="text-blue-25 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-richblue-900 p-6 rounded-lg shadow-lg border border-richblue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-25">Total Value</p>
                <p className="text-2xl font-bold text-[#00FF00]">
                  ₹{filteredDeliveries.reduce((sum, delivery) => 
                    sum + parseInt(delivery.totalValue.replace(/[^0-9]/g, '')), 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-richblue-700 p-3 rounded-full">
                <FaCheckCircle className="text-blue-25 text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search deliveries by ID, supplier, or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-richblue-900 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-400"
          />
          <FaSearch className="absolute left-3 top-3 text-blue-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-richblue-800 rounded-lg shadow-lg border border-richblue-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-richblue-700">
            <thead className="bg-richblue-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Delivery ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Manufacturer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-richblue-600 divide-y divide-richblue-700">
              {currentDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-richblue-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {delivery.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                    {delivery.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                    {delivery.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                    {delivery.destination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                    {delivery.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#00AA00] text-[#FFF]">
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                    {delivery.totalValue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-25">
                    <button 
                      onClick={() => handleViewDetails(delivery)}
                      className="text-blue-25 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <FaEye /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delivery Details Modal */}
      {showDetails && selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-richblue-800 rounded-lg p-6 max-w-2xl w-full border border-richblue-700">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">Delivery Details</h2>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-blue-25 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-25">Delivery ID</p>
                  <p className="font-medium text-white">{selectedDelivery.id}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-25">Date</p>
                  <p className="font-medium text-white">{selectedDelivery.date}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-25">Manufacturer</p>
                  <p className="font-medium text-white">{selectedDelivery.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-25">Destination</p>
                  <p className="font-medium text-white">{selectedDelivery.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-25">Items</p>
                  <p className="font-medium text-white">{selectedDelivery.items}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-25">Status</p>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#00AA00] text-[#FFF]">
                    {selectedDelivery.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-blue-25">Total Value</p>
                  <p className="font-medium text-white">{selectedDelivery.totalValue}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border border-richblue-700 rounded-lg hover:bg-richblue-700 text-blue-25 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-blue-25">
        <div className="text-sm">
          Showing <span className="font-medium text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
          <span className="font-medium text-white">{Math.min(currentPage * itemsPerPage, filteredDeliveries.length)}</span> of{" "}
          <span className="font-medium text-white">{filteredDeliveries.length}</span> results
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 border border-richblue-700 bg-richblue-900 rounded-lg text-blue-25 hover:text-white transition-colors ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-richblue-300'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border border-richblue-700 bg-richblue-900 rounded-lg text-blue-25 hover:text-white transition-colors ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-richblue-300'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastDeliveryTable;

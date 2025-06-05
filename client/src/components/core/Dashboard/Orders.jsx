import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaPlus, FaBox, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWarehouseOrdersDetails } from '../../../services/oparations/warehouseAPI';
// import img from '../../../assets/Images/invimg.png';
import QRModal from "../../Common/QrModal";
import PastDeliveryTable from './PastDeliveryTable';
// import {apiConnector} from "../../../services/apiConnector";
// import {toast} from "react-hot-toast";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qrModal, setQRModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const warehouse = useSelector((state) => state.warehouse?.warehouse || null);
  const managerId = warehouse?._id;
  const orders = useSelector((state) => state.warehouse?.orders || []);

  useEffect(() => {
    if (managerId) {
      dispatch(fetchWarehouseOrdersDetails({ managerId }));
    }
  }, [dispatch, managerId]);

  // const handleOpenPDF = async (filePath) => {
  //   try {
  //     const response = await apiConnector(
  //       "POST",                        // HTTP method
  //       "http://localhost:4000/api/v1/pdf/generate-signed-url",     // Backend endpoint
  //       { filePath },
  //     );
  
  //     const { url } = response.data;
  //     if (url) {
  //       window.open(url, "_blank", "noopener,noreferrer"); // Open the signed URL
  //     } else {
  //       alert("Failed to fetch the signed URL.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching signed URL:", error);
  //   }
  // };
  
  // const handleTrackDelivery = (orderId) => navigate(`/dashboard/track-delivery`);
  // const handleRemindManufacturer = (orderId) => {
  //   // Logic to remind manufacturer
  //   toast.success("Reminder Sent Successfully for Order!")
  // };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.manufacturerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.uniqueOrderId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-richblue-800">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Orders Management</h1>
          <button
            onClick={() => navigate('/dashboard/create-order')}
            className="flex items-center gap-2 px-4 py-2 bg-richblue-600 text-white rounded-lg hover:bg-richblue-700 transition-colors"
          >
            <FaPlus />
            Create New Order
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Box */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by manufacturer or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-richblue-900 border border-richblue-700 rounded-lg text-white placeholder-blue-25 focus:outline-none focus:ring-2 focus:ring-richblue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-blue-25" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-48 pl-10 pr-4 py-2 bg-richblue-900 border border-richblue-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-richblue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaFilter className="absolute left-3 top-3 text-blue-25" />
          </div>
        </div>

        {/* Orders List */}
        <div className="grid gap-6 mb-8">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-richblue-900 rounded-lg shadow-lg border border-richblue-700 p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">{order.manufacturerName}</h2>
                  <div className="flex items-center gap-2 text-blue-25">
                    <FaBuilding />
                    <span>{order.manufacturerAddress}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-blue-25">
                  <FaBox />
                  <span>Order ID: {order.uniqueOrderId}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-25">
                  <FaCalendarAlt />
                  <span>Order Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-25">
                  <FaCalendarAlt />
                  <span>Delivery Date: {new Date(order.estimatedDeliveryDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="border-t border-richblue-700 pt-4">
                <h3 className="text-lg font-semibold text-white mb-2">Order Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.selectedProducts?.map((item, index) => (
                    <div key={index} className="bg-richblue-800 rounded-lg p-3">
                      <div className="text-white font-medium">{item.name}</div>
                      <div className="text-blue-25">Quantity: {item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-lg font-semibold text-white">
                  Total Value: ₹{order.totalValue || '0'}
                </div>
                <button
                  onClick={() => navigate(`/dashboard/order-details/${order._id}`)}
                  className="px-4 py-2 bg-richblue-600 text-white rounded-lg hover:bg-richblue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Past Deliveries Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Past Deliveries</h2>
          <PastDeliveryTable />
        </div>
      </div>
      {qrModal && <QRModal modalData={qrModal} qrImage={qrModal.qrImage} />}
    </div>
  );
};

export default Orders;

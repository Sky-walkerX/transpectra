import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaWarehouse, FaCalendarAlt, FaBox, FaTruck, FaMapMarkerAlt, FaBuilding, FaUser, FaFileAlt, FaCog, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../../../services/apiConnector';

function SupplierOrders() {
    const navigate = useNavigate();
    const manufacturerId = useSelector((state)=>state.auth).user.LinkedManufacturingUnitID;
    const [searchTerm, setSearchTerm] = useState('');
    const [manufacOrders, setManufacOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    // Hardcoded orders data
    const orders = [
        {
            id: "ORD001",
            warehouseName: "Central Distribution Hub",
            warehouseAddress: "123 Logistics Park, Mumbai",
            warehouseArea: "50,000",
            warehouseImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            orderDate: "2024-03-15",
            expectedDelivery: "2024-03-20",
            status: "pending",
            items: [
                { name: "Electronics", quantity: 500 },
                { name: "Furniture", quantity: 200 }
            ]
        },
        {
            id: "ORD002",
            warehouseName: "North Region Warehouse",
            warehouseAddress: "456 Industrial Zone, Delhi",
            warehouseArea: "35,000",
            warehouseImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            orderDate: "2024-03-14",
            expectedDelivery: "2024-03-19",
            status: "pending",
            items: [
                { name: "Clothing", quantity: 1000 },
                { name: "Footwear", quantity: 800 }
            ]
        },
        {
            id: "ORD003",
            warehouseName: "South Logistics Center",
            warehouseAddress: "789 Business Park, Bangalore",
            warehouseArea: "45,000",
            warehouseImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            orderDate: "2024-03-13",
            expectedDelivery: "2024-03-18",
            status: "pending",
            items: [
                { name: "Food Items", quantity: 1500 },
                { name: "Beverages", quantity: 2000 }
            ]
        }
    ];

    useEffect(() => {
        setFilteredOrders(
            [
                ...manufacOrders,
                ...orders,
            ].filter(order => {
                if (order.warehouseName) {
                    return (order.warehouseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.warehouseAddress.toLowerCase().includes(searchTerm.toLowerCase())) && order.status!=="fulfilled"
                } else {
                    return false
                }
            }
            )
        )
    }, [searchTerm, manufacOrders]);

    useEffect(()=>{
        const fetchManufacOrders = async () => {
            console.log(manufacturerId)
            if(manufacturerId && manufacOrders.length === 0) {
                try {
                    const orders = await apiConnector("GET", "/order/manufacturer/"+manufacturerId);
                    console.log(orders)
                    setManufacOrders(orders.data.orders.map((order)=>{
                        return {
                            _id: order._id,
                            id: "ORD" + order._id.slice(0,3),
                            warehouseName: order.warehouseName,
                            warehouseAddress: order.warehouseAddress,
                            warehouseArea: order?.warehouseArea || "4,000",
                            warehouseImage: order?.warehouseImage || "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                            orderDate: order.orderCreatedDate,
                            expectedDelivery: order.estimatedDeliveryDate,
                            status: order.orderStatus,
                            items: order.selectedProducts.map(({productName, quantity})=>{
                                return {
                                    name: productName,
                                    quantity
                                }
                            })
                        }
                    }));
                    toast.success("Fetched Orders Successfully")
                  } catch (error) {
                    console.error("Error fetching manufacturer orders:", error);
                    toast.error("Failed to fetch manufacturer orders");
                  }
            }
        }

        fetchManufacOrders();
    }, [manufacturerId])

    const fulfillOrder = async (orderId) => {
        try {
            const fulfil = await apiConnector("GET", "/order/complete/"+orderId);
            toast.success("Order Fulfilled Sucessfully");
            console.log(fulfil);
        } catch (error) {
            toast.error("Failed to Fulfill Order");
            console.log("Failed to Fulfill Order", error);
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="flex min-h-screen bg-slate-800">
            

            {/* Main Content */}
            <div className="flex-1 bg-richblue-800">
                {/* Header */}
                <div className="p-8 pb-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-white">Request Orders Received</h1>

                        {/* Search Bar */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by warehouse name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-80 pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="px-8 pb-8 space-y-6">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-cardbg rounded-2xl shadow-lg overflow-hidden">
                            <div className="p-8">
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Warehouse Image */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={order.warehouseImage || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                                            alt={order.warehouseName}
                                            className="w-full md:w-80 h-64 object-cover rounded-xl shadow-md"
                                        />
                                    </div>

                                    {/* Order Details */}
                                    <div className="flex-1">
                                        {/* Warehouse Info */}
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{order.warehouseName}</h3>
                                            <div className="space-y-2 text-gray-600">
                                                <div className="flex items-center">
                                                    <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                                                    <span>{order.warehouseAddress}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <FaBuilding className="w-4 h-4 mr-2" />
                                                    <span>Area: {order.warehouseArea} sq. ft.</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <FaCalendarAlt className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600">Order Date</p>
                                                    <p className="text-lg font-semibold text-gray-900">{formatDate(order.orderDate)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <FaTruck className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600">Expected Delivery</p>
                                                    <p className="text-lg font-semibold text-gray-900">{formatDate(order.expectedDelivery)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="mb-8">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                                        <div className="p-2 bg-blue-100 rounded-lg">
                                                            <FaBox className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{item.name}</p>
                                                            <p className="text-sm text-gray-600">Quantity: {item.quantity.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={()=>fulfillOrder(order?._id)}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                                        >
                                            Fulfill the Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="text-center py-16">
                        <FaBox className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
                        <p className="text-gray-400">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SupplierOrders;
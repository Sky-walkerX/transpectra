import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from "react-redux";
import { FaWarehouse, FaCalendarAlt, FaBox, FaTruck } from 'react-icons/fa';

function SupplierOrders() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filter orders based on search term
    const filteredOrders = orders.filter(order =>
        order.warehouseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-llblue">Request Orders Received</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by warehouse name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <FaWarehouse className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            <div className="grid gap-6">
                {filteredOrders.map((order) => (
                    <div 
                        key={order.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Warehouse Image */}
                                <div className="md:w-1/3">
                                    <img
                                        src={order.warehouseImage}
                                        alt={order.warehouseName}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>

                                {/* Order Details */}
                                <div className="md:w-2/3">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{order.warehouseName}</h3>
                                            <p className="text-gray-600">{order.warehouseAddress}</p>
                                            <p className="text-gray-600">Area: {order.warehouseArea} sq. ft.</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-blue-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Order Date</p>
                                                    <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaTruck className="text-blue-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Expected Delivery</p>
                                                    <p className="font-medium">{new Date(order.expectedDelivery).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <h4 className="font-semibold text-gray-700 mb-2">Order Items</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                                                        <FaBox className="text-blue-500" />
                                                        <div>
                                                            <p className="font-medium">{item.name}</p>
                                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                onClick={() => navigate(`/dashboard/fulfill-order`, { 
                                                    state: { 
                                                        pendingOrders: order,
                                                        warehouseDetails: {
                                                            warehouseName: order.warehouseName,
                                                            warehouseAddress: order.warehouseAddress,
                                                            warehouseArea: order.warehouseArea,
                                                            warehouseImage: order.warehouseImage
                                                        },
                                                        uniqueId: order.id
                                                    } 
                                                })}
                                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                                            >
                                                Fulfill the Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SupplierOrders;

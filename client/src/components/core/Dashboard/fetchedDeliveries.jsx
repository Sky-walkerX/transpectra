import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTruck, FaCalendarAlt, FaMapMarkerAlt, FaBox, FaCheckCircle, FaSpinner, FaTimesCircle } from 'react-icons/fa';

function FetchedDeliveries() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Hardcoded deliveries data
    const deliveries = [
        {
            id: "DEL001",
            orderId: "ORD001",
            warehouseName: "Central Distribution Hub",
            warehouseAddress: "123 Logistics Park, Mumbai",
            items: [
                { name: "Electronics", quantity: 500 },
                { name: "Furniture", quantity: 200 }
            ],
            orderDate: "2024-03-15",
            deliveryDate: "2024-03-20",
            status: "completed",
            totalValue: "₹2,50,000",
            trackingId: "TRK123456",
            route: "Mumbai → Delhi → Kolkata"
        },
        {
            id: "DEL002",
            orderId: "ORD002",
            warehouseName: "North Region Warehouse",
            warehouseAddress: "456 Industrial Zone, Delhi",
            items: [
                { name: "Clothing", quantity: 1000 },
                { name: "Footwear", quantity: 800 }
            ],
            orderDate: "2024-03-14",
            deliveryDate: "2024-03-19",
            status: "in-transit",
            totalValue: "₹1,80,000",
            trackingId: "TRK789012",
            route: "Delhi → Jaipur → Ahmedabad"
        },
        {
            id: "DEL003",
            orderId: "ORD003",
            warehouseName: "South Logistics Center",
            warehouseAddress: "789 Business Park, Bangalore",
            items: [
                { name: "Food Items", quantity: 1500 },
                { name: "Beverages", quantity: 2000 }
            ],
            orderDate: "2024-03-13",
            deliveryDate: "2024-03-18",
            status: "pending",
            totalValue: "₹3,20,000",
            trackingId: "TRK345678",
            route: "Bangalore → Chennai → Hyderabad"
        }
    ];

    // Filter deliveries based on search term and status
    const filteredDeliveries = deliveries.filter(delivery => {
        const matchesSearch = delivery.warehouseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            delivery.trackingId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in-transit':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle className="text-green-500" />;
            case 'in-transit':
                return <FaSpinner className="text-blue-500 animate-spin" />;
            case 'pending':
                return <FaTimesCircle className="text-yellow-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Delivery Orders Overview</h1>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <input
                            type="text"
                            placeholder="Search by warehouse or tracking ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="in-transit">In Transit</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-6">
                {filteredDeliveries.map((delivery) => (
                    <div 
                        key={delivery.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="p-6">
                            <div className="flex flex-col gap-6">
                                {/* Header with Status */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{delivery.warehouseName}</h3>
                                        <p className="text-gray-600">{delivery.warehouseAddress}</p>
                                    </div>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(delivery.status)}`}>
                                        {getStatusIcon(delivery.status)}
                                        <span className="capitalize font-medium">{delivery.status}</span>
                                    </div>
                                </div>

                                {/* Order Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-2">
                                        <FaTruck className="text-blue-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Tracking ID</p>
                                            <p className="font-medium">{delivery.trackingId}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-blue-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Delivery Date</p>
                                            <p className="font-medium">{new Date(delivery.deliveryDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-blue-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Route</p>
                                            <p className="font-medium">{delivery.route}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaBox className="text-blue-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Total Value</p>
                                            <p className="font-medium">{delivery.totalValue}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="mt-2">
                                    <h4 className="font-semibold text-gray-700 mb-3">Order Items</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {delivery.items.map((item, index) => (
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

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        onClick={() => navigate(`/dashboard/track-delivery`, { 
                                            state: { delivery } 
                                        })}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                                    >
                                        Track Delivery
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FetchedDeliveries;

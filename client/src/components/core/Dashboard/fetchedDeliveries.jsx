import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaTruck,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBox,
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle,
  FaChevronDown,
  FaCheck,
} from 'react-icons/fa';

function FetchedDeliveries() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Hardcoded deliveries data
  const deliveries = [
    {
      id: 'DEL001',
      orderId: 'ORD001',
      warehouseName: 'Central Distribution Hub',
      warehouseAddress: '123 Logistics Park, Mumbai',
      items: [
        { name: 'Electronics', quantity: 500 },
        { name: 'Furniture', quantity: 200 },
      ],
      orderDate: '2024-03-15',
      deliveryDate: '2024-03-20',
      status: 'completed',
      totalValue: '₹2,50,000',
      trackingId: 'TRK123456',
      route: 'Mumbai → Delhi → Kolkata',
    },
    {
      id: 'DEL002',
      orderId: 'ORD002',
      warehouseName: 'North Region Warehouse',
      warehouseAddress: '456 Industrial Zone, Delhi',
      items: [
        { name: 'Clothing', quantity: 1000 },
        { name: 'Footwear', quantity: 800 },
      ],
      orderDate: '2024-03-14',
      deliveryDate: '2024-03-19',
      status: 'in-transit',
      totalValue: '₹1,80,000',
      trackingId: 'TRK789012',
      route: 'Delhi → Jaipur → Ahmedabad',
    },
    {
      id: 'DEL003',
      orderId: 'ORD003',
      warehouseName: 'South Logistics Center',
      warehouseAddress: '789 Business Park, Bangalore',
      items: [
        { name: 'Food Items', quantity: 1500 },
        { name: 'Beverages', quantity: 2000 },
      ],
      orderDate: '2024-03-13',
      deliveryDate: '2024-03-18',
      status: 'pending',
      totalValue: '₹3,20,000',
      trackingId: 'TRK345678',
      route: 'Bangalore → Chennai → Hyderabad',
    },
  ];

  // Status options (with small emojis for quick visual context)
  const statusOptions = [
    { value: 'all', label: 'All Status', icon: null },
    { value: 'completed', label: 'Completed', icon: '✅' },
    { value: 'in-transit', label: 'In Transit', icon: '🚚' },
    { value: 'pending', label: 'Pending', icon: '⏳' },
  ];

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter logic
  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.warehouseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const DeliveryDetail = ({ icon, label, value }) => (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );

  // Grab the selected option object for displaying label + icon
  const selectedOption = statusOptions.find((o) => o.value === statusFilter);

  return (
    <div className="px-6 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-richblue-25">Delivery Orders Overview</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search by warehouse or tracking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Custom Dropdown for Status */}
          <div ref={dropdownRef} className="relative w-full md:w-48">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="
                w-full 
                flex justify-between items-center 
                px-4 py-2 
                bg-white border border-gray-300 
                rounded-xl 
                shadow-md hover:shadow-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                transition-shadow duration-200
              "
            >
              <span className="text-gray-800 font-medium flex items-center gap-1">
                {selectedOption.icon && (
                  <span className="text-lg leading-none">{selectedOption.icon}</span>
                )}
                {selectedOption.label}
              </span>
              <FaChevronDown className="text-gray-500" />
            </button>

            {dropdownOpen && (
              <ul
                className="
                  absolute z-10 mt-2 w-full 
                  bg-white border border-gray-300 
                  rounded-xl shadow-lg 
                  max-h-60 overflow-auto 
                  divide-y divide-gray-200
                  focus:outline-none
                "
              >
                {statusOptions.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => {
                      setStatusFilter(opt.value);
                      setDropdownOpen(false);
                    }}
                    className={`
                      px-4 py-2 flex items-center justify-between 
                      cursor-pointer 
                      text-gray-700 
                      transition-colors duration-150
                      hover:bg-blue-100 hover:text-blue-900
                      ${opt.value === statusFilter ? 'bg-blue-50 text-blue-900' : ''}
                    `}
                  >
                    <span className="flex items-center gap-1">
                      {opt.icon && <span className="text-lg leading-none">{opt.icon}</span>}
                      {opt.label}
                    </span>
                    {opt.value === statusFilter && <FaCheck className="text-blue-600" />}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="grid gap-6">
        {filteredDeliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="
              bg-white 
              rounded-xl 
              shadow-md 
              hover:shadow-xl 
              transition-shadow duration-200
            "
          >
            <div className="p-6 space-y-6">
              {/* Top Bar: Warehouse + Status */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {delivery.warehouseName}
                  </h3>
                  <p className="text-gray-600">{delivery.warehouseAddress}</p>
                </div>
                <div
                  className={`
                    flex items-center gap-2 
                    px-3 py-1 
                    rounded-full 
                    ${getStatusColor(delivery.status)}
                  `}
                >
                  {getStatusIcon(delivery.status)}
                  <span className="capitalize font-medium">{delivery.status}</span>
                </div>
              </div>

              {/* Delivery Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <DeliveryDetail
                  icon={<FaTruck className="text-blue-500" />}
                  label="Tracking ID"
                  value={delivery.trackingId}
                />
                <DeliveryDetail
                  icon={<FaCalendarAlt className="text-blue-500" />}
                  label="Delivery Date"
                  value={new Date(delivery.deliveryDate).toLocaleDateString()}
                />
                <DeliveryDetail
                  icon={<FaMapMarkerAlt className="text-blue-500" />}
                  label="Route"
                  value={delivery.route}
                />
                <DeliveryDetail
                  icon={<FaBox className="text-blue-500" />}
                  label="Total Value"
                  value={delivery.totalValue}
                />
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Order Items</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {delivery.items.map((item, index) => (
                    <div
                      key={index}
                      className="
                        flex items-start gap-3 
                        bg-gray-50 
                        px-3 py-2 
                        rounded-lg 
                        hover:bg-gray-100 
                        transition-colors duration-150
                      "
                    >
                      <FaBox className="text-blue-600 mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    navigate(`/dashboard/track-delivery`, { state: { delivery } })
                  }
                  className="
                    px-6 py-2 
                    bg-blue-600 text-white 
                    rounded-lg 
                    hover:bg-blue-700 
                    transition-colors duration-150 
                    font-medium
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                >
                  Track Delivery
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchedDeliveries;

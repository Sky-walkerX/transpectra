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
  FaBoxOpen,
  FaClock,
} from 'react-icons/fa';
import {useSelector} from 'react-redux'
import { apiConnector } from '../../../services/apiConnector';
import toast from 'react-hot-toast';

function FetchedDeliveries() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [manufacOrders, setManufacOrders] = useState([]);
  const manufacturerId = useSelector((state)=>state.auth).user.LinkedManufacturingUnitID;
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const dropdownRef = useRef(null);

  // Hardcoded deliveries data (kept for context, not modified)
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
      status: 'fulfilled',
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

  const statusOptions = [
    { value: 'all', label: 'All Status', icon: <FaBoxOpen /> },
    { value: 'fulfilled', label: 'Completed', icon: <FaCheckCircle /> },
    { value: 'in-transit', label: 'In Transit', icon: <FaTruck /> },
    { value: 'pending', label: 'Pending', icon: <FaClock /> },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // const filteredDeliveries = deliveries.filter((delivery) => {
    
  // });

  useEffect(() => {
    setFilteredDeliveries(
        [
            ...manufacOrders,
            ...deliveries,
        ].filter(delivery => {
            // (order.warehouseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            // order.warehouseAddress.toLowerCase().includes(searchTerm.toLowerCase())) && order.status!=="fulfilled"
            const matchesSearch =
            delivery.warehouseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            delivery.trackingId.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
            return matchesSearch && matchesStatus;
          }
        )
    )
}, [searchTerm, manufacOrders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'fulfilled':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(()=>{
    const fetchManufacOrders = async () => {
        console.log(manufacturerId)
        if(manufacturerId && manufacOrders.length === 0) {
            try {
                const orders = await apiConnector("GET", "/order/manufacturer/"+manufacturerId);
                setManufacOrders(orders.data.orders.map((order)=>{
                    const total = order.selectedProducts.reduce(
                      (acc, p) => acc + p.quantity * 10000, 0
                    );
                    
                    return {
                        id: order._id,
                        orderId: "ORD" + order._id.slice(0,3),
                        warehouseName: order.warehouseName,
                        warehouseAddress: order.warehouseAddress,
                        orderDate: order.orderCreatedDate,
                        deliveryDate: order.actualDeliveryDate || Date.now(),
                        status: order.orderStatus,
                        items: order.selectedProducts.map(({productName, quantity})=>{
                            return {
                                name: productName,
                                quantity
                            }
                        }),
                        route: `${order.manufacturerAddress} → ${order.warehouseAddress}`,
                        trackingId: `TRK${order._id.slice(0,6)}`,
                        totalValue: "₹" + total,
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'fulfilled':
        return <FaCheckCircle className="text-green-500" />;
      case 'in-transit':
        return <FaSpinner className="text-blue-500 animate-spin" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
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

  const selectedOption = statusOptions.find((o) => o.value === statusFilter);

  return (
    <div className="px-6 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Delivery Orders Overview</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search by warehouse or tracking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#66CDAA] transition"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Custom Dropdown for Status - PURE TAILWIND ANIMATION */}
          <div ref={dropdownRef} className="relative w-full md:w-60">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="
                w-full
                flex justify-between items-center
                px-5 py-2.5
                bg-[#F8F8F8] border border-gray-300
                rounded-xl
                shadow-md hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-[#66CDAA] focus:ring-offset-2 focus:ring-offset-[#1A313C]
                transition-all duration-200 ease-in-out
                text-gray-800 font-medium
              "
            >
              <span className="flex items-center gap-2">
                {selectedOption.icon && (
                  <span className="text-lg leading-none text-[#20B2AA]">{selectedOption.icon}</span>
                )}
                {selectedOption.label}
              </span>
              <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown List - Animation with Tailwind utilities */}
            <ul
              className={`
                absolute z-20 mt-2 w-full
                bg-[#F8F8F8] border border-gray-300
                rounded-xl shadow-xl
                max-h-72 overflow-y-auto
                divide-y divide-gray-200
                focus:outline-none
                transition-all duration-200 ease-out
                ${dropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}
              `}
              // We don't need `style={{ transformOrigin: 'top center' }}` as much with `translate-y`
            >
              {statusOptions.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    setStatusFilter(opt.value);
                    setDropdownOpen(false);
                  }}
                  className={`
                    px-5 py-2.5 flex items-center justify-between
                    cursor-pointer
                    text-gray-700
                    transition-colors duration-200 ease-in-out
                    hover:bg-[#E0E0E0] hover:text-gray-900
                    ${opt.value === statusFilter ? 'bg-[#D4EDDA] text-gray-900 font-semibold' : ''}
                    ${opt.value === statusFilter ? 'border-l-4 border-[#20B2AA]' : ''}
                  `}
                >
                  <span className="flex items-center gap-2">
                    {opt.icon && <span className="text-lg leading-none text-[#20B2AA]">{opt.icon}</span>}
                    {opt.label}
                  </span>
                  {opt.value === statusFilter && <FaCheck className="text-[#20B2AA]" />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Deliveries List (not modified, kept for context) */}
      <div className="grid gap-6">
        {filteredDeliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="
              bg-cardbg
              rounded-xl
              shadow-md
              hover:shadow-xl
              transition-shadow duration-200
            "
          >
            <div className="p-6 space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <DeliveryDetail
                  icon={<FaTruck className="text-[#20B2AA]" />}
                  label="Tracking ID"
                  value={delivery.trackingId}
                />
                <DeliveryDetail
                  icon={<FaCalendarAlt className="text-[#20B2AA]" />}
                  label="Delivery Date"
                  value={new Date(delivery.deliveryDate).toLocaleDateString()}
                />
                <DeliveryDetail
                  icon={<FaMapMarkerAlt className="text-[#20B2AA]" />}
                  label="Route"
                  value={delivery.route}
                />
                <DeliveryDetail
                  icon={<FaBox className="text-[#20B2AA]" />}
                  label="Total Value"
                  value={delivery.totalValue}
                />
              </div>

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
                      <FaBox className="text-[#20B2AA] mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() =>
                    navigate(`/dashboard/track-delivery`, { state: { delivery } })
                  }
                  className="
                    px-6 py-2
                    bg-[#20B2AA] text-white
                    rounded-lg
                    hover:bg-[#1A9F96]
                    transition-colors duration-150
                    font-medium
                    focus:outline-none focus:ring-2 focus:ring-[#66CDAA]
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
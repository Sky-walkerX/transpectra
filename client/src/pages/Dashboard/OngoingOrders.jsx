import { 
    useState, 
    // useEffect 
} from "react";
import { FaSearch, 
    // FaFilter, FaSort, 
    FaEye, FaTruck, FaBox, FaCheckCircle 
} from "react-icons/fa";
// import { useSelector } from "react-redux";

// Mock data - Replace with actual API calls
const mockOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2024-03-15",
    status: "In Transit",
    items: 5,
    total: "$1,234.56",
    priority: "High",
    deliveryAddress: "123 Main St, City",
    estimatedDelivery: "2024-03-16",
    trackingNumber: "TRK123456",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2024-03-14",
    status: "Processing",
    items: 3,
    total: "$789.12",
    priority: "Medium",
    deliveryAddress: "456 Oak Ave, Town",
    estimatedDelivery: "2024-03-17",
    trackingNumber: "TRK789012",
  },
  // Add more mock data as needed
];

const statusColors = {
  "In Transit": "bg-richblue-100 text-richblue-800",
  "Processing": "bg-yellow-100 text-yellow-800",
  "Delivered": "bg-green-100 text-green-800",
  "Cancelled": "bg-red-100 text-red-800",
};

const priorityColors = {
  "High": "bg-red-100 text-red-800",
  "Medium": "bg-yellow-100 text-yellow-800",
  "Low": "bg-green-100 text-green-800",
};

export default function OngoingOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || order.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  return (
    <div className="p-6 bg-richblue-900 min-h-screen">
      {/* Header with Stats */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Ongoing Orders</h1>
        <p className="text-richblue-200">Track and manage your current orders</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-richblue-800 p-6 rounded-lg shadow-lg border border-richblue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-richblue-200">Total Orders</p>
                <p className="text-2xl font-bold text-white">{filteredOrders.length}</p>
              </div>
              <div className="bg-richblue-700 p-3 rounded-full">
                <FaBox className="text-richblue-200 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-richblue-800 p-6 rounded-lg shadow-lg border border-richblue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-richblue-200">In Transit</p>
                <p className="text-2xl font-bold text-richblue-200">
                  {filteredOrders.filter(order => order.status === "In Transit").length}
                </p>
              </div>
              <div className="bg-richblue-700 p-3 rounded-full">
                <FaTruck className="text-richblue-200 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-richblue-800 p-6 rounded-lg shadow-lg border border-richblue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-richblue-200">Delivered Today</p>
                <p className="text-2xl font-bold text-green-400">
                  {filteredOrders.filter(order => order.status === "Delivered").length}
                </p>
              </div>
              <div className="bg-richblue-700 p-3 rounded-full">
                <FaCheckCircle className="text-richblue-200 text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders by ID, customer, or tracking number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-richblue-500 text-white placeholder-richblue-400"
            />
            <FaSearch className="absolute left-3 top-3 text-richblue-400" />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-richblue-500 text-white"
          >
            <option value="All">All Status</option>
            <option value="In Transit">In Transit</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-richblue-500 text-white"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-richblue-800 rounded-lg shadow-lg border border-richblue-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-richblue-700">
            <thead className="bg-richblue-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblue-200 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblue-200 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblue-200 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblue-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblue-200 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblue-200 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblue-200 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblue-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-richblue-800 divide-y divide-richblue-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-richblue-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-richblue-200">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-richblue-200">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-richblue-200">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-richblue-200">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColors[order.priority]}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-richblue-200">
                    <button 
                      onClick={() => handleViewDetails(order)}
                      className="text-richblue-200 hover:text-white flex items-center gap-1 transition-colors"
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

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-richblue-800 rounded-lg p-6 max-w-2xl w-full border border-richblue-700">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">Order Details</h2>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-richblue-200 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-richblue-200">Order ID</p>
                  <p className="font-medium text-white">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-richblue-200">Customer</p>
                  <p className="font-medium text-white">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-richblue-200">Status</p>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[selectedOrder.status]}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-richblue-200">Priority</p>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColors[selectedOrder.priority]}`}>
                    {selectedOrder.priority}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-richblue-200">Delivery Address</p>
                  <p className="font-medium text-white">{selectedOrder.deliveryAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-richblue-200">Estimated Delivery</p>
                  <p className="font-medium text-white">{selectedOrder.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm text-richblue-200">Tracking Number</p>
                  <p className="font-medium text-white">{selectedOrder.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-richblue-200">Total Amount</p>
                  <p className="font-medium text-white">{selectedOrder.total}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button 
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border border-richblue-700 rounded-lg hover:bg-richblue-700 text-richblue-200 hover:text-white transition-colors"
              >
                Close
              </button>
              <button 
                className="px-4 py-2 bg-richblue-500 text-white rounded-lg hover:bg-richblue-600 transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-richblue-200">
        <div className="text-sm">
          Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">{filteredOrders.length}</span> of{" "}
          <span className="font-medium text-white">{filteredOrders.length}</span> results
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-richblue-700 rounded-md text-sm hover:bg-richblue-700 text-richblue-200 hover:text-white transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 border border-richblue-700 rounded-md text-sm hover:bg-richblue-700 text-richblue-200 hover:text-white transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiSparkles, HiMagnifyingGlass, HiExclamationTriangle } from "react-icons/hi2";
import { HiFilter, HiChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// Mock data for demonstration
const mockInventoryData = [
  {
    Id: "1",
    productName: "Silicon Wafers",
    productQuantity: 15,
    productThreshold: 20,
    productCategory: "Raw Materials",
    productType: "Substrate",
    month: "December",
  },
  {
    Id: "2",
    productName: "Microcontrollers",
    productQuantity: 45,
    productThreshold: 30,
    productCategory: "Components",
    productType: "IC",
    month: "December",
  },
  {
    Id: "3",
    productName: "Solder Paste",
    productQuantity: 25,
    productThreshold: 20,
    productCategory: "Assembly",
    productType: "Consumable",
    month: "December",
  },
  {
    Id: "4",
    productName: "Photoresist Chemicals",
    productQuantity: 8,
    productThreshold: 15,
    productCategory: "Fabrication",
    productType: "Chemical",
    month: "December",
  },
  {
    Id: "5",
    productName: "Copper Wire",
    productQuantity: 18,
    productThreshold: 25,
    productCategory: "Interconnects",
    productType: "Conductor",
    month: "December",
  },
  {
    Id: "6",
    productName: "Capacitors",
    productQuantity: 120,
    productThreshold: 100,
    productCategory: "Components",
    productType: "Passive",
    month: "December",
  },
  {
    Id: "7",
    productName: "Thermal Paste",
    productQuantity: 22,
    productThreshold: 20,
    productCategory: "Cooling",
    productType: "Material",
    month: "December",
  },
  {
    Id: "8",
    productName: "Resistors",
    productQuantity: 5,
    productThreshold: 30,
    productCategory: "Components",
    productType: "Passive",
    month: "December",
  },
];

// Custom Button Component
const Button = ({ children, onClick, variant = "primary", size = "md", className = "" }) => {
  const baseClasses = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg",
    warning: "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Custom Badge Component
const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    danger: "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Custom Card Component
const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// Custom Alert Component
const Alert = ({ children, variant = "info", className = "" }) => {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    danger: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
  };

  return (
    <div className={`border rounded-lg p-4 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

function Inventory() {
  // const location = useLocation();
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  
  // const Cat = location.state?.category || "";
  // const warehouseData = useSelector((state) => state.warehouse?.warehouse);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch inventory on mount
  useEffect(() => {
    const fetchInventory = async () => {
      setIsLoading(true);
      try {
        // In production, use: const data = await fetchInventoryForWarehouse(token);
        // For demo, using mock data:
        const data = mockInventoryData;
        
        if (data) {
          setInventory(
            data.map((item) => ({
              type: item.productType,
              productName: item.productName,
              quantity: item.productQuantity,
              category: item.productCategory,
              threshold: item.productThreshold,
              month: item.month,
              Id: item.Id,
              stockStatus: getStockStatus(item.productQuantity, item.productThreshold),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInventory();
  }, [token]);

  function getStockStatus(quantity, threshold) {
    if (quantity < threshold) return "Low Stock";
    if (quantity < threshold + 10) return "Limited Stock";
    return "In Stock";
  }

  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  
  const filteredInventory = inventory.filter((item) => {
    return (
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      item.month
    );
  });
  
  const getRestockDetails = () => {
    const restockInfo = {};
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  
    inventory.forEach((item) => {
      if (
        item.month &&
        item.category &&
        item.quantity !== undefined &&
        item.threshold !== undefined &&
        item.month.trim().toLowerCase() === currentMonth.trim().toLowerCase() &&
        item.quantity < item.threshold
      ) {
        if (!restockInfo[item.category]) {
          restockInfo[item.category] = [];
        }
        restockInfo[item.category].push(item);
      }
    });
  
    return restockInfo;
  };
  
  const restockInfo = getRestockDetails();
  
  const handleOrder = (category) => {
    const productsToOrder = restockInfo[category];
    navigate("/dashboard/inventory-select", { 
      state: { category: category, restockProducts: productsToOrder } 
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Low Stock":
        return <Badge variant="danger">{status}</Badge>;
      case "Limited Stock":
        return <Badge variant="warning">{status}</Badge>;
      case "In Stock":
        return <Badge variant="success">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const uniqueCategories = Array.from(new Set(inventory.map((item) => item.category)));
  const lowStockCount = filteredInventory.filter(item => item.stockStatus === "Low Stock").length;
  const totalProducts = filteredInventory.length;

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Restock Alerts */}
      {Object.keys(restockInfo).length > 0 && (
        <div className="space-y-4">
          {Object.keys(restockInfo).map((cat) => (
            <Alert key={cat} variant="danger">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HiExclamationTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <h4 className="font-semibold">Urgent Restock Required</h4>
                    <p className="text-sm">
                      {restockInfo[cat].length} products in the <strong>{cat}</strong> category need restocking
                    </p>
                  </div>
                </div>
                <Button variant="danger" onClick={() => handleOrder(cat)}>
                  <HiSparkles className="h-4 w-4" />
                  Make an Order
                </Button>
              </div>
            </Alert>
          ))}
        </div>
      )}

      {/* Main Inventory Card */}
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">Inventory Management</h1>
              <p className="text-blue-100">
                Real-Time Overview of Inventory in {category === "All" ? "All Categories" : category}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{totalProducts}</div>
              <div className="text-sm text-blue-100">Total Products</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 border-b">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
            <div className="text-sm text-gray-500">Total Products</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{lowStockCount}</div>
            <div className="text-sm text-gray-500">Low Stock Items</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{uniqueCategories.length}</div>
            <div className="text-sm text-gray-500">Categories</div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b bg-white">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <HiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                <option value="All">All Categories</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Threshold
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <HiMagnifyingGlass className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item, index) => (
                  <tr
                    key={item.Id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    onClick={() =>
                      navigate("/dashboard/product-order", {
                        state: {
                          category: item.category,
                          product: item,
                        },
                      })
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{item.productName}</div>
                      <div className="text-sm text-gray-500">{item.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`font-medium ${item.quantity < item.threshold ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">
                      {item.threshold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(item.stockStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {item.category}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default Inventory;
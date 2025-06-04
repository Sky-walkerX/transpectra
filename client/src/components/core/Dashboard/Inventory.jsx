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
    primary: "bg-richblue-600 hover:bg-richblue-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-richblue-800 hover:bg-richblue-700 text-blue-25 border border-richblue-700",
    danger: "bg-[#FF2323] hover:bg-[#FF4444] text-white shadow-md hover:shadow-lg",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg",
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
    default: "bg-richblue-800 text-blue-25",
    success: "bg-[#00AA00] text-white",
    warning: "bg-yellow-500 text-white",
    danger: "bg-[#FF2323] text-white",
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
    <div className={`bg-richblue-900 rounded-lg shadow-lg border border-richblue-700 ${className}`}>
      {children}
    </div>
  );
};

// Custom Alert Component
const Alert = ({ children, variant = "info", className = "" }) => {
  const variants = {
    info: "bg-richblue-800 border-richblue-700 text-blue-25",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
    danger: "bg-[#FF2323]/10 border-[#FF2323]/20 text-[#FF2323]",
    success: "bg-[#00AA00]/10 border-[#00AA00]/20 text-[#00AA00]",
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

  // const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  
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
          <div className="h-8 bg-richblue-800 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-richblue-800 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-richblue-800 rounded"></div>
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
                  <HiExclamationTriangle className="h-5 w-5" />
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
        <div className="bg-gradient-to-r from-richblue-800 to-richblue-900 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">Inventory Management</h1>
              <p className="text-blue-25">
                Real-Time Overview of Inventory in {category === "All" ? "All Categories" : category}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{totalProducts}</div>
              <div className="text-sm text-blue-25">Total Products</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-richblue-800 border-b border-richblue-700">
          <div className="bg-richblue-900 p-4 rounded-lg shadow-sm border border-richblue-700">
            <div className="text-2xl font-bold text-white">{totalProducts}</div>
            <div className="text-sm text-blue-25">Total Products</div>
          </div>
          <div className="bg-richblue-900 p-4 rounded-lg shadow-sm border border-richblue-700">
            <div className="text-2xl font-bold text-[#FF2323]">{lowStockCount}</div>
            <div className="text-sm text-blue-25">Low Stock Items</div>
          </div>
          <div className="bg-richblue-900 p-4 rounded-lg shadow-sm border border-richblue-700">
            <div className="text-2xl font-bold text-richblue-400">{uniqueCategories.length}</div>
            <div className="text-sm text-blue-25">Categories</div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-richblue-700 bg-richblue-900">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-25" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg focus:ring-2 focus:ring-richblue-500 focus:border-transparent text-white placeholder-blue-25"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <HiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-25" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="pl-10 pr-8 py-2 bg-richblue-800 border border-richblue-700 rounded-lg focus:ring-2 focus:ring-richblue-500 focus:border-transparent appearance-none text-white min-w-[200px]"
              >
                <option value="All">All Categories</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-25 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-richblue-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Threshold
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-blue-25 uppercase tracking-wider">
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-richblue-900 divide-y divide-richblue-700">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-blue-25">
                    <div className="flex flex-col items-center">
                      <HiMagnifyingGlass className="h-12 w-12 text-richblue-700 mb-4" />
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item, index) => (
                  <tr
                    key={item.Id}
                    className="hover:bg-richblue-800 cursor-pointer transition-colors duration-150"
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
                      <div className="font-medium text-white">{item.productName}</div>
                      <div className="text-sm text-blue-25">{item.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`font-medium ${item.quantity < item.threshold ? 'text-[#FF2323]' : 'text-white'}`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-white">
                      {item.threshold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(item.stockStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
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
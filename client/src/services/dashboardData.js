// Mock data for dashboard components

// Inventory Data
export const inventoryData = {
  categories: ["Electronics", "Furniture", "Clothing", "Food Items", "Raw Materials", "Packaging"],
  monthlyTrends: {
    "Electronics": [120, 145, 130, 160, 180],
    "Furniture": [85, 90, 95, 100, 110],
    "Clothing": [200, 220, 210, 230, 250],
    "Food Items": [150, 160, 155, 170, 165],
    "Raw Materials": [300, 280, 290, 310, 320],
    "Packaging": [180, 190, 185, 195, 200]
  },
  currentStock: {
    "Electronics": 180,
    "Furniture": 110,
    "Clothing": 250,
    "Food Items": 165,
    "Raw Materials": 320,
    "Packaging": 200
  }
};

// Supplier Performance Data
export const supplierPerformanceData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  suppliers: [
    {
      name: "Tech Supplies Inc",
      onTimeDelivery: [95, 92, 94, 96, 93, 95],
      qualityRating: [4.5, 4.6, 4.4, 4.7, 4.5, 4.6]
    },
    {
      name: "Global Materials Co",
      onTimeDelivery: [88, 90, 89, 91, 90, 92],
      qualityRating: [4.2, 4.3, 4.1, 4.4, 4.3, 4.4]
    },
    {
      name: "Quality Goods Ltd",
      onTimeDelivery: [92, 94, 93, 95, 94, 96],
      qualityRating: [4.4, 4.5, 4.3, 4.6, 4.5, 4.7]
    }
  ]
};

// Delivery Status Data
export const deliveryStatusData = {
  labels: ["Completed", "In Transit", "Pending", "Delayed"],
  data: [45, 25, 20, 10],
  colors: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"]
};

// Fleet Activity Data
export const fleetActivityData = {
  activeTrucks: 15,
  totalDeliveries: 45,
  completedDeliveries: 30,
  pendingDeliveries: 15,
  recentActivities: [
    {
      id: 1,
      truckId: "TRK001",
      status: "In Transit",
      location: "Warehouse A",
      destination: "Store B",
      estimatedArrival: "2024-03-20T15:30:00"
    },
    {
      id: 2,
      truckId: "TRK002",
      status: "Loading",
      location: "Distribution Center",
      destination: "Store C",
      estimatedArrival: "2024-03-20T16:45:00"
    },
    {
      id: 3,
      truckId: "TRK003",
      status: "Completed",
      location: "Store D",
      destination: "Store D",
      estimatedArrival: "2024-03-20T14:15:00"
    }
  ]
};

// Order Statistics
export const orderStatistics = {
  totalOrders: 150,
  pendingOrders: 45,
  completedOrders: 105,
  averageProcessingTime: "2.5 days",
  recentOrders: [
    {
      id: "ORD001",
      customer: "Retail Store A",
      items: 25,
      status: "Processing",
      total: 12500
    },
    {
      id: "ORD002",
      customer: "Retail Store B",
      items: 15,
      status: "Shipped",
      total: 8500
    },
    {
      id: "ORD003",
      customer: "Retail Store C",
      items: 30,
      status: "Delivered",
      total: 15000
    }
  ]
};

// Analytics Data
export const analyticsData = {
  revenue: {
    monthly: [45000, 52000, 48000, 55000, 60000, 58000],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  },
  orders: {
    daily: [25, 30, 28, 32, 35, 33],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  topProducts: [
    { name: "Product A", sales: 1200 },
    { name: "Product B", sales: 950 },
    { name: "Product C", sales: 800 },
    { name: "Product D", sales: 750 },
    { name: "Product E", sales: 600 }
  ]
};

// Export all data
export default {
  inventoryData,
  supplierPerformanceData,
  deliveryStatusData,
  fleetActivityData,
  orderStatistics,
  analyticsData
}; 
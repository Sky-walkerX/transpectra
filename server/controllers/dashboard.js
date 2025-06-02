const Delivery = require("../models/Delivery");
const Warehouse = require("../models/Warehouse");
const ManufacturingUnit = require("../models/ManufacturingUnit");
const Order = require("../models/Order");
const RouteTracking = require("../models/routeTracking");
const AvailabilityStatus = require("../models/AvailabilityStatus");

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let stats = {
      totalDeliveries: 0,
      activeDeliveries: 0,
      completedDeliveries: 0,
      totalOrders: 0,
      pendingOrders: 0,
      totalInventory: 0,
      lowStockItems: 0
    };

    // Get delivery statistics
    const deliveries = await Delivery.find({
      $or: [
        { "manufacturingUnit.manufacturerId": userId },
        { "warehouse.managerId": userId }
      ]
    });

    stats.totalDeliveries = deliveries.length;
    stats.activeDeliveries = deliveries.filter(d => d.status === "in-progress").length;
    stats.completedDeliveries = deliveries.filter(d => d.status === "completed").length;

    // Get order statistics
    const orders = await Order.find({
      $or: [
        { manufacturerId: userId },
        { warehouseId: userId }
      ]
    });

    stats.totalOrders = orders.length;
    stats.pendingOrders = orders.filter(o => o.status === "pending").length;

    // Get inventory statistics
    const warehouse = await Warehouse.findOne({ managerId: userId });
    if (warehouse) {
      const inventory = await warehouse.populate("inventory");
      stats.totalInventory = inventory.inventory.length;
      stats.lowStockItems = inventory.inventory.filter(item => item.quantity < item.minimumQuantity).length;
    }

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message
    });
  }
};

// Get recent deliveries
exports.getRecentDeliveries = async (req, res) => {
  try {
    const userId = req.user.id;
    const recentDeliveries = await Delivery.find({
      $or: [
        { "manufacturingUnit.manufacturerId": userId },
        { "warehouse.managerId": userId }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("manufacturingUnit")
    .populate("warehouse");

    res.status(200).json({
      success: true,
      data: recentDeliveries
    });
  } catch (error) {
    console.error("Error in getRecentDeliveries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recent deliveries",
      error: error.message
    });
  }
};

// Get warehouse performance metrics
exports.getWarehousePerformance = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const warehouse = await Warehouse.findById(warehouseId);

    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found"
      });
    }

    // Get delivery statistics for the warehouse
    const deliveries = await Delivery.find({ "warehouse._id": warehouseId });
    const totalDeliveries = deliveries.length;
    const completedDeliveries = deliveries.filter(d => d.status === "completed").length;
    const onTimeDeliveries = deliveries.filter(d => {
      if (d.status === "completed") {
        const actualTime = new Date(d.completedAt);
        const expectedTime = new Date(d.estimatedDeliveryTime);
        return actualTime <= expectedTime;
      }
      return false;
    }).length;

    // Calculate performance metrics
    const performance = {
      completionRate: totalDeliveries > 0 ? (completedDeliveries / totalDeliveries) * 100 : 0,
      onTimeDeliveryRate: completedDeliveries > 0 ? (onTimeDeliveries / completedDeliveries) * 100 : 0,
      averageProcessingTime: 0, // Calculate based on your business logic
      inventoryAccuracy: 0 // Calculate based on your business logic
    };

    res.status(200).json({
      success: true,
      data: performance
    });
  } catch (error) {
    console.error("Error in getWarehousePerformance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch warehouse performance",
      error: error.message
    });
  }
};

// Get fleet status
exports.getFleetStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const fleetStatus = await AvailabilityStatus.find({
      $or: [
        { "manufacturingUnit.manufacturerId": userId },
        { "warehouse.managerId": userId }
      ]
    }).populate("vehicle");

    const status = {
      totalVehicles: fleetStatus.length,
      availableVehicles: fleetStatus.filter(f => f.status === "available").length,
      inTransitVehicles: fleetStatus.filter(f => f.status === "in-transit").length,
      maintenanceVehicles: fleetStatus.filter(f => f.status === "maintenance").length
    };

    res.status(200).json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error("Error in getFleetStatus:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch fleet status",
      error: error.message
    });
  }
};

// Get inventory alerts
exports.getInventoryAlerts = async (req, res) => {
  try {
    const userId = req.user.id;
    const warehouse = await Warehouse.findOne({ managerId: userId });

    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found"
      });
    }

    const inventory = await warehouse.populate("inventory");
    const alerts = inventory.inventory
      .filter(item => item.quantity < item.minimumQuantity)
      .map(item => ({
        itemName: item.name,
        currentQuantity: item.quantity,
        minimumQuantity: item.minimumQuantity,
        alertType: "low-stock"
      }));

    res.status(200).json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error("Error in getInventoryAlerts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory alerts",
      error: error.message
    });
  }
}; 
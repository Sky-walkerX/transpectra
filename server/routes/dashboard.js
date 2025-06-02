const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getDashboardStats,
  getRecentDeliveries,
  getWarehousePerformance,
  getFleetStatus,
  getInventoryAlerts
} = require("../controllers/dashboard");

// Dashboard routes
router.get("/stats", auth, getDashboardStats);
router.get("/recent-deliveries", auth, getRecentDeliveries);
router.get("/warehouse-performance/:warehouseId", auth, getWarehousePerformance);
router.get("/fleet-status", auth, getFleetStatus);
router.get("/inventory-alerts", auth, getInventoryAlerts);

module.exports = router; 
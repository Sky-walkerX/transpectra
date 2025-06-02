import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import { toast } from "react-hot-toast";

// Get dashboard statistics
export const getDashboardStats = async () => {
  const toastId = toast.loading("Loading dashboard statistics...");
  try {
    const response = await apiConnector("GET", endpoints.DASHBOARD_STATS_API);
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Dashboard statistics loaded successfully");
    return response.data;
  } catch (error) {
    console.log("GET_DASHBOARD_STATS_API API ERROR............", error);
    toast.error("Failed to load dashboard statistics");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// Get recent deliveries
export const getRecentDeliveries = async () => {
  const toastId = toast.loading("Loading recent deliveries...");
  try {
    const response = await apiConnector("GET", endpoints.RECENT_DELIVERIES_API);
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Recent deliveries loaded successfully");
    return response.data;
  } catch (error) {
    console.log("GET_RECENT_DELIVERIES_API API ERROR............", error);
    toast.error("Failed to load recent deliveries");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// Get warehouse performance metrics
export const getWarehousePerformance = async (warehouseId) => {
  const toastId = toast.loading("Loading warehouse performance...");
  try {
    const response = await apiConnector("GET", `${endpoints.WAREHOUSE_PERFORMANCE_API}/${warehouseId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Warehouse performance loaded successfully");
    return response.data;
  } catch (error) {
    console.log("GET_WAREHOUSE_PERFORMANCE_API API ERROR............", error);
    toast.error("Failed to load warehouse performance");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// Get fleet status
export const getFleetStatus = async () => {
  const toastId = toast.loading("Loading fleet status...");
  try {
    const response = await apiConnector("GET", endpoints.FLEET_STATUS_API);
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Fleet status loaded successfully");
    return response.data;
  } catch (error) {
    console.log("GET_FLEET_STATUS_API API ERROR............", error);
    toast.error("Failed to load fleet status");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// Get inventory alerts
export const getInventoryAlerts = async () => {
  const toastId = toast.loading("Loading inventory alerts...");
  try {
    const response = await apiConnector("GET", endpoints.INVENTORY_ALERTS_API);
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Inventory alerts loaded successfully");
    return response.data;
  } catch (error) {
    console.log("GET_INVENTORY_ALERTS_API API ERROR............", error);
    toast.error("Failed to load inventory alerts");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
}; 
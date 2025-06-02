import { TbTruckDelivery } from "react-icons/tb";
import InventoryBarChart from "./Charts/InventoryBarChart";
import RestockTable from "./Tables/RestockTable";
import DeliveryDonutChart from "./Charts/DeliveryDonutChart";
import InventoryLineChart from "./Charts/InventoryLineChart";
import { RiCoinsFill } from "react-icons/ri";
import SupplierPerfromanceChart from "./Charts/SupplierPerfromanceChart";
import RecentDeliveriesTable from "./Tables/RecentDeliveriesTable";
import { restockAlertData, inventoryData } from "../../../data/dashboardData";
import { useSelector } from "react-redux";

function ManagerInsights() {
  const warehouseData = useSelector((state) => state.warehouse?.warehouse); 
  const { categories, current, past } = getMonthlyInventoryData(warehouseData);
  const { categories2, trendData } = getCategoryTrendData(warehouseData);
  const restockAlerts = getTopRestockAlerts(warehouseData);

  return (
    <div className="flex flex-col gap-y-6 items-center p-6">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col gap-y-6">
          {/* Stats Cards Section */}
          <div className="flex flex-row gap-x-6 w-full">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-1/3 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="flex flex-row items-start justify-between gap-x-3">
                <div className="flex flex-col justify-center gap-y-2">
                  <p className="text-white font-medium opacity-90 text-lg">Load/Unload Time</p>
                  <h3 className="text-white font-bold text-2xl">85%</h3>
                  <p className="text-white/80 text-sm">+5% from last month</p>
                </div>  
                <div className="bg-white/20 p-3 rounded-lg">
                  <TbTruckDelivery className="text-white w-[32px] h-[32px]"/>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-1/3 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="flex flex-row items-start justify-between gap-x-3">
                <div className="flex flex-col justify-center gap-y-2">
                  <p className="text-white font-medium opacity-90 text-lg">Cost Optimization</p>
                  <h3 className="text-white font-bold text-2xl">21%</h3>
                  <p className="text-white/80 text-sm">+3% from last month</p>
                </div>  
                <div className="bg-white/20 p-3 rounded-lg">
                  <RiCoinsFill className="text-white w-[32px] h-[32px]"/>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-1/3 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="flex flex-row items-start justify-between gap-x-3">
                <div className="flex flex-col justify-center gap-y-2">
                  <p className="text-white font-medium opacity-90 text-lg">On-Time Deliveries</p>
                  <h3 className="text-white font-bold text-2xl">95%</h3>
                  <p className="text-white/80 text-sm">+2% from last month</p>
                </div>  
                <div className="bg-white/20 p-3 rounded-lg">
                  <TbTruckDelivery className="text-white w-[32px] h-[32px]"/>
                </div>
              </div>
            </div>
          </div>

          {/* Top Section */}
          <div className="flex flex-row gap-x-6 justify-between items-start">
            <div className="flex flex-col w-8/12 h-full gap-y-1 items-center justify-between bg-white rounded-xl p-6 shadow-lg">
              <InventoryBarChart categories={categories} currentData={current} pastData={past} />
            </div>
            <div className="w-4/12">
              <RestockTable restockAlerts={restockAlerts}/>
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex flex-row gap-x-6 w-full">
            <div className="flex flex-col w-1/2 gap-y-1 items-center justify-between bg-white rounded-xl p-6 shadow-lg">
              <InventoryLineChart categories2={categories2} trendData={trendData} />
            </div>
            <div className="flex flex-col w-1/2 gap-y-1 items-center justify-between bg-white rounded-xl p-6 shadow-lg">
              <DeliveryDonutChart/>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-row gap-x-6 justify-between items-start">
            <div className="w-3/5">
              <RecentDeliveriesTable/>
            </div>
            <div className="flex flex-col w-2/5 gap-y-1 items-center justify-between bg-white rounded-xl p-6 shadow-lg">
              <SupplierPerfromanceChart/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMonthlyInventoryData(warehouseData) {
  // Use mock data if warehouse data is not available
  if (!warehouseData?.inventory) {
    return {
      categories: ['Electronics', 'Furniture', 'Clothing', 'Food', 'Books'],
      current: [450, 320, 580, 890, 210],
      past: [380, 290, 520, 820, 180]
    };
  }

  // Use warehouse data if available
  const currentMonthData = {};
  const pastMonthData = {};

  warehouseData.inventory.forEach((item) => {
    const { productCategory, productQuantity, month } = item;

    // Initialize categories if they don't exist
    if (!currentMonthData[productCategory]) {
      currentMonthData[productCategory] = 0;
      pastMonthData[productCategory] = 0;
    }

    // Aggregate quantities based on month
    if (month === "November") {
      currentMonthData[productCategory] += productQuantity;
    } else {
      pastMonthData[productCategory] += productQuantity;
    }
  });

  // Extract categories dynamically
  const categories = Object.keys(currentMonthData);
  return {
    categories,
    current: categories.map((category) => currentMonthData[category]),
    past: categories.map((category) => pastMonthData[category]),
  };
}

function getTopRestockAlerts(warehouseData) {
  // Use mock data if warehouse data is not available
  if (!warehouseData?.inventory) {
    return restockAlertData.urgentAlerts.map(alert => ({
      productName: alert.productName,
      currentStock: alert.currentStock,
      reorderThreshold: alert.minimumThreshold,
      productCategory: alert.category
    }));
  }

  // Use warehouse data if available
  const restockAlerts = [];
  warehouseData.inventory.forEach((item) => {
    const { productName, productQuantity, productThreshold, productCategory } = item;
    const restockDifference = productThreshold - productQuantity;

    if (restockDifference > 0) {
      restockAlerts.push({
        productName,
        currentStock: productQuantity,
        reorderThreshold: productThreshold,
        productCategory,
        restockDifference,
      });
    }
  });

  // Sort by restock urgency (difference) and return the top 5
  restockAlerts.sort((a, b) => b.restockDifference - a.restockDifference);
  return restockAlerts.slice(0, 4);
}

function getCategoryTrendData(warehouseData) {
  // Use mock data if warehouse data is not available
  if (!warehouseData?.inventory) {
    return {
      categories2: inventoryData.categories,
      trendData: inventoryData.monthlyTrends
    };
  }

  // Use warehouse data if available
  const categories2 = Array.from(
    new Set(warehouseData.inventory.map((item) => item.productCategory))
  );

  // Standardized months for labels
  const monthsOrder = ["July", "Aug", "Sept", "Oct", "Nov"];

  // Aggregate monthly stock data for each category
  const trendData = categories2.reduce((acc, category) => {
    // Initialize monthly stock for this category
    const monthlyStock = {
      July: 0,
      Aug: 0,
      Sept: 0,
      Oct: 0,
      Nov: 0,
    };

    // Filter inventory for the current category and aggregate monthly data
    warehouseData.inventory
      .filter((item) => item.productCategory === category)
      .forEach((item) => {
        const monthName = item.month.substring(0, 3); // Extract the first 3 letters to match the chart labels

        if (monthlyStock[monthName] !== undefined) {
          monthlyStock[monthName] += item.productQuantity;
        }
      });

    // Store stock levels in order for Chart.js
    acc[category] = monthsOrder.map((month) => monthlyStock[month] || 0);
    return acc;
  }, {});

  return { categories2, trendData };
}

export default ManagerInsights;
import { TbTruckDelivery } from "react-icons/tb";
import InventoryBarChart from "./Charts/InventoryBarChart";
import RestockTable from "./Tables/RestockTable";
import DeliveryDonutChart from "./Charts/DeliveryDonutChart";
import InventoryLineChart from "./Charts/InventoryLineChart";
import { RiCoinsFill } from "react-icons/ri";
import SupplierPerformanceChart from "./Charts/SupplierPerfromanceChart";
import RecentDeliveriesTable from "./Tables/RecentDeliveriesTable";
import { restockAlertData, inventoryData } from "../../../data/dashboardData";
import { useSelector } from "react-redux";

function ManagerInsights() {
  const warehouseData = useSelector((state) => state.warehouse?.warehouse);
  const { categories, current, past } = getMonthlyInventoryData(warehouseData);
  const { categories2, trendData } = getCategoryTrendData(warehouseData);
  const restockAlerts = getTopRestockAlerts(warehouseData);

  return (
    // Main container for the entire page, setting a dark background and reducing overall padding
    <div className="flex flex-col gap-4 items-center p-4 bg-richblue-800 min-h-screen text-slate-100">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col gap-4"> {/* Reduced gap-y from gap-6 to gap-4 */}
          {/* Stats Cards Section */}
          {/* Adjusted gap-x and responsiveness for tighter fit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="flex items-start justify-between gap-x-2"> {/* Reduced gap-x */}
                <div className="flex flex-col justify-center gap-y-1"> {/* Reduced gap-y */}
                  <p className="text-white font-medium opacity-90 text-base md:text-lg">Load/Unload Time</p> {/* Adjusted font size */}
                  <h3 className="text-white font-bold text-xl md:text-2xl">85%</h3> {/* Adjusted font size */}
                  <p className="text-white/80 text-xs md:text-sm">+5% from last month</p> {/* Adjusted font size */}
                </div>
                <div className="bg-white/20 p-2 rounded-lg"> {/* Reduced padding */}
                  <TbTruckDelivery className="text-white w-6 h-6 md:w-8 md:h-8"/> {/* Adjusted icon size */}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="flex items-start justify-between gap-x-2">
                <div className="flex flex-col justify-center gap-y-1">
                  <p className="text-white font-medium opacity-90 text-base md:text-lg">Cost Optimization</p>
                  <h3 className="text-white font-bold text-xl md:text-2xl">21%</h3>
                  <p className="text-white/80 text-xs md:text-sm">+3% from last month</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <RiCoinsFill className="text-white w-6 h-6 md:w-8 md:h-8"/>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="flex items-start justify-between gap-x-2">
                <div className="flex flex-col justify-center gap-y-1">
                  <p className="text-white font-medium opacity-90 text-base md:text-lg">On-Time Deliveries</p>
                  <h3 className="text-white font-bold text-xl md:text-2xl">95%</h3>
                  <p className="text-white/80 text-xs md:text-sm">+2% from last month</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <TbTruckDelivery className="text-white w-6 h-6 md:w-8 md:h-8"/>
                </div>
              </div>
            </div>
          </div>

          {/* Top Section */}
          {/* Adjusted gap-x and ensured components fill space */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch w-full"> {/* Changed gap-x to gap-4, added items-stretch */}
            <div className="flex flex-col w-full lg:w-8/12 bg-slate-800 rounded-xl p-4 shadow-lg"> {/* Reduced padding */}
              <InventoryBarChart categories={categories} currentData={current} pastData={past} />
            </div>
            <div className="w-full lg:w-4/12">
              <RestockTable restockAlerts={restockAlerts}/>
            </div>
          </div>

          {/* Middle Section */}
          {/* Adjusted gap-x */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="flex flex-col w-full lg:w-1/2 bg-slate-800 rounded-xl p-4 shadow-lg"> {/* Reduced padding */}
              <InventoryLineChart categories2={categories2} trendData={trendData} />
            </div>
            <div className="flex flex-col w-full lg:w-1/2 bg-slate-800 rounded-xl p-4 shadow-lg"> {/* Reduced padding */}
              <DeliveryDonutChart/>
            </div>
          </div>

          {/* Bottom Section */}
          {/* Adjusted gap-x */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch w-full"> {/* Changed gap-x to gap-4, added items-stretch */}
            <div className="w-full lg:w-3/5">
              <RecentDeliveriesTable/>
            </div>
            <div className="flex flex-col w-full lg:w-2/5 bg-slate-800 rounded-xl p-4 shadow-lg"> {/* Reduced padding */}
              <SupplierPerformanceChart/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Data fetching/transformation functions (remain unchanged)
function getMonthlyInventoryData(warehouseData) {
  if (!warehouseData?.inventory) {
    return {
      categories: ['Electronics', 'Furniture', 'Clothing', 'Food', 'Books'],
      current: [450, 320, 580, 890, 210],
      past: [380, 290, 520, 820, 180]
    };
  }

  const currentMonthData = {};
  const pastMonthData = {};

  warehouseData.inventory.forEach((item) => {
    const { productCategory, productQuantity, month } = item;
    if (!currentMonthData[productCategory]) {
      currentMonthData[productCategory] = 0;
      pastMonthData[productCategory] = 0;
    }
    if (month === "November") {
      currentMonthData[productCategory] += productQuantity;
    } else {
      pastMonthData[productCategory] += productQuantity;
    }
  });

  const categories = Object.keys(currentMonthData);
  return {
    categories,
    current: categories.map((category) => currentMonthData[category]),
    past: categories.map((category) => pastMonthData[category]),
  };
}

function getTopRestockAlerts(warehouseData) {
  if (!warehouseData?.inventory) {
    return restockAlertData.urgentAlerts.map(alert => ({
      productName: alert.productName,
      currentStock: alert.currentStock,
      reorderThreshold: alert.minimumThreshold,
      productCategory: alert.category
    }));
  }

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

  restockAlerts.sort((a, b) => b.restockDifference - a.restockDifference);
  return restockAlerts.slice(0, 4);
}

function getCategoryTrendData(warehouseData) {
  if (!warehouseData?.inventory) {
    return {
      categories2: inventoryData.categories,
      trendData: inventoryData.monthlyTrends
    };
  }

  const categories2 = Array.from(
    new Set(warehouseData.inventory.map((item) => item.productCategory))
  );

  const monthsOrder = ["July", "Aug", "Sept", "Oct", "Nov"];

  const trendData = categories2.reduce((acc, category) => {
    const monthlyStock = {
      July: 0,
      Aug: 0,
      Sept: 0,
      Oct: 0,
      Nov: 0,
    };

    warehouseData.inventory
      .filter((item) => item.productCategory === category)
      .forEach((item) => {
        const monthName = item.month.substring(0, 3);
        if (monthlyStock[monthName] !== undefined) {
          monthlyStock[monthName] += item.productQuantity;
        }
      });

    acc[category] = monthsOrder.map((month) => monthlyStock[month] || 0);
    return acc;
  }, {});

  return { categories2, trendData };
}

export default ManagerInsights;
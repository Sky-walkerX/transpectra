import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { inventoryData } from "../../../../data/dashboardData";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function InventoryLineChart({
  categories2 = inventoryData.categories,
  trendData = inventoryData.monthlyTrends,
}) {
  const [selectedCategory, setSelectedCategory] = useState(categories2[0] || "");

  useEffect(() => {
    if (categories2.length > 0) {
      setSelectedCategory(categories2[0]);
    }
  }, [categories2]);

  // Fixed colors for dark mode
  const textColor = "#E2E8F0"; // slate-200
  const gridColor = "rgba(255,255,255,0.1)"; // Semi-transparent white for grid

  const chartData = useMemo(() => ({
    labels: ["July", "Aug", "Sept", "Oct", "Nov"],
    datasets: [
      {
        label: `${selectedCategory} Monthly Stock`,
        data: trendData[selectedCategory] || Array(5).fill(0),
        borderColor: "#60A5FA", // A slightly softer blue (blue-400) for better contrast in dark mode
        backgroundColor: "rgba(96, 165, 250, 0.15)", // Lighter transparent blue for fill
        fill: true,
        tension: 0.4,
        pointBorderColor: "#3B82F6", // blue-500
        pointBackgroundColor: "#1E293B", // slate-800, matching card background
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }), [selectedCategory, trendData]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937", // dark slate background
        titleColor: "#93C5FD", // light blue for title
        bodyColor: "#E2E8F0", // light text for body
        borderColor: "#60A5FA", // border color
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context) => `${selectedCategory}: ${context.raw} units`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          font: { size: 12, weight: "500" },
        },
        grid: { display: false },
      },
      y: {
        title: {
          display: true,
          text: "Stock Levels (Units)",
          color: textColor,
          font: { size: 14, weight: "600" },
        },
        ticks: {
          color: textColor,
          font: { size: 12, weight: "500" },
          beginAtZero: true,
        },
        grid: {
          color: gridColor,
          borderDash: [5, 5],
        },
        min: 0,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
        borderCapStyle: "round",
        borderJoinStyle: "round",
      },
    },
  }), [selectedCategory, textColor, gridColor]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="w-full bg-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold text-pure-greys-25"> {/* Adjusted text color */}
          Monthly Stock Levels by Category
        </h2>
        <div className="flex items-center gap-x-3">
          <label className="text-sm font-medium text-pure-greys-25"> {/* Adjusted text color */}
            Select Category:
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-600 rounded-lg px-4 py-2 text-sm text-white bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {categories2.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default InventoryLineChart;
import React, { useState, useEffect } from "react";
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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function InventoryLineChart({ categories2 = inventoryData.categories, trendData = inventoryData.monthlyTrends }) {
  const [selectedCategory, setSelectedCategory] = useState(categories2[0] || "");

  useEffect(() => {
    if (categories2.length > 0) {
      setSelectedCategory(categories2[0]);
    }
  }, [categories2]);

  // Add console.log for debugging
  console.log('Line Chart Data:', { categories2, trendData, selectedCategory });

  const chartData = {
    labels: ["July", "Aug", "Sept", "Oct", "Nov"],
    datasets: [
      {
        label: `${selectedCategory} Monthly Stock Levels`,
        data: trendData[selectedCategory] || Array(5).fill(0),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBorderColor: "#1e40af",
        pointBackgroundColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: false 
      },
      tooltip: { 
        enabled: true,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1e40af",
        bodyColor: "#1e40af",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: function(context) {
            return `${selectedCategory}: ${context.raw} units`;
          }
        }
      },
    },
    scales: {
      x: {
        ticks: { 
          color: "#4b5563",
          font: {
            size: 12,
            weight: "500"
          }
        },
        grid: { 
          display: false 
        },
      },
      y: {
        title: {
          display: true,
          text: "Stock Levels (Units)",
          color: "#4b5563",
          font: { 
            size: 14, 
            weight: "600" 
          },
        },
        ticks: { 
          color: "#4b5563",
          font: {
            size: 12,
            weight: "500"
          },
          beginAtZero: true 
        },
        grid: { 
          borderDash: [5, 5], 
          color: "rgba(0, 0, 0, 0.1)" 
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
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Monthly Stock Levels by Category
        </h2>
        <div className="flex items-center gap-x-3">
          <label className="text-sm font-medium text-gray-600">
            Select Category:
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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

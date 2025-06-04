import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function InventoryBarChart({
  categories = [],
  currentData = [],
  pastData = [],
  title = "Inventory Comparison: Current vs. Past Month",
}) {
  // Fixed colors for dark mode
  const textColor = "#E2E8F0"; // slate-200
  const gridColor = "rgba(255, 255, 255, 0.1)"; // semi-transparent white
  const tooltipBg = "#2D3748"; // dark slate for tooltip background
  const tooltipBorder = "#66CDAA"; // green accent for tooltip border

  const data = useMemo(() => ({
    labels: categories,
    datasets: [
      {
        label: "Current Month",
        data: currentData,
        backgroundColor: "#20B2AA", // LightSeaGreen (can be adjusted if needed for more contrast)
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
      {
        label: "Past Month",
        data: pastData,
        backgroundColor: "#66CDAA", // MediumAquamarine (can be adjusted)
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    ],
  }), [categories, currentData, pastData]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: {
            size: 13,
            weight: '600',
          },
        },
      },
      title: {
        display: !!title,
        text: title,
        color: "#F7FAFC", // white text for title in dark mode
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: tooltipBorder,
        borderWidth: 1,
        cornerRadius: 4,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.toLocaleString()} units`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          font: {
            size: 12,
            weight: '500',
          },
        },
        barThickness: 'flex',
        maxBarThickness: 50,
      },
      y: {
        title: {
          display: true,
          text: "Units in Inventory",
          color: textColor,
          font: {
            size: 14,
            weight: "600",
          },
        },
        ticks: {
          color: textColor,
          callback: function (value) {
            return value.toLocaleString();
          },
        },
        grid: {
          color: gridColor,
          borderDash: [3, 3],
          drawBorder: false,
        },
      },
    },
  }), [textColor, gridColor, tooltipBg, tooltipBorder, title]);

  if (!categories.length) {
    return (
      <div className="flex justify-center items-center h-[400px] text-gray-400 text-sm bg-slate-800 rounded-2xl p-6 shadow-lg"> {/* Added dark mode classes */}
        No data available.
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] bg-slate-800 rounded-2xl p-6 shadow-lg"> {/* Direct dark mode background */}
      <Bar data={data} options={options} />
    </div>
  );
}

export default InventoryBarChart;
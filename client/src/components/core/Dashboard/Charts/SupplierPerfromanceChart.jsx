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

function SupplierPerformanceChart() {
  // Fixed colors for dark mode
  const textColor = "#E2E8F0"; // slate-200
  const gridColor = "rgba(255,255,255,0.08)"; // semi-transparent white
  const bgColorOnTime = "#93c5fd"; // blue-300 for on-time
  const bgColorDelayed = "#2563eb"; // blue-600 for delayed

  // Chart data
  const data = useMemo(() => ({
    labels: ["Saksham Pvt", "Adhya FMCG", "Nice FMCG", "Hera Ltd"],
    datasets: [
      {
        label: "On-Time Deliveries",
        data: [45, 35, 40, 25],
        backgroundColor: bgColorOnTime,
        borderRadius: 5,
        barPercentage: 0.7,
        categoryPercentage: 0.6,
      },
      {
        label: "Delayed Deliveries",
        data: [5, 10, 5, 5],
        backgroundColor: bgColorDelayed,
        borderRadius: 5,
        barPercentage: 0.7,
        categoryPercentage: 0.6,
      },
    ],
  }), []);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: {
            size: 12,
            weight: "600",
          },
        },
      },
      title: {
        display: true,
        text: "Supplier Delivery Performance",
        color: textColor,
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
        backgroundColor: "#1f2937", // dark slate for tooltip background
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#60A5FA", // blue accent for tooltip border
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          font: {
            size: 12,
            weight: "500",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "No. of Deliveries (Units)",
          color: textColor,
          font: {
            size: 13,
            weight: "bold",
          },
        },
        ticks: {
          color: textColor,
          font: {
            size: 12,
          },
        },
        grid: {
          borderDash: [4, 4],
          color: gridColor,
        },
      },
    },
  }), [textColor, gridColor]); // Removed isDarkMode from dependencies

  return (
    <div className="w-full bg-slate-800 rounded-2xl p-6 shadow-lg"> {/* Direct dark mode background */}
      <div className="h-[360px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default SupplierPerformanceChart;
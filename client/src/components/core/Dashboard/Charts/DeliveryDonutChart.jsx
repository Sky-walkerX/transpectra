import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { deliveryStatusData } from "../../../../data/dashboardData";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function DeliveryDonutChart({
  title = "Delivery Status Overview",
}) {
  // Fixed colors for dark mode only
  const textColor = "#E2E8F0"; // slate-200
  const legendTextColor = "#CBD5E1"; // slate-300
  const tooltipBg = "#334155"; // slate-700 equivalent
  const tooltipTitleColor = "#FFFFFF";
  const tooltipBodyColor = "#FFFFFF";
  const tooltipBorderColor = "#38BDF8"; // cyan-400 accent

  // Build `data` once via useMemo so re-renders don’t recalc unnecessarily:
  const data = useMemo(() => {
    const { labels, data: rawData, colors } = deliveryStatusData;
    return {
      labels,
      datasets: [
        {
          data: rawData,
          backgroundColor: colors,
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    };
  }, []);

  // Build `options` once via useMemo:
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    animation: {
      duration: 700,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: legendTextColor,
          font: {
            size: 12,
            weight: "600",
          },
          padding: 12,
          usePointStyle: true, // use circles instead of squares
        },
      },
      title: {
        display: !!title,
        text: title,
        color: textColor,
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 8,
          bottom: 16,
        },
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipTitleColor,
        bodyColor: tooltipBodyColor,
        borderColor: tooltipBorderColor,
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: true,
        callbacks: {
          label: function (ctx) {
            const label = ctx.label || "";
            const value = ctx.raw || 0;
            const total = ctx.dataset.data.reduce((sum, v) => sum + v, 0);
            const percent = total ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value.toLocaleString()} (${percent}%)`;
          },
        },
      },
    },
  }), [title, textColor, legendTextColor, tooltipBg, tooltipBorderColor]);

  // If no data, show a placeholder
  if (!deliveryStatusData.labels || !deliveryStatusData.data) {
    return (
      <div className="flex justify-center items-center h-[300px] text-gray-400 text-sm">
        No delivery data available.
      </div>
    );
  }

  return (
    <div
      className={
        "flex flex-col items-center w-full h-auto " +
        "bg-slate-800 border border-slate-700 " + // Directly apply dark mode background/border
        "rounded-2xl p-6 shadow-lg transition-transform hover:scale-[1.02]"
      }
    >
      {/* Chart Title */}
      <h2
        className={
          "text-lg font-semibold mb-4 text-slate-100" // Directly apply dark mode text color
        }
      >
        {/* {title} */}
      </h2>

      {/* Doughnut Container */}
      <div className="w-full h-[300px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default DeliveryDonutChart;
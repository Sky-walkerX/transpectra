import React from "react";
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

function DeliveryDonutChart() {
  const data = {
    labels: deliveryStatusData.labels,
    datasets: [
      {
        data: deliveryStatusData.data,
        backgroundColor: deliveryStatusData.colors,
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="flex flex-col items-center w-full h-auto bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-[18px] font-medium text-center text-bold text-richblue-600 mb-4">
        Delivery Status Overview
      </h2>
      <div className="w-full h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default DeliveryDonutChart;

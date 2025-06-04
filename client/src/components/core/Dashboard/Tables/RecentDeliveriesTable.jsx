import React from "react";

const RecentDeliveriesTable = () => {
  const recentDeliveries = [
    {
      deliveryId: "DLV001",
      supplierName: "Saksham Pvt",
      productsDelivered: "Laptops",
      quantity: 50,
      deliveryDate: "15-Oct-2024",
      status: "Completed",
    },
    {
      deliveryId: "DLV002",
      supplierName: "Hera Ltd",
      productsDelivered: "T-Shirts",
      quantity: 200,
      deliveryDate: "16-Oct-2024",
      status: "Completed",
    },
    {
      deliveryId: "DLV003",
      supplierName: "Adhya FMCG",
      productsDelivered: "Toothpaste, Soap",
      quantity: 500,
      deliveryDate: "16-Oct-2024",
      status: "Delayed",
    },
    {
      deliveryId: "DLV005",
      supplierName: "Nice FMCG",
      productsDelivered: "Shampoo",
      quantity: 10,
      deliveryDate: "17-Oct-2024",
      status: "In Progress",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-400"; // Lighter green for dark mode
      case "Delayed":
        return "text-red-400"; // Lighter red for dark mode
      case "In Progress":
        return "text-yellow-400"; // Lighter yellow for dark mode
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto p-4 rounded-2xl shadow-md bg-slate-800"> {/* Dark background */}
      <h2 className="text-xl font-semibold text-center text-blue-100 mb-4"> {/* Light text color */}
        Recent Deliveries
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-900 rounded-md overflow-hidden text-sm"> {/* Darker table background */}
          <thead>
            <tr className="bg-blue-900 text-white text-xs font-medium tracking-wide"> {/* Dark blue header */}
              <th className="py-2 px-4 border-b border-blue-700 text-center">Delivery ID</th> {/* Darker border */}
              <th className="py-2 px-4 border-b border-blue-700 text-center">Supplier Name</th>
              <th className="py-2 px-4 border-b border-blue-700 text-center">Products Delivered</th>
              <th className="py-2 px-4 border-b border-blue-700 text-center">Quantity</th>
              <th className="py-2 px-4 border-b border-blue-700 text-center">Date</th>
              <th className="py-2 px-4 border-b border-blue-700 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentDeliveries.map((delivery, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-slate-700" : "bg-slate-800" // Alternating dark rows
                } text-slate-100 text-xs text-center`} 
              >
                <td className="py-2 px-2 border-b border-slate-600">{delivery.deliveryId}</td> {/* Darker border */}
                <td className="py-2 px-2 border-b border-slate-600">{delivery.supplierName}</td>
                <td className="py-2 px-2 border-b border-slate-600">{delivery.productsDelivered}</td>
                <td className="py-2 px-2 border-b border-slate-600">{delivery.quantity}</td>
                <td className="py-2 px-2 border-b border-slate-600">{delivery.deliveryDate}</td>
                <td
                  className={`py-2 px-2 border-b border-slate-600 font-semibold ${getStatusColor(
                    delivery.status
                  )}`}
                >
                  {delivery.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDeliveriesTable;
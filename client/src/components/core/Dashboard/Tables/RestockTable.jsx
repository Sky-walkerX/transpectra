import React from "react";

const RestockTable = ({ restockAlerts }) => {
  return (
    <div className="w-full bg-slate-800 rounded-2xl shadow-md p-4 overflow-x-auto max-w-[900px] mx-auto"> {/* Direct dark mode background */}
      <h2 className="text-lg md:text-xl font-semibold text-center text-blue-100 mb-4"> {/* Light text color */}
        Urgent Restock Alerts
      </h2>

      <table className="min-w-full table-auto text-sm text-left border-collapse">
        <thead>
          <tr className="bg-blue-900 text-white text-xs font-semibold tracking-wide"> {/* Dark blue header */}
            <th className="px-4 py-2 border-b-2 border-blue-700 text-center">Product Name</th> {/* Darker border */}
            <th className="px-4 py-2 border-b-2 border-blue-700 text-center">Current Stock</th>
            <th className="px-4 py-2 border-b-2 border-blue-700 text-center">Reorder Threshold</th>
            <th className="px-4 py-2 border-b-2 border-blue-700 text-center">Category</th>
          </tr>
        </thead>
        <tbody>
          {restockAlerts.length > 0 ? (
            restockAlerts.map((alert, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-slate-700" : "bg-slate-600" // Alternating dark rows
                } text-blue-100 text-xs text-center transition-all duration-150`}
              >
                <td className="py-2 px-4 border-b border-slate-600">{alert.productName}</td> {/* Darker border */}
                <td className="py-2 px-4 border-b border-slate-600">{alert.currentStock}</td>
                <td className="py-2 px-4 border-b border-slate-600">{alert.reorderThreshold}</td>
                <td className="py-2 px-4 border-b border-slate-600">{alert.productCategory}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-400"> {/* Dark mode text color */}
                No restock alerts.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RestockTable;
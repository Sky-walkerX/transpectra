import React from 'react';

function Services() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-4xl w-full text-center py-10 px-6 rounded-lg shadow-xl bg-slate-800 border border-slate-700">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Our Services</h1>
        <p className="text-lg leading-relaxed mb-8">
          We offer a comprehensive suite of services tailored to streamline your logistics and inventory management processes.
          Our solutions are designed to give you complete visibility and control.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Service 1 */}
          <div className="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">Intelligent Inventory Management</h2>
            <p className="text-base leading-relaxed">
              Track stock levels in real-time, predict demand, manage reorder points, and minimize waste with our advanced inventory analytics.
              Gain insights into product trends and optimize your warehouse space efficiently.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">Fleet Activity Monitoring</h2>
            <p className="text-base leading-relaxed">
              Monitor your fleet's movements, load/unload times, and delivery performance. Get real-time updates on incoming
              and outgoing vehicles to enhance yard efficiency and reduce wait times.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">Supplier Performance Analytics</h2>
            <p className="text-base leading-relaxed">
              Evaluate supplier reliability and delivery timeliness. Our tools help you identify top-performing suppliers
              and areas for improvement, fostering stronger, more efficient partnerships.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">Cost Optimization & Reporting</h2>
            <p className="text-base leading-relaxed">
              Identify cost-saving opportunities across your supply chain. Generate detailed reports on
              operational expenses, inventory carrying costs, and delivery efficiencies to make informed financial decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
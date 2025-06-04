import React from 'react';

function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-4xl w-full text-center py-10 px-6 rounded-lg shadow-xl bg-slate-800 border border-slate-700">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">About Us</h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to our platform! We are dedicated to revolutionizing warehouse management and supply chain operations.
          Our innovative solutions are designed to optimize efficiency, reduce costs, and provide actionable insights for businesses of all sizes.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Founded with a vision to simplify complex logistics, our team comprises experienced professionals in technology,
          logistics, and data analytics. We believe in leveraging cutting-edge technology to empower our clients to achieve
          unprecedented levels of productivity and control over their inventory and fleet.
        </p>
        <p className="text-lg leading-relaxed">
          Our commitment is to deliver robust, user-friendly, and scalable systems that adapt to your evolving business needs.
          Join us on our journey to a smarter and more efficient supply chain.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
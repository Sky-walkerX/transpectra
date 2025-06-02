import React from "react";
import { Link } from "react-router-dom";
import { FaTruck, FaWarehouse, FaRoute, FaChartLine, FaLinkedinIn, FaFacebookF, FaEnvelope, FaTwitter } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import img from "../assets/Images/Hom.png";

const Home = () => {
  const features = [
    {
      icon: <FaTruck className="text-4xl text-blue-600" />,
      title: "Smart Fleet Management",
      description: "Optimize your fleet operations with real-time tracking and intelligent route planning."
    },
    {
      icon: <FaWarehouse className="text-4xl text-blue-600" />,
      title: "Warehouse Optimization",
      description: "Streamline your warehouse operations with advanced inventory management."
    },
    {
      icon: <FaRoute className="text-4xl text-blue-600" />,
      title: "Route Optimization",
      description: "AI-powered route planning to minimize delivery time and costs."
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-600" />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and reporting for better decision making."
    },
    {
      icon: <MdOutlineSecurity className="text-4xl text-blue-600" />,
      title: "Secure Operations",
      description: "End-to-end security with real-time monitoring and alerts."
    },
    {
      icon: <BsGraphUp className="text-4xl text-blue-600" />,
      title: "Performance Tracking",
      description: "Monitor and improve your logistics performance metrics."
    }
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "Logistics Manager",
      company: "Global Logistics Inc.",
      content: "Transpectra has revolutionized our supply chain operations. The real-time tracking and route optimization features have significantly reduced our delivery times."
    },
    {
      name: "Sarah Johnson",
      role: "Operations Director",
      company: "Tech Solutions Ltd",
      content: "The warehouse management system is incredibly efficient. We've seen a 30% improvement in our inventory accuracy since implementing Transpectra."
    },
    {
      name: "Michael Chen",
      role: "Supply Chain Head",
      company: "E-Commerce Plus",
      content: "The analytics dashboard provides invaluable insights that help us make data-driven decisions. Highly recommended!"
    }
  ];

  return (
    <div className="w-full h-full">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image with Blue Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="absolute inset-0 bg-blue-800 opacity-70"></div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 w-full md:w-6/12 mx-8 mt-10 md:mx-32 flex flex-col items-start justify-center h-full">
          {/* Text Content */}
          <div className="text-white font-inter">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Seamless Logistics Solutions
            </h1>
            <p className="text-md md:text-lg opacity-80 mb-8">
              Transpectra offers a complete solution for managing your supply chain, from manufacturers to warehouses. With real-time tracking, smart inventory management, and optimized delivery routes, we ensure smooth and efficient operations.
            </p>
            <div className="space-x-4">
              <Link to="/login">
                <button className="bg-blu text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-blu text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Features
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive logistics solutions to streamline your operations
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Trusted by leading companies worldwide
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="bg-blu text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between gap-6">
          {/* Left: Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-bold text-xl tracking-wide mb-1">Transpectra</span>
            <span className="text-sm opacity-80">&copy; {new Date().getFullYear()} Transpectra. All rights reserved.</span>
          </div>
          {/* Center: Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/privacy-policy" className="hover:underline text-sm">Privacy Policy</a>
            <a href="/terms" className="hover:underline text-sm">Terms of Service</a>
            <a href="/about" className="hover:underline text-sm">About</a>
            <a href="/contact" className="hover:underline text-sm">Contact</a>
          </div>
          {/* Right: Social Icons */}
          <div className="flex gap-4 justify-center">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-llblue font-bold text-xl hover:opacity-80 transition duration-300">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-llblue font-bold text-xl hover:opacity-80 transition duration-300">
              <FaLinkedinIn />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-llblue font-bold text-xl hover:opacity-80 transition duration-300">
              <FaFacebookF />
            </a>
            <a href="mailto:info@transpectra.com" aria-label="Email" className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-llblue font-bold text-xl hover:opacity-80 transition duration-300">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

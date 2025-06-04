import React from 'react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'; // Importing icons for contact info

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-4xl w-full text-center py-10 px-6 rounded-lg shadow-xl bg-slate-800 border border-slate-700">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Contact Us</h1>
        <p className="text-lg leading-relaxed mb-8">
          Have questions, feedback, or need support? We'd love to hear from you! Please reach out to us using the contact information below or fill out the form.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Information */}
          <div className="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600 text-left">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Get in Touch</h2>
            <div className="flex items-center mb-3">
              <MdEmail className="text-blue-400 text-2xl mr-3" />
              <p className="text-lg">info@yourcompany.com</p>
            </div>
            <div className="flex items-center mb-3">
              <MdPhone className="text-blue-400 text-2xl mr-3" />
              <p className="text-lg">+91-9876543210</p> {/* Example Indian phone number */}
            </div>
            <div className="flex items-start">
              <MdLocationOn className="text-blue-400 text-2xl mr-3 mt-1 flex-shrink-0" />
              <p className="text-lg">
                123 Logistics Hub,
                <br />
                Industrial Area, Jaipur,
                <br />
                Rajasthan, India - 302001
              </p>
            </div>
          </div>

          {/* Simple Contact Form Placeholder */}
          <div className="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600 text-left">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Send us a Message</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-md bg-slate-600 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 rounded-md bg-slate-600 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="p-3 rounded-md bg-slate-600 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
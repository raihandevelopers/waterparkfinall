import React from "react";

function ContactPage() {
  return (
    <>
          <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />
    <div className="bg-gray-100 mt-24">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-64 flex items-center justify-center">
        <img
          src="breadcrumb.jpeg" // Replace with your image path
          alt="Water Park" // Add a relevant alt text
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4 text-white">Get In Touch With Us!</h1>
          <p className="text-lg">
            We're here to help you with any questions or information you need about Waterpark Chalo.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-8 py-16 max-w-[90%] lg:max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Our Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <i className="fas fa-phone-alt text-blue-500 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Phone Number</h3>
                  <p className="text-gray-600">+918847714464</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <i className="fas fa-envelope text-blue-500 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Email Us</h3>
                  <p className="text-gray-600">wpc@waterparkchalo.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <i className="fas fa-map-marker-alt text-blue-500 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Address</h3>
                  <p className="text-gray-600">
                    110, Lakshmi Apt, Near Kailash Darshan 1, Alkapuri, Nallasopara East 491209
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Send Us A Message</h2>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                ></textarea>
              </div>
              <button className="w-full bg-[#234778] text-white py-3 rounded hover:bg-[#234778] transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-72 lg:h-96 mt-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d481664.6013077576!2d72.824089!3d19.412203000000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a94882879413%3A0x780bb7d2f3a4f8ca!2sKailash%20Darshan%20-1!5e0!3m2!1sen!2sus!4v1732195989688!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
    </div>
    </>

  );
}
export default ContactPage;

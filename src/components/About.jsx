import React from 'react';

function About() {
  return (
    <>
      {/* WhatsApp Floating Icon */}
      <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
></img>

      {/* Breadcrumb Section */}
      <div className="relative w-full h-[300px] mt-16">
        <img
          src="breadcrumb.jpeg" // Replace with your image path
          alt="Water Park Banner"
          className="absolute inset-0 w-full h-64 object-cover bg-opacity-50 filter brightness-50"
        />
        <div className="absolute inset-0"></div>
        <div className="absolute bottom-12 -translate-y-12 left-1/2 -translate-x-1/2 text-white">
          <h1 className="text-5xl font-bold text-center text-white brightness-150 filter">About Us</h1>
        </div>
      </div>

      {/* About Us Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Welcome to Waterpark Chalo
        </h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-8">
          Your Ultimate Destination for Fun and Adventure!
        </h3>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            At Waterpark Chalo, we believe everyone deserves a fun-filled day at the waterpark. We offer a range of affordable options to make your visit enjoyable and budget-friendly. We provide competitive pricing and flexible ticket choices, including single-day and season passes, so you can customize your experience.
          </p>
          <p>
            Take advantage of exclusive discounts and special promotions available on our website and social media. Whether for a birthday, school outing, or corporate event, we have tailored packages for you.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;

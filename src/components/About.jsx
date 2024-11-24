import React from 'react';

function About() {
  return (
    <>
      <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />
      
      <div className="about-container lg:max-w-[1200px] my-24">

 {/* Hero Section */}
 <div className="relative bg-cover bg-center h-64 flex items-center justify-center">
        <img
          src="breadcrumb.jpeg" // Replace with your image path
          alt="Water Park" // Add a relevant alt text
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4 text-white">About Us</h1>

        </div>
      </div>


        <h1 className="about-title">Welcome to Water Park Chalo
        </h1>
        <h1 className="about-title">Your Ultimate Destination for Fun and Adventure!
        </h1>


        <p className="about-paragraph">
        At Waterpark Chalo, we believe everyone deserves a fun-filled day at the waterpark. We offer a range of affordable options to make your visit enjoyable and budget-friendly. We provide competitive pricing and flexible ticket choices, including single-day and season passes, so you can customize your experience.

</p>

        <p className="about-paragraph">
        Take advantage of exclusive discounts and special promotions available on our website and social media. Whether for a birthday, school outing, or corporate event, we have tailored packages for you.


        </p>

        {/* <p className="about-paragraph">
          Whether you dream of exploring exotic landscapes, indulging in luxury accommodations, or discovering hidden gems off the beaten path, My Resort Booking
          is here to turn your travel dreams into reality. Let us be your guide as you embark on your next unforgettable adventure.
        </p>

        <p className="about-ending">
          Join us, and let's explore the world together.<br />
          My Resort Booking - Your Passport to Adventure.
        </p> */}
      </div>
    </>

  );
}

export default About;

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
      <div className="about-container">
        <h1 className="about-title">Book Your Dream Resort, Unlock Happiness</h1>

        <p className="about-intro">
          Welcome to My Resort Booking, where wanderlust meets exceptional service and unforgettable experiences.
        </p>

        <p className="about-paragraph">
          At My Resort Booking, we believe that travel is not just about reaching a destination; it's about the journey, the moments shared, and the memories created.
          Our passion for travel drives us to curate bespoke experiences tailored to your desires, whether you're seeking adventure, relaxation, cultural immersion, or all of the above.
        </p>

        <p className="about-paragraph">
          With years of expertise in the travel industry, our team of dedicated professionals is committed to providing you with personalized service from the moment
          you contact us until you return home. We pride ourselves on our attention to detail, ensuring that every aspect of your journey exceeds your expectations.
        </p>

        <p className="about-paragraph">
          Whether you dream of exploring exotic landscapes, indulging in luxury accommodations, or discovering hidden gems off the beaten path, My Resort Booking
          is here to turn your travel dreams into reality. Let us be your guide as you embark on your next unforgettable adventure.
        </p>

        <p className="about-ending">
          Join us, and let's explore the world together.<br />
          My Resort Booking - Your Passport to Adventure.
        </p>
      </div>
    </>

  );
}

export default About;

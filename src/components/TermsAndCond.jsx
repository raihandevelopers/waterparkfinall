import React from 'react';

const TermsAndConditions = () => {
  return (
    <>
              <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />
    <div className="mt-32 mx-auto py-4 md:px-24 px-12">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">Terms and Conditions</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">WaterparkChalo.com – Waterpark and Resort Booking Website Terms and Conditions</h2>
        <p className="mb-4 text-lg text-gray-700">
          Welcome to Waterpark Chalo (the “Website”). By accessing and using this website, you agree to comply with the following terms and conditions. Please read these terms carefully before proceeding with any booking or using any services offered by Waterpark Chalo. If you do not agree with any of these terms, you must refrain from using our services.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">1. Website Usage</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>The Waterpark Chalo website is intended for personal and non-commercial use only.</li>
          <li>You must be at least 18 years of age or older to make bookings on this website. If you are under 18, you must use this website under the supervision of a parent or legal guardian.</li>
          <li>You agree to provide accurate and complete information during the booking process and ensure the details provided are up to date.</li>
          <li>You are responsible for maintaining the confidentiality of your account login credentials and for all activities performed under your account.</li>
          <li>Waterpark Chalo reserves the right to refuse service, terminate accounts, or cancel bookings at its sole discretion without prior notice, if we suspect any violation of these terms or any fraudulent activity.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">2. Booking and Payment</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>All bookings made through Waterpark Chalo are subject to availability.</li>
          <li>By making a booking, you agree to pay the total amount as displayed, including applicable taxes and fees, at the time of booking.</li>
          <li>Payment methods accepted on the website may include credit cards, debit cards, and other forms of electronic payment.</li>
          <li>Waterpark Chalo reserves the right to change the prices and availability of bookings at any time without prior notice.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">3. Cancellation and Refund</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>Cancellation policies vary based on the type of booking, specific accommodation, and other factors. It is essential to review the cancellation policy before making a booking.</li>
          <li>Refunds, if applicable, will be processed based on the cancellation policy and within a reasonable timeframe.</li>
          <li>Waterpark Chalo will not be liable for any charges or expenses incurred as a result of a canceled booking.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">4. User Content</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>Users may have the option to post reviews, comments, photos, or other content on the website. By doing so, you grant Waterpark Chalo a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, reproduce, and display such content for promotional and other business purposes.</li>
          <li>You agree not to post any content that is illegal, offensive, harmful, defamatory, or infringes upon the rights of others.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">5. Intellectual Property</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>All content on the Waterpark Chalo website, including text, graphics, logos, images, software, and other materials, is the property of Waterpark Chalo or its content suppliers and protected by applicable intellectual property laws.</li>
          <li>You may not reproduce, distribute, display, perform, or create derivative works of the website’s content without prior written consent from Waterpark Chalo.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">6. Liability Disclaimer</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>Waterpark Chalo strives to provide accurate and up-to-date information on the website. However, we do not guarantee the accuracy, completeness, or reliability of the content, including the information about accommodations, amenities, and services.</li>
          <li>Waterpark Chalo will not be liable for any damages or losses arising from the use of this website, including but not limited to direct, indirect, incidental, punitive, or consequential damages.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">7. Governing Law and Jurisdiction</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>These terms and conditions are governed by the laws of Maharashtra, India, and any disputes shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">8. Modification of Terms</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>Waterpark Chalo reserves the right to modify or update these terms and conditions at any time without prior notice. It is your responsibility to review these terms regularly for any changes.</li>
        </ul>
      </section>

      <footer className="mt-6 text-center text-lg text-gray-500">
        <p>By using Waterpark Chalo’s services and website, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you do not agree with any part of these terms, you must refrain from using our services.</p>
      </footer>
    </div>
    </>
  );
};

export default TermsAndConditions;

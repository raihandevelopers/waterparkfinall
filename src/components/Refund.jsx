import React from 'react';

const RefundsAndCancellations = () => {
  return (
    <>
          <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />
    <div className="mt-32 mx-auto py-4 md:px-24 px-12">
      <h1 className="text-3xl font-bold mb-6 text-black">Refunds and Cancellations Policy</h1>
      <p className="mb-4">This Refunds and Cancellations Policy outlines the procedures and guidelines for refunds and cancellations of bookings made through Waterpark Chalo. By using our services and making bookings on the Website, you agree to comply with the following policy:</p>

      <section>
        <h2 className="text-2xl font-semibold mb-4">1. Booking Cancellations</h2>
        <ul className="list-disc pl-5">
          <li>Cancellation policies for bookings may vary depending on the specific accommodation, service, or package selected. It is essential to review the cancellation policy displayed at the time of booking.</li>
          <li>To request a cancellation, you must contact Waterpark Chalo’s customer support team by phone or email and provide the relevant booking details.</li>
          <li>Any refund, if applicable, will be processed based on the cancellation policy and within a reasonable timeframe.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">2. Refunds</h2>
        <ul className="list-disc pl-5">
          <li>For refund of any booking contact with us before one day of your check-in date. Refunds, if applicable, will be processed in accordance with the cancellation policy and the method of payment used for the booking.</li>
          <li>If the cancellation is made within the specified period to receive a refund, the amount will be refunded to the original payment method used during booking.</li>
          <li>Refunds may take 7 working business days to appear in your account, depending on the policies of your financial institution.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">3. No-Shows or Late Arrivals</h2>
        <ul className="list-disc pl-5">
          <li>If you fail to check-in at the specified time (“no-show”) without prior communication with Waterpark Chalo or the accommodation provider, you may not be eligible for a refund.</li>
          <li>Late arrivals or early departures may be subject to the terms and conditions of the specific accommodation provider and may result in forfeiture of payment.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">4. Changes and Amendments</h2>
        <ul className="list-disc pl-5">
          <li>If you wish to make changes or amendments to your booking, please contact Waterpark Chalo’s customer support team.</li>
          <li>Changes to bookings are subject to availability and the policies of the specific accommodation or service provider.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">5. Force Majeure</h2>
        <ul className="list-disc pl-5">
          <li>Waterpark Chalo shall not be held responsible for cancellations or changes to bookings arising due to unforeseen circumstances beyond our control, such as natural disasters, political unrest, or any other force majeure event.</li>
          <li>In the event of force majeure, Waterpark Chalo will make reasonable efforts to assist Users with their bookings, but no liability will be incurred for any losses or expenses resulting from such events.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">6. Customer Support</h2>
        <p>If you have any questions or need assistance related to cancellations, refunds, or booking changes, please contact Waterpark Chalo’s customer support team via phone or email.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">7. Modification of Policy</h2>
        <p>Waterpark Chalo reserves the right to modify or update this Refunds and Cancellations Policy at any time without prior notice. It is your responsibility to review this policy regularly for any changes.</p>
      </section>

      <p className="mt-4">By using Waterpark Chalo’s services and making bookings on the Website, you acknowledge that you have read, understood, and agreed to this Refunds and Cancellations Policy. If you do not agree with any part of this policy, you must refrain from using our services.</p>
    </div>
    </>

  );
};

export default RefundsAndCancellations;

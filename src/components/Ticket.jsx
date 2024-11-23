import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";

const WaterparkTicket = () => {
  // Hardcoded data if booking is not passed through navigation
  // const booking = {
  //   name: "SAIL SURVE",
  //   adults: 6,
  //   children: 0,
  //   total: 6,
  //   date: "25/10/2024",
  //   waterparkName: "Sagar Resort",
  //   totalPrice: 2700,
  //   phone: "8983270305",
  // };
  const location = useLocation();
  const { booking } = location.state || {}; // Get the booking from route params
  
  // If no booking data is available, return a loading state or an error message
  if (!booking) {
    return <div>No booking information available.</div>;
  }


  // const handleDownload = () => {
  //   const ticketElement = document.getElementById("ticket");
  //   html2canvas(ticketElement).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
  //     pdf.save("waterpark-ticket.pdf");
  //   });
// };

  const handleDownload = () => {
    const ticketElement = document.getElementById("ticket");
    html2canvas(ticketElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "waterpark-ticket.png"; // Save the image as PNG
      link.click(); // Trigger the download
    });
  };

  return (
    <>
      <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />    <div className="flex flex-col items-center p-6 bg-gray-100 my-24">
      <div
        id="ticket"
        className="w-full max-w-3xl bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col lg:flex-row"
      >
        {/* Vertical "WATERPARK TICKET" Section */}
        <div className="flex flex-col items-center justify-center bg-blue-800 text-white w-full lg:w-20 py-4">
          <p className="text-sm font-bold tracking-wider transform lg:rotate-90 lg:text-xs w-full text-center">
            WATERPARK TICKET
          </p>
        </div>


        {/* Ticket Content */}
        <div className="flex-1  border-l-2 pl-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-800">WATERPARK CHALO</h2>
            <img src="/logo.png" alt="Logo" className="h-12" />
          </div>

          {/* Booking Details */}
          <div className=" border-b-2 pb-4 mb-4">
            <p className="text-sm">
              <span className="font-bold">Booking Id:</span> {booking._id}
            </p>
            <p className="text-sm">
              <span className="font-bold">Name:</span> {booking.name}
            </p>
            <p className="text-sm">
              <span className="font-bold">Adults:</span> {booking.adults}
            </p>
            <p className="text-sm">
              <span className="font-bold">Child:</span> {booking.children}
            </p>
            <p className="text-sm">
              <span className="font-bold">Total:</span> {booking.adults + booking.children}
            </p>
            <p className="text-sm">
  <span className="font-bold">Date:</span> {new Date(booking.date).toLocaleDateString('en-GB')}
</p>

            <p className="text-sm">
              <span className="font-bold">Waterpark:</span> {booking.waterparkName}
            </p>
            <p className="text-sm">
              <span className="font-bold">Total Amount to pay:</span> Rs {booking.totalPrice}/-
            </p>
            <p className="text-sm">
              <span className="font-bold">Contact:</span> {booking.phone}
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="flex flex-col items-start mb-4 lg:mb-0">
            <p className="text-sm">Contact Us:</p>
            <p className="text-sm font-bold">9146869202</p>
            <p className="text-sm">www.waterparkchalo.com</p>
            <p className="text-sm">wps@waterparkchalo.com</p>
          </div>

          {/* Terms and Conditions */}
          <div className="text-sm text-gray-700">
            <p>* Please Carry Cash For Remaining Payment.</p>
            <p># Drinking Is Strictly Prohibited in Waterpark.</p>
            <p># Pickup And Drop Service Is Not Included In This Package.</p>
            <p>
              # In Case Of Any Dispute And Misunderstanding, Waterpark Holds Final
              Decision.
            </p>
            <p># For Refund And Cancellation Contact Us Before 1 Day Of Check-In.</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Ticket
      </button>
    </div>  
    </>
  );
};

export default WaterparkTicket;

import React from "react";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

const WaterparkTicket = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  if (!booking) {
    return <div>No booking information available.</div>;
  }

  const handleDownload = () => {
    const ticketElement = document.getElementById("ticket");
    html2canvas(ticketElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "waterpark-ticket.png";
      link.click();
    });
  };

  return (
    <div className="flex flex-col  items-center bg-gray-100 py-8 pb-24">
      <button
        onClick={handleDownload}
        className="bg-[#fff] text-black  mt-24 px-6 py-2 rounded-lg mb-4 shadow hover:bg-blue-700"
      >
        ⬇ Download Ticket
      </button>
      <div
        id="ticket"
        className="max-w-xl w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300"
      >
        {/* Ticket Header */}
        <div className="relative bg-[#fff] text-white text-center py-4">
          <h1 className="text-lg font-bold">Creating Memories</h1>
          <p className="text-sm italic text-black">One Adventure at a Time with Waterparkchalo</p>
          <div className="absolute top-2 right-2">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </div>
        </div>

        {/* Waterpark Banner */}
        <div className="relative">
          <img
            src="/breadcrumb.jpeg" // Replace with the actual banner image path
            alt="Waterpark"
            className="w-full h-32 object-cover"
          />
        </div>

        {/* Main Ticket Content */}
        <div className="p-4 text-gray-800">
        <h2
  className="text-center text-xl font-bold text-blue-800 mb-4"
  style={{ textDecoration: "none", border: "none", margin: 0, padding: 0 }}
>
  {booking.waterparkName}
</h2>


          <div className="grid grid-cols-2 gap-4 mb-4">
            <p>
              <span className="font-bold">Booking Id:</span> 
              <span className="block break-words max-w-full">{booking._id}</span>
            </p>
            <p>
              <span className="font-bold">Payment Id:</span> pay_P5cD6ESfdBTZ0B
            </p>
            <p>
              <span className="font-bold">Booking Date:</span>{" "} <br/>
              {new Date(booking.bookingDate).toLocaleDateString("en-GB")}
            </p>
            <p>
              <span className="font-bold">Visit Date:</span>{" "} <br/>
              {new Date(booking.date).toLocaleDateString("en-GB")}
            </p>
            <p>
              <span className="font-bold">Name:</span> {booking.name}
            </p>
            <p>
              <span className="font-bold">Adult:</span> {booking.adults}
            </p>
            <p>
              <span className="font-bold">Contact:</span> {booking.phone}
            </p>
            <p>
              <span className="font-bold">Children:</span> {booking.children}
            </p>
          </div>

          <div className="text-center mb-4">
            <h3 className="font-bold">Package Inclusion</h3>
            <p>Breakfast + Lunch + Tea</p>
          </div>

          {/* <div className="text-center mb-4">
            <h3 className="font-bold">Address</h3>
            <p>
              {booking.location}
            </p>
          </div> */}

<h3
  className="font-bold text-center border border-[#234778] rounded"
  style={{
    padding: "10px",
    lineHeight: "1.2",
    height: "50px", // Adjust as needed to ensure the text is perfectly centered
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  Pay on Waterpark - ₹{booking.totalPrice}/-
</h3>

        </div>
      </div>
    </div>
  );
};

export default WaterparkTicket;

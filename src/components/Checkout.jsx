import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { adultCount, childCount, date, resortName, subtotal, deposit, resortId } = location.state || {}; // Destructure data from location

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    createAccount: false,
    total: subtotal,
  });

  const [paymentMethod, setPaymentMethod] = useState("phonepe"); // Default to PhonePe payment

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (billingDetails.email === "" || billingDetails.firstName === "" || billingDetails.lastName === "" || billingDetails.phone === "" || billingDetails.city === "") {
      toast.error("Please fill all the details");
      return;
    }

    try {
      console.log("Order placed with details:", billingDetails, paymentMethod, resortId);

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/bookings/create`, {
        waterpark: resortId,
        waterparkName: resortName,
        name: `${billingDetails.firstName} ${billingDetails.lastName}`,
        email: billingDetails.email,
        phone: billingDetails.phone,
        date: date,
        adults: adultCount,
        children: childCount,
        advanceAmount: deposit,
        paymentType: paymentMethod,
      });

      const { success, paymentUrl, booking, message } = response.data;

      if (!success) {
        console.error("Error:", message);
        toast.error("Failed to create booking. Please try again.");
        return;
      }

      if (paymentMethod === "phonepe" && paymentUrl) {
        window.location.href = paymentUrl;

        const paymentResponse = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/booking/verify`, {
          merchantTransactionId: booking._id, // Send the booking ID as merchantTransactionId
          paymentMethod: "phonepe",
        });

        console.log("Payment verification response:", paymentResponse.data);

        if (paymentResponse.data.success) {
          toast.success("Payment successful!");
          navigate("/ticket", { state: { booking: paymentResponse.data.booking } });
        } else {
          toast.error("Payment failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  return (
    <>
      <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10 px-4 my-10">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Checkout</h1>

          <form className="space-y-8">
            {/* Billing Details Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["firstName", "lastName", "phone", "email", "city"].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label
                      htmlFor={field}
                      className="text-gray-700 font-medium mb-2"
                    >
                      {field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={field}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={billingDetails[field]}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                      required={true}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Order</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-gray-700 font-medium">Product</th>
                      <th className="py-3 px-4 text-gray-700 font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">
                        {resortName} x 1
                        <br />
                        <span className="text-sm text-gray-500">
                          Check-in: {date} | Adults: {adultCount} | Children: {childCount}
                        </span>
                      </td>
                      <td className="py-3 px-4">₹{subtotal}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Deposit:</td>
                      <td className="py-3 px-4">₹{deposit}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Remaining:</td>
                      <td className="py-3 px-4">₹{subtotal - deposit}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Total payable:</td>
                      <td className="py-3 px-4 font-semibold">₹{subtotal}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Payable deposit:</td>
                      <td className="py-3 px-4 font-semibold">₹{deposit}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Method Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="phonepe">PhonePe</option>
              </select>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;

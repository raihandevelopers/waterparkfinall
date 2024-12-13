import React, { useEffect, useState } from "react";
import axios from "axios";

const GetBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  useEffect(() => {
    // Fetch bookings from the backend
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/bookings/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      })
      .then((response) => {
        console.log("Bookings fetched:", response.data);
        setBookings(response.data); // Set the fetched bookings data to state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError("Error fetching bookings"); // Set error if any
        setLoading(false); // Set loading to false in case of error
        console.error("Error fetching bookings:", err);
      });
  }, []); // Empty dependency array to run only once when the component mounts

  // Filter bookings based on search query
  const filteredBookings = bookings.filter((booking) =>
    booking.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Customer Name</th>
              <th className="px-4 py-2 text-left">Waterpark</th>
              <th className="px-4 py-2 text-left">Visiting Date</th>
              <th className="px-4 py-2 text-left">Booking Date</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Total Price</th>
              <th className="px-4 py-2 text-left">Advance Amount</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Adults</th>
              <th className="px-4 py-2 text-left">Children</th>
              <th className="px-4 py-2 text-left">Payment Status</th>
              <th className="px-4 py-2 text-left">Payment Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-4 py-2">{booking.name}</td>
                  <td className="px-4 py-2">{booking.waterparkName}</td>
                  <td className="px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{booking.email}</td>
                  <td className="px-4 py-2">{booking.totalAmount}</td>
                  <td className="px-4 py-2">{booking.advanceAmount}</td>
                  <td className="px-4 py-2">{booking.phone}</td>
                  <td className="px-4 py-2">{booking.adults}</td>
                  <td className="px-4 py-2">{booking.children}</td>
                  <td className="px-4 py-2">{booking.paymentStatus}</td>
                  <td className="px-4 py-2">{booking.paymentType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetBookings;

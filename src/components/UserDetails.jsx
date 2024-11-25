import { Stack, Paper, Typography, Collapse, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function UserHome() {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    mobile: "",
  });
  const [bookings, setBookings] = useState([]);  // To store bookings data
  const [loading, setLoading] = useState(true);  // To track loading state
  const [openIndex, setOpenIndex] = useState(null); // To track the opened dropdown
  const navigate = useNavigate();  // Using useNavigate hook

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the dropdown visibility
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user && user.role == 'admin' ? true : false;
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("parsedUser", parsedUser);
        setUserData({
          email: parsedUser.email || "",
          name: parsedUser.name || "",
          mobile: parsedUser.mobile || "",
        });

        // Fetch bookings data after setting user data
        fetchBookings(parsedUser.email);

      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const fetchBookings = async (email) => {
    console.log(email);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/bookings/getuserbookings`, // Your backend URL
        { email }, // Send email to the backend
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("response", response);
      // alert("response", response.data.bookings);
      // Check if the response status is 200 (success)
      if (response.status === 200) {
        setBookings(response.data.bookings);  // Set the bookings in state
      } else {
        console.error(response.data.message);  // Handle no bookings found or error
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false)
    }
  };


  const logOut = () => {
    window.localStorage.clear();
    toast.success("Logged out successfully");
    window.location.href = "./sign-in";
  };

  return (
    <div className="pb-24">
      <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />
      <Stack
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5vh",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: "600px",
            width: "100%",
            padding: "2rem",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
          }}
        >
          <Stack
            spacing={4}
            sx={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="#021E30">
              Booking Dashboard
            </Typography>
            <AccountCircleIcon sx={{ fontSize: "5rem", color: "#00CED1" }} />
            <Stack spacing={1} sx={{ width: "100%", textAlign: "left" }}>
              <Typography variant="h6">Name: {userData.name}</Typography>
              <Typography variant="body1">Email: {userData.email}</Typography>
              <Typography variant="body1">
                Phone Number: {userData.mobile}
              </Typography>
            </Stack>

            {/* Booking List */}
            {loading ? (
              <Typography variant="body1" color="gray">
                Loading bookings...
              </Typography>
            ) : (
              <Stack spacing={2} sx={{ width: "100%" }}>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <Paper
                      key={index}
                      elevation={2}
                      sx={{
                        padding: "1rem",
                        borderRadius: "12px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        onClick={() => handleToggle(index)} // Toggle dropdown on click
                        sx={{
                          cursor: "pointer", // Make the row clickable
                          padding: "0.5rem",
                        }}
                      >
                        <Typography variant="h6">{booking.waterparkName}</Typography>
                        <Typography variant="body1">
                          Date: {new Date(booking.date).toLocaleDateString()}
                        </Typography>
                      </Stack>

                      <Collapse in={openIndex === index}>
                        <Stack spacing={2} sx={{ marginTop: "1rem" }}>
                          <Typography variant="body1">
                            <strong>Name:</strong> {booking.name}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Email:</strong> {booking.email}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Phone:</strong> {booking.phone}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Adults:</strong> {booking.adults}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Children:</strong> {booking.children}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Total Price:</strong> ₹{booking.totalPrice}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Payment Type:</strong> {booking.paymentType}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Payment Status:</strong> {booking.paymentStatus}
                          </Typography>
                        </Stack>
                      </Collapse>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body1" color="gray">
                    No bookings found.
                  </Typography>
                )}
              </Stack>
            )}

            {
              isAdmin && (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#00CED1",
                    color: "#ffffff",
                    padding: "0.5rem 1rem",
                    textTransform: "none",
                    borderRadius: "8px",
                  }}
                  onClick={() => navigate('/admin')}
                >
                  View Admin Dashboard
                </Button>
              )
            }

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00CED1",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                textTransform: "none",
                borderRadius: "8px",
              }}
              onClick={logOut}
            >
              Log out
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </div>
  );
}

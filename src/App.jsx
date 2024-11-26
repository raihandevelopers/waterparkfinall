import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Contact from './components/Contact'
import Farmvilla from './components/farmvilla'
import Influencers from './components/Influencers'
import Resorts from './components/Resorts'
import Login from './components/Login'
import CheckoutPage from './components/Checkout.jsx'
import Review from './components/Review.jsx'

import PrivacyPolicy from './components/PrivacyPolicy.jsx'

import AdminLayout from './components/admin/Admin.jsx'; // Admin Navigation Layout
import AddWaterpark from './components/admin/AddWaterpark.jsx';
import GetBookings from './components/admin/GetBookings.jsx';
import EditWaterparkList from './components/admin/EditWaterparkList.jsx'
import AddEditPrivacyPolicy from './components/admin/AddEditPrivacyPolicy.jsx';
import AddEditTermsConditions from './components/admin/AddEditTermsConditions.jsx';
import EditWaterpark from './components/admin/EditWaterpark.jsx'
import WaterparkTicket from './components/Ticket.jsx'
import RefundsAndCancellations from './components/Refund.jsx'
import TermsAndConditions from './components/TermsAndCond.jsx'
import UserHome from './components/UserDetails.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === 'admin';
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="waterparks" element={<Farmvilla />} />
          <Route path="review" element={<Review />} />
          <Route path="gallery" element={<Influencers />} />
          <Route path="resorts" element={<Resorts />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="UserDetails" element={<UserHome />} />
          <Route
            path="/sign-in"
            element={isLoggedIn ? <Navigate to="/" replace={true} /> : <Login />}
          />
          <Route path="/ticket" element={<WaterparkTicket />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefundsAndCancellations />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Route>

        {isAdmin && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="add-waterpark" element={<AddWaterpark />} />
            <Route path="edit-waterpark" element={<EditWaterparkList />} />
            <Route path="/admin/edit-waterpark/:id" element={<EditWaterpark />} />
            <Route path="get-bookings" element={<GetBookings />} />
            <Route path="privacypolicy" element={<AddEditPrivacyPolicy />} />
            <Route path="termsconditions" element={<AddEditTermsConditions />} />
          </Route>
        )}
      </>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );

}

export default App

import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests
import { toast } from "react-toastify";

export default function AuthPage() {
  const [tabIndex, setTabIndex] = useState(0); // 0 = Login, 1 = Signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleTabChange = (index) => {
    setTabIndex(index);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      mobile:"",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth/${
      tabIndex === 0 ? "login" : "signup"
    }`;

    // Prepare data for submission
    const requestData = tabIndex === 0 ? 
      { email: formData.email, password: formData.password } :
      { name: formData.name, email: formData.email, password: formData.password,mobile:formData.mobile };

    try {
      const response = await axios.post(apiUrl, requestData);
      console.log("API response:", response.data); 
      if (response.data) {
        // Store necessary data in localStorage (e.g., token and user info)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token",response.data.token);
        // Redirect user to dashboard or home page after successful login/signup
        toast.success(tabIndex===0? "Login successful!":"Signup successful!");
        window.location.href = "/"; // Change this to your desired redirect path
      } else {
        // Handle failure (e.g., invalid credentials or validation errors)
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
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
    <div className={`flex min-h-screen items-center justify-center bg-white ${tabIndex === 0 ? "" : "pt-32"}`}>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-teal-500 text-5xl mb-2">
            <i className="fas fa-user-circle"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-700">Welcome Aboard!</h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-around mb-6 border-b">
          <button
            onClick={() => handleTabChange(0)}
            className={`w-1/2 py-2 text-lg font-semibold ${
              tabIndex === 0 ? "text-[#0156b3] border-b-2 border-[#0156b3]" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabChange(1)}
            className={`w-1/2 py-2 text-lg font-semibold ${
              tabIndex === 1 ? "text-[#0156b3] border-b-2 border-[#0156b3]" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name (Sign Up only) */}
          {tabIndex === 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pl-10 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}
          {tabIndex === 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="block w-full pl-10 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your Mobile Number"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-2 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Confirm Password (Sign Up only) */}
          {tabIndex === 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-2 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          )}

<p className="mt-4 text-sm text-center text-gray-500">
  <a href="/forgot-password" className="text-black underline">
    Forgot Password?
  </a>
</p>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-[#0156b3] hover:bg-teal-600 font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
          >
            {tabIndex === 0 ? "Login" : "Sign Up"}
          </button>
          
        </form>

        {/* Terms and Conditions (Sign Up only) */}
        {tabIndex === 1 && (
          <p className="mt-4 text-sm text-center text-gray-500 mb-24">
            By signing up, you agree to our{" "}
            <a href="/terms-and-conditions" className="text-teal-500 underline">
              Terms & Conditions
            </a>{" "}
            ,{" "}
            <a href="/privacy-policy" className="text-teal-500 underline">
              Privacy Policy
            </a> and {' '}
            <a href="/refund" className="text-teal-500 underline">
              Refund and Cancellations
            </a>.
          </p>
        )}
      </div>
    </div>
    </>
  );
}

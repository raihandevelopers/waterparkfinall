import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const apiUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth/forgot-password`;

    try {
      const response = await axios.post(apiUrl, { email });
      if (response.data.message === "Password reset email sent") {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(response.data.message || "Error sending reset link.");
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-teal-500 text-5xl mb-2">
            <i className="fas fa-lock"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-700">Forgot Password</h1>
          <p className="text-sm text-gray-500">
            Enter your registered email address to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="block w-full pl-3 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 text-white font-semibold rounded-lg shadow-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0156b3] hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-sm text-center text-gray-500">
          <a href="/sign-in" className="text-black underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}

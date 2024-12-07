import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false); // New state for tracking success
  const { token } = useParams(); // This will capture the token from the URL path

  useEffect(() => {
    // Log the token extracted from the URL
    console.log("Extracted token from URL:", token);
    
    if (!token) {
      toast.error("Invalid or expired link.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/reset-password`,
        {
          token: token, // Send the extracted token
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure it's JSON
          },
        }
      );

      // Log the response from the server
      console.log("Password reset response:", response.data);

      if (response.data.success) {
        toast.success("Password reset successful. You can now log in.");
        setResetSuccessful(true); // Set success to true after successful reset
      } else {
        toast.error(response.data.message || "Error resetting password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
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
          <h1 className="text-2xl font-bold text-gray-700">Reset Password</h1>
          <p className="text-sm text-gray-500">
            Enter your new password below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full pl-3 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your new password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full pl-3 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Confirm your new password"
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Redirect link after successful reset */}
        {resetSuccessful && (
          <div className="mt-4 text-center">
            <a
              href="/sign-in"
              className="text-teal-500 hover:text-teal-600 font-semibold"
            >
              Click here to log in.
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

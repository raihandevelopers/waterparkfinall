import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

function AddEditTermsConditions() {
  const [termsText, setTermsText] = useState(""); // Updated to match the payload key
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/terms`
        );
        if (response.data) {
          setTermsText(response.data.termsText); // Ensure this matches the response key
          setIsEdit(true);
        }
      } catch (error) {
        console.error("Error fetching terms and conditions", error);
      }
    };
    fetchTerms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${import.meta.env.VITE_SERVER_URL}/api/terms`;

      const payload = { termsText }; // Corrected payload structure

      const response = await axios.put(apiUrl, payload);
      setMessage(response.data.message || "Successfully updated Terms & Conditions!");
    } catch (error) {
      console.error("Error updating terms and conditions", error);
      setMessage("Failed to update Terms & Conditions");
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEdit ? "Edit Terms & Conditions" : "Add Terms & Conditions"}
        </h1>
      </header>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.toLowerCase().includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <section>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="termsText"
              className="block text-gray-700 mb-1 font-medium"
            >
              Terms & Conditions
            </label>
            {/* React Quill Editor */}
            <ReactQuill
              id="termsText"
              theme="snow"
              value={termsText}
              onChange={setTermsText}
              className="h-60"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 mt-16 rounded-lg hover:bg-indigo-700 transition"
            >
              {isEdit ? "Update Terms & Conditions" : "Add Terms & Conditions"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddEditTermsConditions;

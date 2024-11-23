import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

function AddEditPrivacyPolicy() {
  const [policyText, setPolicyText] = useState("");
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        console.log('Fetching Privacy Policy from:', `${import.meta.env.VITE_SERVER_URL}/api/privacy-policy`);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/privacy-policy`
        );
        if (response.data) {
          console.log('Fetched Privacy Policy:', response.data.policy);
          setPolicyText(response.data.policy);
          setIsEdit(true);
        }
      } catch (error) {
        console.error("Error fetching privacy policy", error);
      }
    };
    fetchPrivacyPolicy();
  }, []);
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting privacy policy:", policyText);
    try {
      let apiUrl;

      if (isEdit) {
        // Use PUT method for updating the policy
        apiUrl = `${import.meta.env.VITE_SERVER_URL}/api/privacy-policy`;
        console.log("Updating Privacy Policy with API URL:", apiUrl);
        const response = await axios.put(apiUrl, { policyText });
        console.log("Updated Privacy Policy Response:", response.data);
        setMessage(response.data.message);
      } else {
        // Use POST method for adding a new policy (optional if you have such an API)
        apiUrl = `${import.meta.env.VITE_SERVER_URL}/api/privacy-policy`;
        console.log("Adding Privacy Policy with API URL:", apiUrl);
        const response = await axios.post(apiUrl, { policyText });
        console.log("Added Privacy Policy Response:", response.data);
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting privacy policy:", error);
      setMessage("Failed to update privacy policy");
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEdit ? "Edit Privacy Policy" : "Add Privacy Policy"}
        </h1>
      </header>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <section>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="policyText"
              className="block text-gray-700 mb-1 font-medium"
            >
              Privacy Policy
            </label>
            <ReactQuill
              value={policyText}
              onChange={setPolicyText}
              theme="snow"
              modules={{
                toolbar: [
                  ["bold", "italic", "underline", "strike"],
                  [{ header: [1, 2, 3, false] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "code-block"],
                ],
              }}
              className="h-40"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 mt-14 rounded-lg hover:bg-indigo-700 transition"
            >
              {isEdit ? "Update Policy" : "Add Policy"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddEditPrivacyPolicy;

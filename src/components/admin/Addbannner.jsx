import React, { useState, useEffect } from "react";

function AddBanner() {
  const [bannerImage, setBannerImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [banners, setBanners] = useState([]);

  const getToken = () => localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!bannerImage) {
      setMessage("Please upload an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("bannerImage", bannerImage);

    try {
      const token = getToken();
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/banners/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Banner uploaded successfully!");
        setPreview(null);
        setBannerImage(null);
        fetchBanners(); // Refresh the banner list
      } else {
        setMessage(data.message || "Failed to upload banner.");
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const fetchBanners = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/banners`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && Array.isArray(data.banners)) {
        setBanners(data.banners); // Directly set the array
      } else {
        setMessage(data.message || "Failed to fetch banners.");
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setMessage("An error occurred while fetching banners.");
    }
  };

  const deleteBanner = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/banners/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Banner deleted successfully!");
        setBanners((prevBanners) => prevBanners.filter((banner) => banner._id !== id)); // Remove the deleted banner from the state
      } else {
        setMessage(data.message || "Failed to delete banner.");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      setMessage("An error occurred while deleting the banner.");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Banner</h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="bannerImage" className="block text-lg font-semibold">
            Upload Banner Image
          </label>
          <input
            type="file"
            id="bannerImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-indigo-700 font-medium">{message}</p>
      )}

      <h3 className="text-xl font-bold mt-6">Uploaded Banners</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {banners
          .filter((banner) => banner && banner.image) // Ensure the banner object exists and has an image
          .map((banner) => (
            <div key={banner._id} className="bg-gray-100 rounded-lg shadow overflow-hidden relative">
              <button
                onClick={() => deleteBanner(banner._id)}
                className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-400"
              >
                X
              </button>
              <img
                src={banner.image} // Safely use the image URL
                alt={`Banner ${banner._id}`}
                className="w-full h-full object-contain" // Ensure no cropping
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AddBanner;

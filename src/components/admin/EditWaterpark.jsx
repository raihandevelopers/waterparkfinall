import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditWaterpark = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    adultPrice: 0,
    childPrice: 0,
    discountPercentage: 0,
    advanceAmount: "",
    weekendPriceIncrease: "",
    map: "",
    images: [],
    included: [],
    excluded: [],
    faqs: [{ question: "", answer: "" }],
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/waterparks/${id}`)
      .then((response) => {
        setFormData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching waterpark:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const addItem = (field) => {
    if (field === "faqs") {
      setFormData({
        ...formData,
        faqs: [...formData.faqs, { question: "", answer: "" }],
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], ""],
      });
    }
  };


  const removeItem = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleFaqChange = (e, index, field) => {
    const { value } = e.target;
    const updatedFaqs = [...formData.faqs]; // Clone the current FAQs array
    updatedFaqs[index] = {
      ...updatedFaqs[index], // Ensure the object structure is preserved
      [field]: value,       // Update the specific field
    };
    setFormData({ ...formData, faqs: updatedFaqs }); // Update the state
  };


  // Handle image file change
  const handleImageChange = async (e) => {
    const files = e.target.files;
    const updatedImages = [...formData.images];

    // Loop through the files and upload each one
    Array.from(files).forEach(async (file) => {
      const fileURL = URL.createObjectURL(file); // Preview the image locally
      updatedImages.push(fileURL);

      // Prepare the form data for uploading
      const formData = new FormData();
      formData.append('image', file);
      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      try {
        // Send a request to the backend to upload the image
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/waterparks/${id}/add-image`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        });
        console.log(response)
        if (response.ok) {
          const result = await response.json();
          toast.success('Image uploaded successfully');
          console.log('Image uploaded successfully:', result);
        } else {
          toast.error('Failed to upload image');
          console.error('Failed to upload image:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    });

    // Update the local state
    setFormData({ ...formData, images: updatedImages });
  };

  // Remove image from the list
  const removeImage = async (index) => {
    const imageToRemove = formData.images[index];
    console.log(imageToRemove);
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/waterparks/${id}/delete-image`, // Replace with your actual delete image endpoint
        { imageUrl: imageToRemove },
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Since you're sending formData
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        });

      // Check if the status code is 200
      if (response.status === 200) {
        // Update the state after successful deletion
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: updatedImages });
        toast.success('Image removed successfully');
      } else {
        toast.error('Failed to remove image');
      }
    } catch (error) {
      toast.error('Failed to remove image');
      console.error("Error removing image:", error);
    }
  };


  const handleSubmit = (e) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    console.log("Form data:", formData.faqs);
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_SERVER_URL}/api/waterparks/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Since you're sending formData
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Waterpark updated successfully");
          toast.success("Waterpark updated successfully");
          navigate("/admin/edit-waterpark");
        }
      })
      .catch((error) => {
        toast.error("Error updating waterpark");
        console.error("Error updating waterpark:", error);
      });
  };
  const addFaq = () => {
    const newFaq = { question: "", answer: "" }; // Default structure for a new FAQ
    setFormData({
      ...formData,
      faqs: [...formData.faqs, newFaq], // Append the new FAQ object
    });
  };

  const removeFaq = (index) => {
    const updatedFaqs = formData.faqs.filter((_, i) => i !== index); // Exclude the item at `index`
    setFormData({ ...formData, faqs: updatedFaqs }); // Update the state
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Waterpark</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md p-6 rounded-lg"
      >
        {/* Name */}
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold">Adult Price</label>
          <input
            type="number"
            name="adultPrice"
            value={formData.adultPrice}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Child Price</label>
          <input
            type="number"
            name="childPrice"
            value={formData.childPrice}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Discount Price */}
        <div>
          <label className="block font-semibold">Discount Percentage</label>
          <input
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />

        </div>

        {/* Advance Amount */}
        <div>
          <label className="block font-semibold">Advance Amount</label>
          <input
            type="number"
            name="advanceAmount"
            value={formData.advanceAmount}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Weekend Price Increase */}
        <div>
          <label className="block font-semibold">Weekend Price Increase</label>
          <input
            type="number"
            name="weekendPriceIncrease"
            value={formData.weekendPriceIncrease}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Map URL */}
        <div>
          <label className="block font-semibold">Map URL</label>
          <input
            type="text"
            name="map"
            value={formData.map}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Images URL */}
        <div>
          <label className="block font-semibold">Images</label>
          <div className="flex flex-wrap gap-4">
            {/* Display existing images */}
            {formData.images && formData.images.length > 0 ? (
              formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Waterpark Image ${index + 1}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border w-full p-2 rounded mt-2"
          />
        </div>


        {/* Included */}
        <div>
          <label className="block font-semibold">Included</label>
          {formData.included.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                name="included"
                value={item}
                onChange={(e) => handleArrayChange(e, "included", index)}
                className="border w-full p-2 rounded"
                placeholder="Enter included item"
              />
              <button
                type="button"
                onClick={() => removeItem("included", index)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("included")}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Add Item
          </button>
        </div>

        {/* Excluded */}
        <div>
          <label className="block font-semibold">Excluded</label>
          {formData.excluded.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                name="excluded"
                value={item}
                onChange={(e) => handleArrayChange(e, "excluded", index)}
                className="border w-full p-2 rounded"
                placeholder="Enter excluded item"
              />
              <button
                type="button"
                onClick={() => removeItem("excluded", index)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("excluded")}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Add Item
          </button>
        </div>

        {/* FAQ */}
        <div>
          <label className="block font-semibold">FAQs</label>
          {formData.faqs.map((item, index) => (
            <div key={index} className="space-y-2 mb-4">
              {/* Question Input */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name={`question-${index}`}
                  value={item.question || ""} // Ensure it's always a string
                  onChange={(e) => handleFaqChange(e, index, "question")}
                  className="border w-full p-2 rounded"
                  placeholder="Enter question"
                />
              </div>

              {/* Answer Input */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name={`answer-${index}`}
                  value={item.answer || ""} // Ensure it's always a string
                  onChange={(e) => handleFaqChange(e, index, "answer")}
                  className="border w-full p-2 rounded"
                  placeholder="Enter answer"
                />
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Remove FAQ
              </button>
            </div>
          ))}

          {/* Add FAQ Button */}
          <button
            type="button"
            onClick={addFaq}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Add FAQ
          </button>
        </div>




        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Waterpark
        </button>
      </form>
    </div>
  );
};

export default EditWaterpark;
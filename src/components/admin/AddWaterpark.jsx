import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function AddWaterpark() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    map: "",
    adultPrice: "",
    childPrice: "",
    discountPercentage: "",
    advanceAmount: "",
    weekendPriceIncrease: "",
  });
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };
  const handleRemoveFaq = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index); // Remove the FAQ at the given index
    setFaqs(updatedFaqs);
  };
  const handleListChange = (list, setList, index, value) => {
    const updatedList = [...list];
    updatedList[index] = value;
    setList(updatedList);
  };

  const addToList = (list, setList) => {
    setList([...list, ""]);
  };

  const removeFromList = (list, setList, index) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleFileChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]); // Add new files to the existing list
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new FormData object on each submit to avoid leftover data
    const data = new FormData();
  
    // Append form data fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
  
    // Append other fields like faqs, included, and excluded
    data.append("faqs", JSON.stringify(faqs));
    data.append("included", JSON.stringify(included));
    data.append("excluded", JSON.stringify(excluded));
  
    // Append images (if any) only if present
    Array.from(images).forEach((image) => {
      data.append("images", image);
    });
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/waterparks/add-waterpark`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if(response.status == 201){
        toast.success(response.data.message);
      }
      console.log(response.data);
      // Reset form data to its initial state
      setFormData({
        name: "",
        description: "",
        location: "",
        map: "",
        adultPrice: "",
        childPrice: "",
        discountPercentage: "",
        advanceAmount: "",
        weekendPriceIncrease: "",
      });
      setFaqs([{ question: "", answer: "" }]); // Reset FAQs
      setIncluded([]); // Reset included
      setExcluded([]); // Reset excluded
      setImages([]); // Clear images array
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // Optionally, you can reset the FormData object too, but it will be recreated on next submit
    } catch (error) {
      console.error(error);
      toast.error("Failed to add waterpark");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  
  
  useEffect(() => {
    console.log(images)
  }, [images])
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Waterpark</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Description", name: "description", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Google Maps Link", name: "map", type: "text" },
          { label: "Adult Price", name: "adultPrice", type: "number" },
          { label: "Child Price", name: "childPrice", type: "number" },
          { label: "Discount Percentage", name: "discountPercentage", type: "number" },
          { label: "Advance Amount", name: "advanceAmount", type: "number" },
          {
            label: "Weekend Price Increase (%)",
            name: "weekendPriceIncrease",
            type: "number",
          },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
        ))}

        {[
          { label: "Included", list: included, setList: setIncluded },
          { label: "Excluded", list: excluded, setList: setExcluded },
        ].map(({ label, list, setList }) => (
          <div key={label}>
            <label className="block text-gray-700 mb-1">{label}</label>
            {list.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleListChange(list, setList, index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeFromList(list, setList, index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addToList(list, setList)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              + Add {label}
            </button>
          </div>
        ))}


        <div>
          <label className="block text-gray-700 mb-1">FAQs</label>
          {faqs.map((faq, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                placeholder="Question"
                value={faq.question}
                onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                className="w-1/2 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                className="w-1/2 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveFaq(index)} // Remove FAQ on button click
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
              >
                Remove
              </button>

            </div>

          ))}
          <button
            type="button"
            onClick={addFaq}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add FAQ
          </button>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Upload Images (Max: 10)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
          />
          <div className="mt-2">
            {images.map((image, index) => (
              <p key={index} className="text-sm text-gray-600">
                {image.name}
              </p>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Waterpark
        </button>
      </form>
    </div>
  );
}

export default AddWaterpark;

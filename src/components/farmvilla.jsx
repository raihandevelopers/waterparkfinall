import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const WaterParks = () => {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();

  const handleBookClick = (resort) => {
    navigate("/resorts", { state: { resort } }); // Passing resort data via state
  };

  useEffect(() => {
    const fetchWaterparks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/waterparks`);
        setParks(response.data.waterparks);
        console.log("Waterparks fetched:", response.data);
      } catch (error) {
        console.error("Error fetching waterparks:", error);
      } finally {
        setLoading(false); // Stop loading after data fetch
      }

    };

    fetchWaterparks();
  }, []);
  return (
    <>



      <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />
      <div className="min-h-screen bg-gray-100 p-6 my-12">
        {/* Page Heading */}
 {/* Hero Section */}
 <div className="relative bg-cover bg-center h-64 mb-6 flex items-center justify-center">
        <img
          src="breadcrumb.jpeg" // Replace with your image path
          alt="Water Park" // Add a relevant alt text
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4 text-white">Waterparks</h1>

        </div>
      </div>

        {loading ? (
          <div className="flex justify-center items-center h-80">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Water Parks Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-11">
            {parks.map((park, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md overflow-hidden bg-white"
              >
                <img
                  src={
                    park.images[0] ||
                    "https://newdemo.rreda.in/wp-content/uploads/2024/10/7-1.png"
                  }
                  alt={park.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between text-orange-500 mb-2">
                    <span className="text-sm font-medium">{park.duration}</span>
                  </div>
                  <h2 className="text-lg font-semibold">{park.name}</h2>
                  <p className="text-sm text-gray-600 my-2">{park.note}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-green-600">
                      ₹{park.adultPrice || park.discountedPrice || "N/A"}
</span>
{park.adultPrice && park.discountedPrice && (
  <span className="original-price" style={{ textDecoration: 'line-through', color: 'gray', marginLeft: '8px' }}>
    ₹{park.discountedPrice}
  </span>
)}

                    </div>
                    <button className="bg-blue-600 text-white py-1 px-3 rounded" onClick={() => handleBookClick(park)}>
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default WaterParks;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faWhatsapp, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

// Card Component
const Card = ({ resort }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate("/resorts", { state: { resort } }); // Passing resort data via state
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={resort.images[0] || "https://newdemo.rreda.in/wp-content/uploads/2024/11/manas-636x426.jpg"} alt={resort.name} />
      </div>
      <div className="card-content">
        <h3 className="font-semibold">{resort.name || "Unnamed Resort"}</h3>
        <p className="price">
          <div>
            <span className="current-price">
              ₹{resort.adultPrice || resort.discountedPrice || "N/A"}
            </span>
            {resort.adultPrice && resort.discountedPrice && (
              <span className="original-price" style={{ textDecoration: "line-through", color: "gray", marginLeft: "8px" }}>
                ₹{resort.discountedPrice}
              </span>
            )}
          </div>
          <button className="explore-button" onClick={handleBookClick}>
            Book
          </button>
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const [resorts, setResorts] = useState([]);
  const [banners, setBanners] = useState([]); // State to hold banners
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");


  // Fetching banners from the API
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

  useEffect(() => {
    fetchBanners();
  }, []);  

  // Fetching resorts
  useEffect(() => {
    const fetchResorts = async () => {
      setLoading(true); // Set loading to true before API call
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/waterparks`);
        setResorts(response.data.waterparks);
      } catch (error) {
        console.error("Error fetching waterparks:", error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    fetchResorts();
  }, []);

  // Auto-sliding functionality
  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 2500); // Change slide every 2 seconds

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [banners]);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? banners.length - 1 : currentIndex - 1;
    triggerAnimation(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === banners.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    triggerAnimation(newIndex);
  };

  const triggerAnimation = (newIndex) => {
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      setIsAnimating(false); // End animation after duration
      setCurrentIndex(newIndex);
    }, 500); // Match the animation duration in CSS
  };

  return (
    <div className="homepage">
      {/* WhatsApp Button */}
      <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />

<div className="carousel-container relative w-screen h-[500px] md:h-[535px] overflow-hidden">
  {/* Left Arrow */}
  <button
    className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white text-black rounded-full p-2"
    onClick={goToPrevious}
  >
    &#10094;
  </button>

  <div
    className="carousel-content flex w-full h-full transition-transform duration-500"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {banners.length > 0 ? (
      banners.map((banner, index) => (
        <div
          key={index}
          className="carousel-slide relative w-full h-full flex-shrink-0"
        >
          {/* Banner Image */}
          <img
            src={banner.image}
            alt={`Banner ${index}`}
            className="w-full h-full object-cover"
          />

        
        </div>
      ))
    ) : (
      <p className="w-full h-full flex items-center justify-center text-xl">
        No banners available
      </p>
    )}
  </div>

  {/* Right Arrow */}
  <button
    className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white text-black rounded-full p-2"
    onClick={goToNext}
  >
    &#10095;
  </button>
</div>




      <div className="homeinfo">
        <p className="homeinfop text-4xl">
          <b>Most Popular Tour</b> <br />
          <p className="font-normal text-[15px]">Your Ultimate Destination for Fun and Adventure!</p>
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="card-container">
          {resorts.map((resort, index) => (
            <Card key={index} resort={resort} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="foot">
        <div className="fbottomm">
          <a href="/" className="flex justify-center items-center">
            <div className="logo">
              <img src="logo.png" alt="Logo" className="max-w-none" />
            </div>
          </a>

          <div className="fbl">
            <p>© 2024 Water park chalo</p>
          </div>

          <div className="fbr">
            <a href="https://www.facebook.com/" className="text-sm hover:text-gray-300">
              <FontAwesomeIcon icon={faFacebook} size="xl" />
            </a>
            <a href="https://wa.me/9146869202" className="text-sm hover:text-gray-300">
              <FontAwesomeIcon icon={faWhatsapp} size="xl" />
            </a>
            <a href="https://instagram.com/waterpark_chalo" className="text-sm hover:text-gray-300">
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </a>
            <a href="https://www.youtube.com/@Waterparkchalo" className="text-sm hover:text-gray-300">
              <FontAwesomeIcon icon={faYoutube} size="xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

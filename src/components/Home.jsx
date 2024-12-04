import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faWhatsapp, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";


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
  <span className="original-price" style={{ textDecoration: 'line-through', color: 'gray', marginLeft: '8px' }}>
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
  const images = [
    'https://newdemo.rreda.in/wp-content/uploads/2024/11/post-1.jpg',
    'https://newdemo.rreda.in/wp-content/uploads/2024/11/post-2.jpg',
    'https://newdemo.rreda.in/wp-content/uploads/2024/11/post-1.jpg',
    'https://newdemo.rreda.in/wp-content/uploads/2024/11/post-2.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    triggerAnimation(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    triggerAnimation(newIndex);
  };

  // api calling
  useEffect(() => {
    const fetchWaterparks = async () => {
      setLoading(true); // Set loading to true before API call
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/waterparks`);
        setResorts(response.data.waterparks);
        console.log("Waterparks fetched:", response.data);
      } catch (error) {
        console.error("Error fetching waterparks:", error);
      }
      finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    fetchWaterparks();
  }, []);
  useEffect(() => {
    const interval = setInterval(goToNext, 2500);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentIndex]);
  const triggerAnimation = (newIndex) => {
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      setIsAnimating(false); // End animation after duration
      setCurrentIndex(newIndex);
    }, 500); // Match the animation duration in CSS
  };


  return (
    <div className="homepage">
      <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />
      <div className="carousel-card">
        <button className="carousel-button left" onClick={goToPrevious}>
          &#10094;
        </button>

        <div
          className={`carousel-image ${isAnimating ? "animate-slide" : ""}`}
        >
          <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
        </div>

        <button className="carousel-button right" onClick={goToNext}>
          &#10095;
        </button>
      </div>

      <div className="homeinfo">
        <p className="homeinfop text-4xl"><b>Most Popular Tour</b>  <br />
          <p className='font-normal text-[15px]'>Your Ultimate Destination for Fun and Adventure!</p>
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
            <a href="https://instagram.com/waterpark_chalo?igshid=OGQ5ZDc2ODk2ZA==" className="text-sm hover:text-gray-300">
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
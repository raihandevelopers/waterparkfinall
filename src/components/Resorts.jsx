import React, { useEffect, useState, useRef } from 'react';

import { Stack, Button, Typography, TextField, } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import Review from "./Review";
import { Dialog, DialogActions, DialogContent } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import axios from 'axios';
const Resorts = () => {
  const Navlocation = useLocation();
  const { resort } = Navlocation.state || {};
  const [fname, setFname] = useState("");
  const [pnum, setPnum] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adult, setadult] = useState("");
  const [child, setchild] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [minDate, setMinDate] = useState("");
  const [faqIndex, setFaqIndex] = useState(null);
  const [value, setValue] = useState(new Date());
  const dateInputRef = useRef(null); // Create a ref for the date input
  const [newReview, setNewReview] = useState({
    waterparkId: resort._id,
    name: '',
    email: '',
    review: '',
    rating: 0,
  });

  const [reviews, setReviews] = useState(resort?.reviews || []);

  if (!resort) {
    return <p>No resort data available.</p>;
  }

  const {
    name,
    description,
    location,
    included = [],
    excluded = [],
    map,
    faqs = [],
    reviewssection,
    images = [],
  } = resort;



  useEffect(() => {
    // Set today's date in YYYY-MM-DD format for the minimum selectable date
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);

    // Automatically focus the date input when the component mounts
    if (dateInputRef.current) {
      dateInputRef.current.focus();
    }
  }, []);



  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  const [pickup, setPickup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date for month navigation


  const adultPrice = resort.adultPrice | resort.price;
  const childPrice = resort.childPrice | resort.price;
  const dadultPrice = 100;
  const dchildPrice = 100;



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      const text = await response.text(); // Read response as text
      console.log(response); // Log the response body
      const result = JSON.parse(text); // Parse the response as JSON

      if (result.success) {
        alert('Review added successfully!');
        setReviews((prev) => [...prev, result.review]);
        setNewReview({ name: '', email: '', review: '', rating: 0 });
      } else {
        alert('Failed to add review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/reviews/${resort._id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
  
        console.log(response.data.reviews);
      // Check if the response indicates success
      if (response.data.success) {
        setReviews(response.data.reviews);
      } else {
        alert('Failed to fetch reviews.');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  
  useEffect(() => {
    getReviews()
  }, [])

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedAdultCount = localStorage.getItem('adultCount');
    const savedChildCount = localStorage.getItem('childCount');

    const savedPickup = localStorage.getItem('pickup') === 'true';


    // const savedSelectedDate = localStorage.getItem('selectedDate');

    if (savedAdultCount) setAdultCount(parseInt(savedAdultCount));
    if (savedChildCount) setChildCount(parseInt(savedChildCount));

    // if (savedSelectedDate) setSelectedDate(parseInt(savedSelectedDate));
    setPickup(savedPickup);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };




  const handleChildChange = (increment) => {
    setChildCount((prev) => Math.max(0, prev + increment));
  };



  const handleChange = (value) => {
    console.log(value);

    // Get the local date as "YYYY-MM-DD"
    const formattedDate = value.getFullYear() + '-'
      + String(value.getMonth() + 1).padStart(2, '0') + '-'
      + String(value.getDate()).padStart(2, '0');

    setValue(value); // Update state with the full date object
    setSelectedDate(formattedDate); // Store the formatted date as a string
    saveSelectedDateToLocalStorage(formattedDate); // Save the formatted date to localStorage
  };


  // Function to format the month and year (e.g., "October 2024")
  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Function to generate days for the current month
  const generateDaysOfMonth = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysArray = [];
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);
      daysArray.push({
        day: i,
        isPast: day < new Date(),
      });
    }
    return daysArray;
  };
  // Function to retrieve the selected date from localStorage
  const retrieveSelectedDate = () => {
    const storedDate = localStorage.getItem('selectedDate');
    if (storedDate) {
      setSelectedDate(new Date(storedDate));  // Set the stored date in state
    }
  };

  // Save selected date to localStorage
  const saveSelectedDateToLocalStorage = (date) => {
    localStorage.setItem('selectedDate', date);  // Save the date to localStorage
  };


  const [days, setDays] = useState(generateDaysOfMonth(currentDate));  // Use generateDaysOfMonth


  // Calculate discounted prices
  const discountedAdultPrice = resort.discountPercentage > 0
    ? adultPrice - (adultPrice * resort.discountPercentage) / 100
    : adultPrice;

  const discountedChildPrice = resort.discountPercentage > 0
    ? childPrice - (childPrice * resort.discountPercentage) / 100
    : childPrice;

  // Calculate subtotal using discounted prices if applicable
  const subtotal = adultCount * discountedAdultPrice + childCount * discountedChildPrice;

  // Total remains the same as subtotal for now
  const total = subtotal;

  // Calculate the total advance amount
  const dtotal = adultCount * resort.advanceAmount + childCount * resort.advanceAmount;


  // Update localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('adultCount', adultCount);
    localStorage.setItem('childCount', childCount);
    localStorage.setItem('total', dtotal);
    localStorage.setItem('pickup', pickup);
    // retrieveSelectedDate();
  }, [adultCount, childCount, pickup, selectedDate, dtotal]);


  const handleAdultChange = (increment) => {
    setAdultCount((prev) => Math.max(0, prev + increment));
  };


  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const [activeTab, setActiveTab] = useState('Description');


  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 2500); // 2500ms = 2.5 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex]); // Re-run the effect if currentIndex changes

  const handleCheckout = () => {
    if (adultCount === 0 && childCount === 0) {
      toast.error('Please select at least one adult or child.');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    const data = {
      adultCount: adultCount,
      childCount: childCount,
      date: selectedDate,
      resortName: resort.name,
      subtotal: subtotal,
      deposit: pickup ? dtotal + 100 : dtotal,
      resortId: resort._id,
    };

    navigate('/checkout', { state: data });
  };

  return (
    <>      <img
      src="whatsapp.png"
      alt="WhatsApp Logo"
      className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
      onClick={() => window.open("https://wa.me/918847714464", "_blank")}
    />
      <div style={{ overflowx: 'hidden' }}>
        <div className="carousel-card">
          <button className="carousel-button left" onClick={goToPrevious}>
            &#10094;
          </button>

          <div className="csl-image">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
          </div>

          <button className="carousel-button right" onClick={goToNext}>
            &#10095;
          </button>

          <div className="carousel-indicators">
            {images.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        <div className="container">
          <h1 className="resort-title">{resort?.name}</h1>
          <p className="resort-location">{resort?.location}</p>

          <div className="tabs">
            {['Description', 'Included/Excluded', 'Reviews', 'FAQ', 'Map'].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Description Tab */}
          {activeTab === 'Description' && (
            <div className="attractions-list2">
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: resort?.description }}
              />
              {/* Adult Price */}
              {resort?.adultPrice && (
                <p>
                  <strong>Adult Price:</strong>{' '}
                  {resort?.discountPercentage > 0 ? (
                    <>
                      <span className="">
                        ₹{(resort.adultPrice - (resort.adultPrice * resort.discountPercentage) / 100).toFixed(2)}
                      </span> {' '}
                      <span className="line-through text-gray-500">
                        ₹{resort.adultPrice}
                      </span>{' '}
                    </>
                  ) : (
                    <>₹{resort.adultPrice}</>
                  )}
                </p>
              )}

              {/* Child Price */}
              {resort?.childPrice && (
                <p>
                  <strong>Child Price:</strong>{' '}
                  {resort?.discountPercentage > 0 ? (
                    <>
                      <span>
                        ₹{(resort.childPrice - (resort.childPrice * resort.discountPercentage) / 100).toFixed(2)}
                      </span> {' '}
                      <span className="line-through text-gray-500">
                        ₹{resort.childPrice}
                      </span>{' '}
                    </>
                  ) : (
                    <>₹{resort.childPrice}</>
                  )}
                </p>
              )}

              <p>
                <strong>Advance Amount:</strong> ₹{resort?.advanceAmount}
              </p>
              <p>
                <strong>Weekend Price Increase:</strong> {resort?.weekendPriceIncrease}%
              </p>
            </div>
          )}

          {/* Included/Excluded Tab */}
          {activeTab === 'Included/Excluded' && (
            <div className="attractions-list">
              <div>
                <h2>Included:</h2>
                {resort?.included?.length > 0 ? (
                  resort.included.map((item, index) => (
                    <div key={index} className="attraction-item">
                      <span className="checkmark">✔️</span> {item}
                    </div>
                  ))
                ) : (
                  <p>No included items listed.</p>
                )}
              </div>
              <div>
                <h2>Excluded:</h2>
                {resort?.excluded?.length > 0 ? (
                  resort.excluded.map((item, index) => (
                    <div key={index} className="attraction-item">
                      <span className="checkmark">❌</span> {item}
                    </div>
                  ))
                ) : (
                  <p>No excluded items listed.</p>
                )}
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'FAQ' && (
            <div className="faq-list space-y-4">
              {resort?.faqs?.length > 0 ? (
                resort.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="faq-item border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                  >
                    <div className="flex justify-between items-center cursor-pointer"
                      onClick={() => setFaqIndex(faqIndex === index ? null : index)}>
                      <span className="font-medium text-gray-800 flex gap-2">
                        {faq.question}
                      </span>
                      <span
                        className={`transition-transform ${faqIndex === index ? 'rotate-180' : ''
                          }`}
                      >
                        ▼
                      </span>
                    </div>
                    {faqIndex === index && (
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No FAQs available.</p>
              )}
            </div>
          )}


          {activeTab === 'Reviews' && (
            <div className="faq-list space-y-4">
              {reviews?.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="review-item border border-gray-200 rounded-lg p-4 shadow-sm bg-white mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{review.name}</span>
                      <div className="flex items-center text-yellow-500">
                        {/* Dynamically render stars */}
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{review.review}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No reviews available.</p>
              )}

              <h3 className="text-lg font-bold mt-8">Add a Review</h3>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block font-medium">Your Rating *</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        onClick={() => handleRatingChange(star)} // Dynamically update rating
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-medium">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newReview.name}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={newReview.email}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Your Review *</label>
                  <textarea
                    name="review"
                    value={newReview.review}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    placeholder="Write your review here"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            </div>
          )}



          {/* Map Tab */}
          {activeTab === 'Map' && (
            <div className="attractions-list">
              {resort?.map ? (
                <div>
                  <iframe
                    src={resort.map}
                    className=" w-200px h-[200px] lg:h-[400px] lg:w-[450px]"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              ) : (
                <p>No map location available.</p>
              )}
            </div>
          )}
        </div>

        <div className="booking-container py-3">
          <h2>Select Booking Date</h2>
          <div className="flex justify-center">
            <Calendar onChange={handleChange} value={value} minDate={new Date()} />
          </div>




          <div className="ticket-selector">
            <div className="ticket">
              <span>Adult (Above 8 yr)</span>
              <span>₹{adultPrice}</span>
              <button onClick={() => handleAdultChange(-1)}>-</button>
              <span>{adultCount}</span>
              <button onClick={() => handleAdultChange(1)}>+</button>
            </div>
            <div className="ticket">
              <span>Children (3 to 8 yr)</span>
              <span>₹{childPrice}</span>
              <button onClick={() => handleChildChange(-1)}>-</button>
              <span>{childCount}</span>
              <button onClick={() => handleChildChange(1)}>+</button>
            </div>
          </div>

          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-item">
              <span>Selected Date:</span>
              <span>{selectedDate ? new Date(selectedDate).toDateString() : 'Not Selected'}</span>
            </div>
            <div className="summary-item">
              <span>Adult ({adultCount})</span>
              <span>₹{adultCount * discountedAdultPrice}</span>
            </div>
            <div className="summary-item">
              <span>Child ({childCount})</span>
              <span>₹{childCount * discountedChildPrice}</span>
            </div>
            <div className="summary-item">
              <strong>Subtotal:</strong>
              <strong>₹{subtotal}</strong>
            </div>
            {/* <div className="summary-item">
              <span>Pickup & Drop</span>
              <span>₹{pickup ? 100 : 0}</span>
            </div> */}
            <div className="summary-item total">
              <strong>Total Amt.:</strong>
              <strong>₹{total}</strong>
            </div>
            <div className="summary-item total">
              <strong>Total downpayment:</strong>
              <strong>₹{pickup ? dtotal + 100 : dtotal}</strong>
            </div>
          </div>


          {/* <div className="pickup-option">
            <input
              type='checkbox'
              checked={pickup}
              onChange={() => setPickup(!pickup)}
            />
            <label>Pickup & Drop Service 100rs per Person</label>
          </div>
 */}





          <button onClick={handleCheckout} // Navigate to /checkout
            className='px-4 py-2 w-full rounded-xl bg-[#0156b3] text-white font-semibold my-10'>Continue Booking</button>
        </div>


      </div>
    </>
  );
};

export default Resorts;
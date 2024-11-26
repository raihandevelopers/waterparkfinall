import React, { useEffect, useState,useRef } from 'react';

import { Stack, Button, Typography, TextField, } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import Review from "./Review";
import { Dialog, DialogActions, DialogContent } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Resorts = () => {
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
  
  const dateInputRef = useRef(null); // Create a ref for the date input

  const Navlocation = useLocation();
  const { resort } = Navlocation.state || {};

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
    reviews,
    images = [],
  } = resort;
  console.log(resort)

  
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

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedAdultCount = localStorage.getItem('adultCount');
    const savedChildCount = localStorage.getItem('childCount');

    const savedPickup = localStorage.getItem('pickup') === 'true';
    const savedSelectedDate = localStorage.getItem('selectedDate');

    if (savedAdultCount) setAdultCount(parseInt(savedAdultCount));
    if (savedChildCount) setChildCount(parseInt(savedChildCount));

    if (savedSelectedDate) setSelectedDate(parseInt(savedSelectedDate));
    setPickup(savedPickup);
  }, []);



  const handleChildChange = (increment) => {
    setChildCount((prev) => Math.max(0, prev + increment));
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

  const handleDateSelect = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  
    // Clear the previous selected date if a new date is selected
    if (selectedDate && selectedDate.getTime() === newDate.getTime()) {
      return; // Prevent updating if the selected date is clicked again
    }
  
    setSelectedDate(newDate);  // Update the selected date state
    saveSelectedDateToLocalStorage(newDate);  // Save it to localStorage
  };
  
  // Functions for month navigation
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    setDays(generateDaysOfMonth(newDate));  // Update days when changing months
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    setDays(generateDaysOfMonth(newDate));  // Update days when changing months
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
    retrieveSelectedDate();
  }, [adultCount, childCount, pickup, selectedDate, dtotal]);

  useEffect(() => {
    if (selectedDate) {
      // Clear the previous selection in localStorage if a new date is selected
      localStorage.setItem('selectedDate', selectedDate.toISOString());
    }
  }, [selectedDate]);
  

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
    if (!date) {
      toast.error('Please select a date');
      return;
    }
    const data = {
      adultCount: adultCount,
      childCount: childCount,
      date: date,
      resortName: resort.name,
      subtotal: subtotal,
      deposit: pickup ? dtotal + 50 : dtotal,
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
              {resort?.reviews?.length > 0 ? (
                resort.reviews.map((faq, index) => (
                  <div
                    key={index}
                    className="faq-item border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                  >
                    <div className="flex justify-between items-center cursor-pointer"
                      onClick={() => setFaqIndex(reviews === index ? null : index)}>
                      <span className="font-medium text-gray-800 flex gap-2">
                        {reviews.question}
                      </span>
                      <span
                        className={`transition-transform ${reviews === index ? 'rotate-180' : ''
                          }`}
                      >
                        ▼
                      </span>
                    </div>
                    {reviews === index && (
                      <p className="mt-2 text-gray-600">{reviews.answer}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No reviews available.</p>
              )}
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
      
      {/* Month Navigation */}
      <div className="month-navigation flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="text-lg font-bold">←</button>
        <h3 className="text-xl">{formatMonthYear(currentDate)}</h3>
        <button onClick={goToNextMonth} className="text-lg font-bold">→</button>
      </div>

      <div className="calendar grid grid-cols-7 gap-2">
        {days.map(({ day, isPast }, index) => (
          <div
            key={index}
            className={`calendar-day ${selectedDate && selectedDate.getDate() === day ? 'selected' : ''} ${isPast ? 'text-gray-400 cursor-not-allowed' : ''}`}
            onClick={() => !isPast && handleDateSelect(day)} // Disable past date selection
          >
            {day}
          </div>
        ))}
      </div>
{/* <div className="flex flex-col items-center space-y-4">
      <label htmlFor="date" className="text-sm text-gray-700">Select Date:</label>
      <div className="relative w-full max-w-xs">
        <input
          id="date"
          type="date"
          value={date}
          min={minDate}
          onChange={(e) => setDate(e.target.value)}
          ref={dateInputRef} // Assign the ref to the date input
          className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!date ? 'text-gray-400' : 'text-black'}`}
        />
        {!date && (
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none sm:hidden">
            dd/mm/yyyy
          </span>
        )}
      </div>
      </div> */}




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
            <div className="summary-item">
              <span>Pickup & Drop</span>
              <span>₹{pickup ? 50 : 0}</span>
            </div>
            <div className="summary-item total">
              <strong>Total Amt.:</strong>
              <strong>₹{total}</strong>
            </div>
            <div className="summary-item total">
              <strong>Total downpayment:</strong>
              <strong>₹{pickup ? dtotal + 50 : dtotal}</strong>
            </div>
          </div>

          <div className="pickup-option text-left">
  <p>Pickup and Drop Service - ₹100 per person</p>
</div>




       
          <button onClick={handleCheckout} // Navigate to /checkout
            className='px-4 py-2 w-full rounded-xl bg-[#0156b3] text-white font-semibold my-10'>Continue Booking</button>
        </div>


      </div>
    </>
  );
};

export default Resorts;
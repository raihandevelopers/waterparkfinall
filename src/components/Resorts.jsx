import React, { useEffect, useState } from 'react';

import { Stack, Button, Typography, TextField, } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

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
    images = [],
  } = resort;
  console.log(resort)

  useEffect(() => {
    // Set today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);


  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  const [pickup, setPickup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleDateSelect = (day) => {
    setSelectedDate(day);
  };

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
    if (selectedDate) localStorage.setItem('selectedDate', selectedDate);
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
              <p className="w-full">{resort?.description}</p>
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
          {/* <div className="calendar">
        {[...Array(30)].map((_, i) => {
          const day = i + 1;
          const isSelected = selectedDate === day;
          return (
            <div
              key={i}
              className={`calendar-day ${isSelected ? 'selected' : ''}`}
              onClick={() => handleDateSelect(day)}
            >
              {day}
            </div>
          );
        })}
      </div> */}

          <div className="flex flex-col items-center space-y-4">
            <label htmlFor="date" className="text-sm text-gray-700">Select Date:</label>
            <div className="relative w-full max-w-xs">
              <input
                id="date"
                type="date"
                value={date}
                min={minDate}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!date ? 'text-gray-400' : 'text-black'
                  }`}
              />
              {!date && (
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none sm:hidden">
                  dd/mm/yyyy
                </span>
              )}
            </div>
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
              <span>{date ? new Date(date).toDateString() : 'Not Selected'}</span>
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

          <div className="pickup-option">
            <input
              type="checkbox"
              checked={pickup}
              onChange={() => setPickup(!pickup)}
            />
            <label>Pickup & Drop Service</label>
          </div>



          {/* <div >
          <Stack sx={{ width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center', height: "100dvh", background: "white", height: "fit-content", marginTop: "20px", marginBottom: "50px" }}>
            <Stack sx={{ display: "flex", flexDirection: "row", width: { xs: '100%', sm: '85%', md: '80%' }, height: { xs: "fit-content", sm: "90dvh", md: '90dvh' }, borderRadius: '8px', border: { xs: "2px solid white", sm: "none" }, zIndex: "0" }}>
              <form onSubmit={handleSubmit} style={{ width: '100%', padding: '1.5rem', height: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '8px', zIndex: '200' }}>
                <Typography variant="h3" sx={{ color: 'black', fontWeight: 'bolder', fontFamily: 'Poppins, sans-serif', borderBottom: '4px solid black', paddingBottom: '0.25rem', borderRadius: '2px' }}>Sign Up</Typography>
                <Stack sx={{ width: '100%' }}>
                  <TextField
                    required
                    label="Full Name"
                    name="full name"
                    type="text"

                    placeholder="Enter full name"
                    onChange={(e) => setFname(e.target.value)}
                    InputLabelProps={{ sx: { color: "black", fontSize: { xs: "1.5rem", md: "16px" } } }}
                    sx={{
                      '& .MuiInputBase-input': { color: 'black', fontSize: { xs: "1.5rem", md: "16px" } },
                      '& .MuiInput-underline:before': { borderBottomColor: 'black' },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#00CED1' },
                    }}
                    variant="standard"
                  />
                </Stack>

                <Stack sx={{ width: '100%' }}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{ sx: { color: "black", fontSize: { xs: "1.5rem", md: "16px" } } }}
                    sx={{
                      '& .MuiInputBase-input': { color: 'black', fontSize: { xs: "1.5rem", md: "16px" } },
                      '& .MuiInput-underline:before': { borderBottomColor: 'black' },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#00CED1' },
                      '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                    }}
                    variant="standard"
                  />
                </Stack>

                <Stack gap={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Phone Number"
                    name="Phno"
                    type="number"
                    placeholder="Enter Phone number"
                    onChange={(e) => setPnum(e.target.value)}
                    InputLabelProps={{ sx: { color: "black", fontSize: { xs: "1.5rem", md: "16px" } } }}
                    sx={{
                      '& .MuiInputBase-input': { color: 'black', fontSize: { xs: "1.5rem", md: "16px" } },
                      '& .MuiInput-underline:before': { borderBottomColor: 'black' },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#00CED1' },
                      '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                    }}
                    variant="standard"
                  />
                </Stack>

                <Stack sx={{ width: '100%' }}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{ sx: { color: "black", fontSize: { xs: "1.5rem", md: "16px" } } }}
                    sx={{
                      '& .MuiInputBase-input': { color: 'black', fontSize: { xs: "1.5rem", md: "16px" } },
                      '& .MuiInput-underline:before': { borderBottomColor: 'black' },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#00CED1' },
                      '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                    }}
                    variant="standard"
                  />
                </Stack>
                <Stack sx={{ width: '100%' }}>
                  <Button
                    variant="contained"
                    sx={{
                      background: "#00CED1",
                      color: 'black',
                      padding: '8px 0px',
                      borderRadius: '.75rem',
                      fontSize: { xs: "1.15rem", md: "16px" },
                      '&:hover': {
                        transform: "scale(1.001)",
                        background: 'white',
                        color: "#00ced1",
                        fontWeight: "500",
                        border: ".125rem solid #00ced1",
                      },
                    }}
                    type="submit"
                  >
                    Sign Up and Book
                  </Button>

                </Stack>
                <Typography sx={{ color: 'black', textAlign: 'center' }}>
                  Returning Customer? <NavLink to="/sign-in" style={{ color: '#00CED1' }}>Sign in</NavLink>
                </Typography>
              </form>
            </Stack>
          </Stack>


        </div> */}
          <button onClick={handleCheckout} // Navigate to /checkout
            className='px-4 py-2 w-full rounded-xl bg-[#0156b3] text-white font-semibold my-10'>Continue Booking</button>
        </div>


      </div>
    </>
  );
};

export default Resorts;
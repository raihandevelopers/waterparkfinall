import React, { useState } from "react";

const Review = ({ reviews = [], onAddReview }) => {
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddReview = () => {
    if (!newReview.trim() || rating === 0) {
      alert("Please add a review and select a rating.");
      return;
    }
    const review = {
      text: newReview,
      rating,
      date: new Date().toLocaleDateString(),
    };
    onAddReview(review);
    setNewReview("");
    setRating(0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Reviews</h3>

      {/* Existing Reviews */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700">{review.text}</p>
              <small className="text-gray-500">{review.date}</small>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Add Review Form */}
      <div className="mt-6">
        <h4 className="text-lg font-medium mb-2 text-gray-800">Add Your Review</h4>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`cursor-pointer h-6 w-6 ${
                i < rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(i + 1)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
          rows="4"
          placeholder="Write your review here..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          onClick={handleAddReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Review;

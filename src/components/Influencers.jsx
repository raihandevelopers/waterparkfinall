import React, { useState } from "react";

const Influencers = () => {
  const images = [
    "1 (1).png",
    "1 (2).png",
    "1 (3).png",
    "1 (4).png",
    "1 (5).png",
    "1 (6).png",
    "1 (7).png",
    "1 (8).png",
    "1 (9).png",
    "1 (10).png",
    "1 (11).png",
    "1 (12).png",
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Close the modal if clicked outside
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-background") {
      closeModal();
    }
  };

  return (
    <>
          <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />
    <div className="p-4 bg-gray-100 my-24">
      <h1 className="text-2xl font-bold text-center mb-6">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => openModal(image)}
          >
            <img
              src={`/gallery/${image}`}
              alt={`Gallery ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Modal to view the image in full */}
      {selectedImage && (
        <div
          id="modal-background"
          className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 pt-32"
          onClick={handleOutsideClick}
        >
          <div className="relative bg-white p-4 rounded-lg max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-white text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={`/gallery/${selectedImage}`}
              alt="Enlarged view"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
    </>

  );
};

export default Influencers;

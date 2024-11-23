import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faWhatsapp, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const TopBar = () => {
  return (
    <div className="bg-[#3179AF] text-white">
      <div className=" mx-auto flex justify-between items-center px-4 py-2">
        <div className="flex items-center space-x-6">

          {/* Email */}
          <a
            href="mailto:wpc@waterparkchalo.com"
            className="hidden md:flex items-center space-x-2 text-sm hover:underline"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>wpc@waterparkchalo.com</span>

          </a>
          {/* Phone */}
          <a
            href="tel:+918847714464"
            className="flex items-center space-x-2 text-sm hover:underline"
          >
            <FontAwesomeIcon icon={faPhone} />
            <span>+91 8847714464</span>

          </a>
          {/* Location */}
          <span className="hidden md:flex items-center space-x-2 text-sm">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>Alkapuri</span>
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 p-2">
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
  );
};

export default TopBar;

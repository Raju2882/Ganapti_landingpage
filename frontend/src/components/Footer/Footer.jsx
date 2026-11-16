
import "./Footer.css";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";

export default function Footer() {
  const handleEnquiryClick = () => {
    window.dispatchEvent(new Event("open-enquiry-modal"));
  };

  return (
    <footer className="footer" id="contact">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          {/* Add your logo here if available */}
          <h3>Ashraya Estates</h3>

          <p className="footer-description">
            Discover premium residential plots and find the perfect
            place to build your dream home with Ashraya Estates.
          </p>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <a href="https://www.facebook.com/profile.php?id=61574974296271" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>

          <a href="https://www.instagram.com/ashraya_estates/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>

          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>

        <div className="footer-line"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Ashraya Estates. All Rights Reserved.</p>
          <p className="footer-tagline">
            Your Dream Plot. Your Future Investment.
          </p>
        </div>

      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="footer-action-bar">

        <a href="tel:++91 7541014101" className="action-btn call-btn">
          <FaPhoneAlt />
          Call Now
        </a>

        

        <button
          type="button"
          className="action-btn enquire-btn"
          onClick={handleEnquiryClick}
        >
          Enquire Now
        </button>

      </div>

    </footer>
  );
}


import "./Footer.css";
import logo from "../../assets/images/logo.png";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhoneAlt,
  FaRegEdit
} from "react-icons/fa";

export default function Footer() {
  const phoneNumber = "919876543210"; // Replace with your actual number

  return (
    <footer className="footer">

      <div className="container-custom footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <img
            src={logo}
            alt="Ashraya Estates Logo"
            className="footer-logo"
          />

          <h3>Ashraya Estates</h3>

          <p className="footer-description">
            Discover thoughtfully planned residential layouts
            and build your future with confidence.
          </p>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <a href="https://facebook.com/"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Facebook">
            <FaFacebookF />
          </a>

          <a href="https://instagram.com/"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Instagram">
            <FaInstagram />
          </a>

          <a href="https://linkedin.com/"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>

          <a href={`https://wa.me/${phoneNumber}`}
             target="_blank"
             rel="noopener noreferrer"
             aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
        </div>

        {/* Footer Divider */}
        <div className="footer-line"></div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Ashraya Estates.
            All Rights Reserved.
          </p>

          <p className="footer-tagline">
            Designed for Better Living
          </p>
        </div>

      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="footer-action-bar">

        <a
          href={`tel:+${phoneNumber}`}
          className="action-btn call-btn"
        >
          <FaPhoneAlt />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn whatsapp-btn"
        >
          <FaWhatsapp />
          <span>WhatsApp</span>
        </a>

        <a
          href="#enquiry"
          className="action-btn enquire-btn"
        >
          <FaRegEdit />
          <span>Enquire</span>
        </a>

      </div>

    </footer>
  );
}

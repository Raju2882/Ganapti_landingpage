
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYouModal.css";

import {
    FaCheck,
    FaTimes,
    FaDownload,
    FaWhatsapp
} from "react-icons/fa";

const ThankYouModal = ({ onClose }) => {

    const whatsappNumber = "91XXXXXXXXXX";
    const navigate = useNavigate();

    // Meta Pixel Lead Tracking
    useEffect(() => {

        if (window.fbq) {
            window.fbq("track", "Lead");

            console.log("Meta Pixel: Lead Event Fired");

        } else {
            console.error("Meta Pixel is not initialized!");
        }

    }, []);

    return (
        <div className="thankyou-overlay">

            <div className="thankyou-modal">

                {/* Close Button */}
                <button
                    type="button"
                    className="thankyou-close"
                    onClick={() => navigate("/")}
                    aria-label="Back to Home"
                >
                    <FaTimes />
                </button>

                {/* Success Icon */}
                <div className="success-icon">
                    <FaCheck />
                </div>

                {/* Thank You Message */}
                <h2>Submission Successful!</h2>

                <h4>
                    Thank You for Connecting with Ashraya Estates
                </h4>

                <p>
                    Our property experts will get in touch with you
                    shortly to guide you on your journey to finding
                    your dream plot.
                </p>

                {/* Download Brochure */}
                <a
                    href="/brochure.pdf"
                    download
                    className="brochure-btn"
                >
                    <FaDownload />
                    Download Brochure PDF
                </a>

                {/* WhatsApp Button */}
                <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-btn"
                >
                    <FaWhatsapp />
                    Live Chat On WhatsApp
                </a>

            </div>

        </div>
    );
};

export default ThankYouModal;

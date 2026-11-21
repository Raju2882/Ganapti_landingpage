
import "./Contact.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaEnvelope,
  FaArrowRight
} from "react-icons/fa";

export default function Contact() {
  return (
  <section id="contact">
    <section className="contact-section" id="contact">

      <div className="contact-container">

        {/* LEFT CONTENT */}

        <div className="contact-left">

          <span className="contact-label">
            GET IN TOUCH
          </span>

          <h2>
            Let's Start a
            <br />
            <span>Conversation.</span>
          </h2>

          <p className="contact-intro">
            Looking for your dream property or planning your next
            investment? Our team is here to guide you every step
            of the way.
          </p>

          <div className="contact-grid">

            {/* ADDRESS */}

            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h4>Visit Our Office</h4>
                <p>
                  12, M P M Employees Layout, Kengunte,
                  Annapurneshwari Nagar,
                  Bengaluru, Karnataka 560056
                </p>
                <a
                  href="https://www.google.com/maps?q=13.292,77.543"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions <FaArrowRight />
                </a>
              </div>
            </div>

            {/* PHONE */}

            <div className="contact-item">
              <div className="contact-icon">
                <FaPhoneAlt />
              </div>

              <div>
                <h4>Call Us</h4>
                <p>+91 7541014101</p>
                <a href="tel:+917541014101">
                  Call Now <FaArrowRight />
                </a>
              </div>
            </div>

            {/* EMAIL */}

            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>

              <div>
                <h4>Email Us</h4>
                <p>info@ashrayaestates.com</p>
                <a href="mailto:info@ashrayaestates.com">
                  Send Email <FaArrowRight />
                </a>
              </div>
            </div>

            {/* HOURS */}

            <div className="contact-item">
              <div className="contact-icon">
                <FaClock />
              </div>

              <div>
                <h4>Office Hours</h4>
                <p>
                  Wednesday – Monday
                  <br />
                  10:00 AM – 6:30 PM
                </p>
              </div>
            </div>

          </div>

          {/* BOTTOM CTA */}

          <div className="contact-bottom">
            <p>Have questions about our properties?</p>

            <a href="tel:+91 7541014101">
              Connect With Us <FaArrowRight />
            </a>
          </div>

        </div>

        {/* RIGHT MAP */}

        <div className="contact-right">

          <div className="map-wrapper">

            <iframe
              title="Ashraya Estates Location"
              src="https://www.google.com/maps?q=13.292,77.543&z=14&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="map-info">
              <div className="map-info-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span>FIND US HERE</span>
                <h4>Ashraya Estates</h4>
                <p>Bengaluru, Karnataka</p>
              </div>

              <a
                href="https://maps.app.goo.gl/fqLXM7iNoxEzUEZ26?g_st=iw"
                target="_blank"
                rel="noreferrer"
              >
                <FaArrowRight />
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
    </section>
  );
}

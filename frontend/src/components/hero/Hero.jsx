
import "./Hero.css";
import heroImage from "../../assets/images/hero.png";

import {
    FaArrowDown,
    FaShieldAlt,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaTree,
    FaPhoneAlt
} from "react-icons/fa";

export default function Hero() {
    return (
        <section className="hero" id="home">

            {/* Background Image */}
            <div className="hero-bg">
                <img
                    src={heroImage}
                    alt="Ashraya Aarika Premium Residential Plots"
                />
            </div>

            {/* Dark Overlay */}
            <div className="hero-overlay"></div>

            {/* Main Content */}
            <div className="hero-container">

                <div className="hero-layout">

                    {/* LEFT CONTENT */}
                    <div className="hero-content">

                        <span className="hero-badge">
                            Welcome to Ashraya Aarika
                        </span>

                        <h1 className="hero-title">
                            Premium Plots
                            <br />
                            <span>In Doddaballapur</span>
                        </h1>

                       

                        {/* Project Highlights */}
                        <div className="hero-highlights">

                            <div className="hero-highlight">
                                <FaShieldAlt />
                                <span>BMRDA Approved</span>
                            </div>

                            <div className="hero-highlight">
                                <FaCheckCircle />
                                <span>Gated Community</span>
                            </div>

                            <div className="hero-highlight">
                                <FaMapMarkerAlt />
                                <span>Prime Location</span>
                            </div>

                            <div className="hero-highlight">
                                <FaTree />
                                <span>Green Living</span>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="hero-buttons">

                            <a href="#contact" className="btn-primary">
                                Download Brochure
                            </a>

                            

                        </div>

                        {/* Bottom Message */}
                        <div className="hero-bottom-message">
                            <span className="hero-dot"></span>
                            Your Dream Plot. Your Future Investment.
                        </div>

                    </div>

                    {/* RIGHT ENQUIRY FORM */}
                    <div className="hero-form-card" id="hero-enquiry">

                        <h2>
                            Connect With Our
                            <br />
                            Property Experts
                        </h2>

                        <p className="form-subtitle">
                            Get complete project details and site visit assistance.
                        </p>

                        <div className="hero-form-fields">

                            <input
                                type="text"
                                placeholder="Full Name *"
                                aria-label="Full Name"
                                required
                            />

                            <input
                                type="email"
                                placeholder="Email Address *"
                                aria-label="Email Address"
                                required
                            />

                            <input
                                type="tel"
                                placeholder="Contact Number *"
                                aria-label="Contact Number"
                                required
                            />

                            <select
                                defaultValue=""
                                aria-label="Select State"
                                required
                            >
                                <option value="" disabled>
                                    Select State *
                                </option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Other">Other</option>
                            </select>

                            <select
                                defaultValue=""
                                aria-label="Select City"
                                required
                            >
                                <option value="" disabled>
                                    Select City / District *
                                </option>
                                <option value="Bengaluru">
                                    Bengaluru
                                </option>
                                <option value="Doddaballapur">
                                    Doddaballapur
                                </option>
                                <option value="Yelahanka">
                                    Yelahanka
                                </option>
                                <option value="Devanahalli">
                                    Devanahalli
                                </option>
                                <option value="Other">
                                    Other
                                </option>
                            </select>

                        </div>

                        {/* Consent */}
                        <label className="hero-consent">
                            <input type="checkbox" defaultChecked required />

                            <span>
                                I authorize Ashraya Aarika and its associates
                                to contact me via Email, SMS, WhatsApp and
                                Voice Call.
                            </span>
                        </label>

                        {/* Submit / Contact CTA */}
                        <a
                            href="#contact"
                            className="hero-form-submit"
                        >
                            <FaPhoneAlt />
                            Book My Free Site Visit
                        </a>

                        <p className="hero-form-note">
                            Our property consultant will assist you shortly.
                        </p>

                    </div>

                </div>

                {/* STATISTICS BAR */}
                <div className="hero-stats">

                    <div className="hero-stat">
                        <h3>BMRDA</h3>
                        <p>Approved Layout</p>
                    </div>

                    <div className="hero-stat">
                        <h3>100%</h3>
                        <p>Gated Community</p>
                    </div>

                    <div className="hero-stat">
                        <h3>North</h3>
                        <p>Bangalore Location</p>
                    </div>

                    <div className="hero-stat">
                        <h3>Premium</h3>
                        <p>Residential Plots</p>
                    </div>

                </div>

            </div>

            {/* Scroll Indicator */}
            <a href="#about" className="scroll-down">
                <FaArrowDown />
            </a>

        </section>
    );
}

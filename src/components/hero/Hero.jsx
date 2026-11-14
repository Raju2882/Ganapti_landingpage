
import "./Hero.css";
import { useState, useEffect } from "react";
import heroImage from "../../assets/images/hero.jpeg";

import {
    FaArrowDown,
    FaShieldAlt,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaTree,
    FaPhoneAlt
} from "react-icons/fa";

import EnquiryModal from "../EnquiryModal/EnquiryModal";

export default function Hero() {
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const openEnquiry = () => setOpenModal(true);

        window.addEventListener("open-enquiry-modal", openEnquiry);

        return () => {
            window.removeEventListener("open-enquiry-modal", openEnquiry);
        };
    }, []);

    return (
        <section className="hero" id="home">

            <div className="hero-bg">
                <img
                    src={heroImage}
                    alt="Ashraya Aarika Premium Residential Plots"
                />
            </div>

            <div className="hero-overlay"></div>

            <div className="hero-container">

                <div className="hero-layout">

                    <div className="hero-content">

                        <span className="hero-badge">
                            Welcome to Ashraya Aarika
                        </span>

                        <h1 className="hero-title">
                            Premium Plots
                            <br />
                            <span>In Doddaballapur</span>
                        </h1>

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

                        <div className="hero-buttons">
                            <a href="https://ashrayaestates.com/wp-content/uploads/2025/12/Ashraya-Aarika-E-Brochure.pdf" className="btn-primary">
                                Download Brochure
                            </a>
                        </div>

                        <div className="hero-bottom-message">
                            <span className="hero-dot"></span>
                            Your Dream Plot. Your Future Investment.
                        </div>

                    </div>

                    <div className="hero-form-card">

                        <h2>
                            Interested in Our Premium Plots?
                        </h2>

                        <p className="form-subtitle">
                            Get complete project details and site visit assistance.
                        </p>

                        <button
                            type="button"
                            className="hero-form-submit"
                            onClick={() => setOpenModal(true)}
                        >
                            <FaPhoneAlt />
                            Enquire Now
                        </button>

                        <p className="hero-form-note">
                            Our property consultant will assist you shortly.
                        </p>

                    </div>

                </div>

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

                <a href="#about" className="scroll-down">
                    <FaArrowDown />
                </a>

            </div>

            {openModal && (
                <EnquiryModal onClose={() => setOpenModal(false)} />
            )}

        </section>
    );
}


import "./EnquiryModal.css";

import {
    FaTimes,
    FaPhoneAlt,
    FaCheck,
    FaDownload,
    FaWhatsapp
} from "react-icons/fa";

import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const GOOGLE_SHEET_URL =
    "https://docs.google.com/spreadsheets/d/1Ta36V18wWqZ8U0xAPkvGkvUoKjbPMY6Zjf1bkCRRAwI/edit?pli=1&gid=0#gid=0";

export default function EnquiryModal({ onClose }) {

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        state: "",
        city: "",
        project: "",
        budget: "",
        callingSlot: "",
        authorization: false
    });

    const brochureUrl =
        "https://ashrayaestates.com/wp-content/uploads/2025/12/Ashraya-Aarika-E-Brochure.pdf";

    const whatsappUrl = "https://wa.me/919964910330";

    // HANDLE FORM INPUTS
    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };

    // SUBMIT ENQUIRY
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.authorization) {
            alert("Please accept the authorization.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!API_URL) {
            alert("Backend URL is not configured.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(`${API_URL}/api/leads/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const responseText = await response.text();

            console.log("Backend status:", response.status);
            console.log("Backend response:", responseText);

            let data;

            try {
                data = JSON.parse(responseText);
            } catch (error) {
                throw new Error(
                    `Backend returned an empty or invalid response. Status: ${response.status}`
                );
            }
            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to save enquiry."
                );
            }
            console.log("Lead created:", data.leadId);

            // SHOW SUCCESS SCREEN
            setSubmitted(true);

            

        } catch (error) {

            console.error("Enquiry submission error:", error);

            alert(
                error.message ||
                "Unable to submit enquiry. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="enquiry-overlay"
            onClick={onClose}
        >

            <div
                className={`enquiry-modal ${submitted ? "success-modal" : ""
                    }`}
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <FaTimes />
                </button>

                {!submitted ? (

                    <div className="hero-form-card popup-hero-form">

                        <h2>
                            Connect With Our Property Experts
                        </h2>

                        <p className="form-subtitle">
                            Get complete project details and site visit assistance.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="hero-form-fields">

                                {/* NAME */}

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                                {/* EMAIL */}

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                {/* PHONE - NO OTP */}

                                <div className="phone-input-wrapper">
                                    <span className="country-code">+91</span>

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter 10-digit mobile number"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const value = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 10);

                                            setFormData((prev) => ({
                                                ...prev,
                                                phone: value
                                            }));
                                        }}
                                        maxLength={10}
                                        inputMode="numeric"
                                        required
                                    />
                                </div>
                                {/* BUDGET */}

                                <select
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select Your Budget *
                                    </option>

                                    <option value="INR 45 Lakhs">
                                        INR 45 Lakhs
                                    </option>

                                    <option value="INR 56 Lakhs">
                                        INR 56 Lakhs
                                    </option>

                                    <option value="INR 65 to 75 Lakhs">
                                        INR 65 to 75 Lakhs
                                    </option>

                                    <option value="Above 75 Lakhs">
                                        Above 75 Lakhs
                                    </option>

                                </select>

                                {/* SITE VISIT */}

                                <select
                                    name="callingSlot"
                                    value={formData.callingSlot}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Preferred Site Visit? *
                                    </option>

                                    <option value="Immediately">
                                        Immediately
                                    </option>

                                    <option value="This Weekend">
                                        This Weekend
                                    </option>

                                    <option value="Next Weekend">
                                        Next Weekend
                                    </option>

                                    <option value="Planning for Later">
                                        Planning for Later
                                    </option>

                                </select>

                            </div>

                            {/* AUTHORIZATION */}

                            <div className="hero-form-authorization">

                                <label>

                                    <input
                                        type="checkbox"
                                        name="authorization"
                                        checked={formData.authorization}
                                        onChange={handleChange}
                                        required
                                    />

                                    <span>
                                        I authorize Ashraya Estates and its representatives
                                        to contact me with updates and notifications via
                                        Email, SMS, WhatsApp or Call. This will override DND/NDNC.
                                    </span>

                                </label>

                            </div>

                            {/* SUBMIT BUTTON */}

                            <button
                                type="submit"
                                className="hero-form-submit"
                                disabled={loading}
                            >

                                <FaPhoneAlt />

                                {loading
                                    ? "Submitting..."
                                    : "Book My Free Site Visit"}

                            </button>

                        </form>

                        <p className="hero-form-note">
                            Our property consultant will assist you shortly.
                        </p>

                    </div>

                ) : (

                    /* SUCCESS SCREEN */

                    <div className="enquiry-success">

                        <div className="success-check">
                            <FaCheck />
                        </div>

                        <h2>Submission Successful!</h2>

                        <h3>
                            Thank You for Connecting with Ashraya Estates
                        </h3>

                        <p>
                            Our property experts will get in touch with you
                            shortly to guide you on your journey to finding
                            your dream plot.
                        </p>

                     

                        <a
                            href={brochureUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="success-download"
                        >
                            <FaDownload />
                            Download Brochure PDF
                        </a>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="success-whatsapp"
                        >
                            <FaWhatsapp />
                            Live Chat On WhatsApp
                        </a>

                    </div>

                )}

            </div>

        </div>

    );

}

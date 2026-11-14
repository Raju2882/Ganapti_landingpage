
import "./EnquiryModal.css";
import { FaTimes, FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";

export default function EnquiryModal({ onClose }) {
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Enquiry submitted:", formData);

        alert("Thank you! Our property consultant will contact you shortly.");

        onClose();
    };

    return (
        <div className="enquiry-overlay" onClick={onClose}>
            <div
                className="enquiry-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close enquiry form"
                >
                    <FaTimes />
                </button>

                <div className="hero-form-card popup-hero-form">

                    <h2>
                        Connect With Our Property Experts
                    </h2>

                    <p className="form-subtitle">
                        Get complete project details and site visit assistance.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="hero-form-fields">

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name *"
                                aria-label="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address *"
                                aria-label="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Contact Number *"
                                aria-label="Contact Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            


                           

                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Your Budget *</option>
                                <option value="28-40 Lakhs">INR 45 Lakhs</option>
                                <option value="41-70 Lakhs">INR 56 Lakhs</option>
                                <option value="71 Lakhs-1 Cr">INR 65 to 75 Lacks</option>
                                <option value="71 Lakhs-1 Cr">INR  Above 75 Lacks</option>

            
                            </select>

                            <select
                                name="callingSlot"
                                value={formData.callingSlot}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Preferred Site Visit? *</option>
                                <option value="- Immediately">
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

                        <button
                            type="submit"
                            className="hero-form-submit"
                        >
                            <FaPhoneAlt />
                            Book My Free Site Visit
                        </button>

                    </form>

                    <p className="hero-form-note">
                        Our property consultant will assist you shortly.
                    </p>

                </div>
            </div>
        </div>
    );
}


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
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select State *</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Other">Other</option>
                            </select>

                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select City / District *</option>
                                <option value="Bengaluru">Bengaluru</option>
                                <option value="Doddaballapur">Doddaballapur</option>
                                <option value="Yelahanka">Yelahanka</option>
                                <option value="Devanahalli">Devanahalli</option>
                                <option value="Other">Other</option>
                            </select>

                            <select
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Project Interested In *</option>
                                <option value="Abhivruddhi">Abhivruddhi</option>
                                <option value="Samruddhi">Samruddhi</option>
                                <option value="Unnati">Unnati</option>
                                <option value="Maamara">Maamara</option>
                                <option value="Eco Habitat">Eco Habitat</option>
                                <option value="Sambhrambha">Sambhrambha</option>
                            </select>

                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Your Budget *</option>
                                <option value="28-40 Lakhs">INR 28 to 40 Lakhs</option>
                                <option value="41-70 Lakhs">INR 41 to 70 Lakhs</option>
                                <option value="71 Lakhs-1 Cr">INR 71 Lakhs to 1 Cr</option>
                                <option value="1 Cr+">INR 1 Cr+</option>
                            </select>

                            <select
                                name="callingSlot"
                                value={formData.callingSlot}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Preferred Calling Slot *</option>
                                <option value="As Soon As Possible">
                                    As Soon As Possible
                                </option>
                                <option value="Morning">
                                    Morning (10 AM to 1 PM)
                                </option>
                                <option value="Afternoon">
                                    Afternoon (1 PM to 4 PM)
                                </option>
                                <option value="Evening">
                                    Evening (4 PM to 7 PM)
                                </option>
                                <option value="Late Evening">
                                    Late Evening (Post 7 PM)
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


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

export default function EnquiryModal({ onClose }) {
    const [submitted, setSubmitted] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpMessage, setOtpMessage] = useState("");
    const [otpMessageType, setOtpMessageType] = useState("info");

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

        if (name === "phone") {
            setVerified(false);
            setOtpSent(false);
            setOtp("");
            setOtpMessage("");
        }
    };

    // SEND OTP
    const handleSendOTP = async () => {
        if (!API_URL) {
            setOtpMessage("Backend URL is not configured.");
            setOtpMessageType("error");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            setOtpMessage("Enter a valid 10-digit mobile number.");
            setOtpMessageType("error");
            return;
        }

        try {
            setLoading(true);
            setOtpMessage("");
            setOtp("");

            const response = await fetch(`${API_URL}/api/otp/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone: formData.phone
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Unable to generate OTP.");
            }

            setOtpSent(true);

            if (data.testOtp) {
                setOtpMessage(
                    `Your development OTP is: ${data.testOtp}`
                );
                setOtpMessageType("success");
            } else {
                setOtpMessage(
                    data.message || "OTP generated successfully."
                );
                setOtpMessageType("info");
            }

        } catch (error) {
            setOtpMessage(error.message || "Unable to send OTP.");
            setOtpMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    // VERIFY OTP
    const handleVerifyOTP = async () => {
        if (!API_URL) {
            setOtpMessage("Backend URL is not configured.");
            setOtpMessageType("error");
            return;
        }

        if (!/^\d{6}$/.test(otp)) {
            setOtpMessage("Please enter a valid 6-digit OTP.");
            setOtpMessageType("error");
            return;
        }

        try {
            setLoading(true);
            setOtpMessage("");

            const response = await fetch(`${API_URL}/api/otp/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone: formData.phone,
                    otp: otp
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "OTP verification failed."
                );
            }

            setVerified(true);
            setOtpMessage("Mobile number verified successfully!");
            setOtpMessageType("success");

        } catch (error) {
            setVerified(false);
            setOtpMessage(error.message || "OTP verification failed.");
            setOtpMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    // SUBMIT ENQUIRY
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!verified) {
            setOtpMessage("Please verify your mobile number first.");
            setOtpMessageType("error");
            return;
        }

        if (!formData.authorization) {
            alert("Please accept the authorization.");
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

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to save enquiry."
                );
            }

            console.log("Lead created:", data.leadId);

            setSubmitted(true);

        } catch (error) {
            console.error("Enquiry submission error:", error);
            alert(error.message || "Unable to submit enquiry. Please try again.");
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
                className={`enquiry-modal ${
                    submitted ? "success-modal" : ""
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

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                {/* PHONE AND OTP SECTION */}

                                <div>

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Contact Number *"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        maxLength={10}
                                        required
                                        disabled={verified}
                                        style={{ width: "100%" }}
                                    />

                                    {!verified && (
                                        <button
                                            type="button"
                                            onClick={handleSendOTP}
                                            disabled={loading}
                                            style={{
                                                marginTop: "8px",
                                                padding: "9px 15px",
                                                cursor: loading
                                                    ? "not-allowed"
                                                    : "pointer"
                                            }}
                                        >
                                            {loading
                                                ? "Please wait..."
                                                : otpSent
                                                    ? "Resend OTP"
                                                    : "Send OTP"}
                                        </button>
                                    )}

                                    {otpSent && !verified && (
                                        <div style={{ marginTop: "10px" }}>

                                            <input
                                                type="text"
                                                placeholder="Enter 6-digit OTP"
                                                value={otp}
                                                onChange={(e) =>
                                                    setOtp(
                                                        e.target.value
                                                            .replace(/\D/g, "")
                                                            .slice(0, 6)
                                                    )
                                                }
                                                maxLength={6}
                                                inputMode="numeric"
                                                style={{ width: "100%" }}
                                            />

                                            <button
                                                type="button"
                                                onClick={handleVerifyOTP}
                                                disabled={loading}
                                                style={{
                                                    marginTop: "8px",
                                                    padding: "9px 15px",
                                                    cursor: loading
                                                        ? "not-allowed"
                                                        : "pointer"
                                                }}
                                            >
                                                {loading
                                                    ? "Verifying..."
                                                    : "Verify OTP"}
                                            </button>

                                        </div>
                                    )}

                                    {otpMessage && (
                                        <p
                                            style={{
                                                marginTop: "10px",
                                                fontSize: "13px",
                                                color:
                                                    otpMessageType === "success"
                                                        ? "green"
                                                        : otpMessageType === "error"
                                                            ? "red"
                                                            : "#294b91"
                                            }}
                                        >
                                            {verified && <FaCheck />}{" "}
                                            {otpMessage}
                                        </p>
                                    )}

                                    {verified && (
                                        <p
                                            style={{
                                                color: "green",
                                                marginTop: "8px"
                                            }}
                                        >
                                            <FaCheck /> Mobile number verified
                                        </p>
                                    )}

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
                                disabled={!verified || loading}
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

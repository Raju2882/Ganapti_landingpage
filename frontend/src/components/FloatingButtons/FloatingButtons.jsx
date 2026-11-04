
import "./FloatingButtons.css";
import { useEffect, useState } from "react";

export default function FloatingButtons() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > window.innerHeight - 100);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleEnquiryClick = () => {
        window.dispatchEvent(new Event("open-enquiry-modal"));
    };

    return (
        <div className={`floating-contact ${show ? "show" : ""}`}>
            <button
                type="button"
                className="floating-enquiry"
                onClick={handleEnquiryClick}
            >
                <span>ENQUIRE NOW</span>
            </button>
        </div>
    );
}

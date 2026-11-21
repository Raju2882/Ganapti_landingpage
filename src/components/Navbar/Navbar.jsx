
import "./Navbar.css";
import { useState, useEffect } from "react";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (event, sectionId) => {
    event.preventDefault();

    const section = document.getElementById(sectionId);

    setMenuOpen(false);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Pime Location", id: "PrimeLocation" },
    { label:"ProjectHighlights",id:"ProjectHigh"},
    { label: "Amenities", id: "amenities" },

    
    { label: "Contact", id: "contact" },

  ];

  return (
    <header className={`navbar ${sticky ? "sticky" : ""}`}>
      <div className="container-custom">
        <div className="navbar-wrapper">

          {/* Logo */}
          <a
            href="#home"
            className="logo"
            onClick={(e) => handleNavigation(e, "home")}
          >
            <img src={logo} alt="Ganapti Logo" />
          </a>

          {/* Center */}
          <div className="navbar-center"></div>

          {/* Right */}
          <div className="navbar-right">

            <a href="tel:+91 7541014101" className="phone-box">
              <div className="phone-icon">
                <FaPhoneAlt />
              </div>

              <div>
                <small>Call Us</small>
<<<<<<< HEAD
                <h4>+91 99649 10330</h4>
=======

                <h4>+91 75410 14101</h4>

>>>>>>> 450f4b3978a797059e69b91a714ba8e200b37da8
              </div>
            </a>

            {/* Menu Button */}
            <button
              type="button"
              className="menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`mobile-menu ${menuOpen ? "active" : ""}`}
        aria-hidden={!menuOpen}
      >
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavigation(e, item.id)}
            tabIndex={menuOpen ? 0 : -1}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

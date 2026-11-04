
import "./LocationCards.css";

import {
  FaPlaneDeparture,
  FaIndustry,
  FaMicrochip,
  FaRocket,
  FaCity,
  FaHeartbeat,
} from "react-icons/fa";

const locations = [
  {
    icon: <FaPlaneDeparture />,
    title: "Bangalore Airport",
    subtitle: "25-minute drive away",
    color: "card-green",
  },
  {
    icon: <FaIndustry />,
    title: "KIADB Industrial Area",
    subtitle: "Close proximity to major industrial hubs",
    color: "card-peach",
  },
  {
    icon: <FaMicrochip />,
    title: "Foxconn & Tech Parks",
    subtitle: "Asia's Largest Apple Manufacturing Ecosystem",
    color: "card-yellow",
  },
  {
    icon: <FaRocket />,
    title: "Aerospace Park",
    subtitle: "1,000 acres Hardware Park",
    color: "card-pink",
  },
  {
    icon: <FaCity />,
    title: "KWIN City",
    subtitle: "₹40,000 Crore Project",
    color: "card-lightgreen",
  },
  {
    icon: <FaHeartbeat />,
    title: "Premium Healthcare",
    subtitle: "Near Manipal & Seven Hills Hospital",
    color: "card-purple",
  },
];

export default function LocationCards() {
  return (
    <section className="location-cards" id="locations">

      <div className="location-container">

        {/* Section Heading */}
        <div className="location-heading">
          <h2>Why Choose Ashraya Aarika?</h2>
          <p>
            Experience the advantage of a prime location
            with excellent connectivity and future growth.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="cards-grid">

          {locations.map((item, index) => (

            <div
              className={`location-card ${item.color}`}
              key={index}
            >

              <div className="location-card-header">

                <div className="card-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

              </div>

              <p>{item.subtitle}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

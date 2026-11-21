
import "./Amenities.css";

import parkTree from "../../assets/images/park-tree.jpeg";
import gateIcon from "../../assets/images/gate.jpeg";

import {
    FaTree,
    FaChild,
    FaVideo,
    FaBolt,
    FaTint,
    FaRoad,
    FaShieldAlt,
    FaUsers
} from "react-icons/fa";

export default function Amenities() {

    const amenities = [
        {
            icon: <FaTree />,
            title: "Landscaped Gardens",
            desc: "Enjoy beautifully maintained green spaces, peaceful surroundings and a refreshing natural environment.",
            color: "amenity-green"
        },
        {
            icon: (
                <img src={gateIcon} alt="Gated Community"
                    className="custom-card-icon" />
            ),
            title: "Gated Community",
            desc: "Experience secure community living with controlled entry and dedicated security arrangements.",
            color: "amenity-peach"
        },
        {
            icon: (
                <img src={parkTree} alt="Park and Tree"
                    className="custom-card-icon" />
            ),
            title: "Park And Tree",
            desc: "Relax and enjoy open spaces surrounded by greenery, landscaped parks and beautiful trees.",
            color: "amenity-yellow"
        },
        {
            icon: <FaChild />,
            title: "Children's Play Area",
            desc: "Dedicated recreational spaces where children can play, explore and enjoy outdoor activities.",
            color: "amenity-pink"
        },
        {
            icon: <FaVideo />,
            title: "24×7 CCTV",
            desc: "Round-the-clock CCTV surveillance to support a safer and more secure residential environment.",
            color: "amenity-lightgreen"
        },
        {
            icon: <FaBolt />,
            title: "Electricity Supply",
            desc: "Reliable electricity infrastructure designed to support everyday residential requirements.",
            color: "amenity-purple"
        },
        {
            icon: <FaTint />,
            title: "Water Supply",
            desc: "Convenient water supply infrastructure for comfortable everyday living.",
            color: "amenity-green"
        },
        {
            icon: <FaRoad />,
            title: "Internal Roads",
            desc: "Well-planned internal roads providing convenient movement throughout the community.",
            color: "amenity-peach"
        }
    ];

    return (
    <section id="amenities">
        <section className="amenities" id="amenities">

            <div className="amenities-container">

                {/* Heading */}

                <div className="amenities-heading">

                    <h2>Modern Amenities</h2>

                </div>

                {/* Cards */}

                <div className="amenities-grid">

                    {amenities.map((item, index) => (

                        <div
                            className={`amenity-card ${item.color}`}
                            key={index}
                        >

                            <div className="amenity-card-header">

                                <div className="amenity-icon">
                                    {item.icon}
                                </div>

                                <h3>{item.title}</h3>

                            </div>

                            <p>{item.desc}</p>

                        </div>

                    ))}

                </div>

            </div>

      </section>
        </section>
    );
}

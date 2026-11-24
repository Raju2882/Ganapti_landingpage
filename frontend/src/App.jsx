
import Hero from './components/hero/Hero';
import Navabar from './components/Navbar/Navbar';
import PrimeLocation from "./components/PrimeLocation/PrimeLocation";
import LocationCards from "./components/LocationCards/LocationCards";
import Connectivity from './components/Connectivity/Connectivity';
import Amenities from './components/Amenities/Amenities';
import Lifestyle from './components/Lifestyle/Lifestyle';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import FloatingButtons from "./components/FloatingButtons/FloatingButtons";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThankYouPage from "./components/ThankYouModal";

function HomePage() {
    return (
        <>
            <Navabar />
            <Hero />
            <FloatingButtons />
            <PrimeLocation />
            <LocationCards />
            <Connectivity />
            <Amenities />
            <Lifestyle />
            <Contact />
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* EXISTING LANDING PAGE */}
                <Route path="/" element={<HomePage />} />

                {/* THANK YOU PAGE */}
                <Route path="/thankyou" element={<ThankYouPage />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ganapti-landingpage-xa7f.vercel.app",
    "https://ganapti-frontend.vercel.app"
];

// CORS configuration
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Parse JSON
app.use(express.json());

// Leads API
app.use("/api/leads", require("./routes/leadRoutes"));

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Ashraya Estates Backend Running"
    });
});

// Export for Vercel
module.exports = app;

// Local development
if (require.main === module) {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ashraya-backend.vercel.app",
    "https://www.ashrayaestates.in",
    "https://ashrayaestates.in"
];

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("Blocked CORS origin:", origin);
            callback(null, false);
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

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


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Leads API - OTP not required
app.use("/api/leads", require("./routes/leadRoutes"));

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Ashraya Estates Backend Running"
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

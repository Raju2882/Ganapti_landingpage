
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ganapti-frontend.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.options("*", cors());


app.use(express.json());

app.use("/api/leads", require("./routes/leadRoutes"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Ashraya Estates Backend Running"
    });
});

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

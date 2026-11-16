
const express = require("express");

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            budget,
            callingSlot
        } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !budget || !callingSlot) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required details."
            });
        }

        // Validate phone number
        if (!/^[6-9]\d{9}$/.test(String(phone))) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid 10-digit mobile number."
            });
        }

        const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

        if (!scriptUrl) {
            return res.status(500).json({
                success: false,
                message: "Google Sheets URL is not configured."
            });
        }

        // Send enquiry to Google Sheets
        const googleResponse = await fetch(scriptUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                budget,
                callingSlot
            })
        });

        const responseText = await googleResponse.text();

        let result;

        try {
            result = JSON.parse(responseText);
        } catch {
            throw new Error(
                "Google Sheets returned an invalid response."
            );
        }

        if (!googleResponse.ok || !result.success) {
            throw new Error(
                result.message || "Failed to save enquiry in Google Sheets."
            );
        }

        console.log("Google Sheet enquiry saved:", name);

        return res.status(201).json({
            success: true,
            message: "Enquiry saved successfully in Google Sheets!",
            leadId: result.leadId
        });

    } catch (error) {
        console.error("Google Sheets Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Unable to save enquiry."
        });
    }
});

module.exports = router;

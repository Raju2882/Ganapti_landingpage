
const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const { sendLeadToMeta } = require("../services/metaConversions");

router.post("/add", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            state,
            city,
            project,
            budget,
            callingSlot,
            authorization
        } = req.body;

        // Validate required fields
        if (
            !name ||
            !email ||
            !phone ||
            !budget ||
            !callingSlot ||
            !authorization
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required details."
            });
        }

        // Validate phone
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

        // STEP 1: Save enquiry to Google Sheets
        const googleResponse = await fetch(scriptUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                state,
                city,
                project,
                budget,
                callingSlot,
                authorization
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
                result.message || "Failed to save enquiry."
            );
        }

        console.log("Enquiry saved:", name);

        // STEP 2: Send Lead event to Meta CAPI
        try {
            const eventId = crypto.randomUUID();

            const metaResult = await sendLeadToMeta({
                email,
                phone,
                eventId
            });

            console.log("Meta Lead event sent:", metaResult);

        } catch (metaError) {
            // Do not fail enquiry if Meta is unavailable
            console.error(
                "Meta CAPI Error:",
                metaError.message
            );
        }

        // STEP 3: Return success to frontend
        return res.status(201).json({
            success: true,
            message: "Enquiry saved successfully!",
            leadId: result.leadId
        });

    } catch (error) {
        console.error("Lead submission error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Unable to save enquiry."
        });
    }
});

module.exports = router;

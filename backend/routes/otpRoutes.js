
const express = require("express");
const crypto = require("crypto");

const router = express.Router();

// Temporary storage for development only
const otpStore = new Map();

// SEND OTP
router.post("/send", (req, res) => {
    if (process.env.NODE_ENV !== "development") {
        return res.status(403).json({
            success: false,
            message: "Development OTP is disabled."
        });
    }

    const { phone } = req.body;

    if (!/^[6-9]\d{9}$/.test(phone || "")) {
        return res.status(400).json({
            success: false,
            message: "Enter a valid 10-digit mobile number."
        });
    }

    const existing = otpStore.get(phone);

    if (existing && Date.now() - existing.sentAt < 30000) {
        return res.status(429).json({
            success: false,
            message: "Please wait 30 seconds before requesting another OTP."
        });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    otpStore.set(phone, {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000,
        sentAt: Date.now(),
        attempts: 0
    });

    // Development testing only: OTP is not sent by SMS
    console.log(`Development OTP for ${phone}: ${otp}`);

    res.json({
        success: true,
        message: "Test OTP generated. No SMS was sent.",
        testOtp: otp
    });
});

// VERIFY OTP
router.post("/verify", (req, res) => {
    const { phone, otp } = req.body;

    if (!/^[6-9]\d{9}$/.test(phone || "") || !/^\d{6}$/.test(otp || "")) {
        return res.status(400).json({
            success: false,
            message: "Invalid phone number or OTP."
        });
    }

    const record = otpStore.get(phone);

    if (!record) {
        return res.status(400).json({
            success: false,
            message: "Please request an OTP first."
        });
    }

    if (Date.now() > record.expiresAt) {
        otpStore.delete(phone);

        return res.status(400).json({
            success: false,
            message: "OTP expired. Please request a new one."
        });
    }

    if (record.attempts >= 5) {
        otpStore.delete(phone);

        return res.status(429).json({
            success: false,
            message: "Too many attempts. Request a new OTP."
        });
    }

    record.attempts++;

    if (record.otp !== otp) {
        return res.status(400).json({
            success: false,
            message: "Incorrect OTP."
        });
    }

    otpStore.delete(phone);

    res.json({
        success: true,
        message: "Mobile number verified successfully."
    });
});

module.exports = router;

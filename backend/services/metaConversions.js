
const crypto = require("crypto");

const hash = (value) => {
    return crypto
        .createHash("sha256")
        .update(value)
        .digest("hex");
};

const normalizeEmail = (email) => {
    return String(email || "").trim().toLowerCase();
};

const normalizePhone = (phone) => {
    let number = String(phone || "").replace(/\D/g, "");

    // Add India country code if missing
    if (number.length === 10) {
        number = "91" + number;
    }

    return number;
};

async function sendLeadToMeta({
    email,
    phone,
    eventId
}) {
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_TOKEN;
    const apiVersion = process.env.META_API_VERSION || "v25.0";

    if (!pixelId || !accessToken) {
        throw new Error("Meta CAPI credentials are missing.");
    }

    const userData = {};

    const normalizedEmail = normalizeEmail(email);
    const normalizedPhone = normalizePhone(phone);

    if (normalizedEmail) {
        userData.em = [hash(normalizedEmail)];
    }

    if (normalizedPhone) {
        userData.ph = [hash(normalizedPhone)];
    }

    if (!userData.em && !userData.ph) {
        throw new Error("No valid customer data for Meta.");
    }

    const event = {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "system_generated",

        user_data: userData,

        custom_data: {
            event_source: "crm",
            lead_event_source:
                process.env.META_LEAD_EVENT_SOURCE ||
                "Ashraya Estates CRM"
        }
    };

    const payload = {
        data: [event]
    };

    if (process.env.META_TEST_EVENT_CODE) {
        payload.test_event_code =
            process.env.META_TEST_EVENT_CODE;
    }

    const url =
        `https://graph.facebook.com/${apiVersion}/${pixelId}/events` +
        `?access_token=${encodeURIComponent(accessToken)}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || result.error) {
        console.error("Meta CAPI error:", result);
        throw new Error("Meta Lead event was rejected.");
    }

    console.log("Meta Lead event sent:", result);

    return result;
}

module.exports = { sendLeadToMeta };

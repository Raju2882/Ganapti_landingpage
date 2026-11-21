const crypto = require("crypto");

const hash = (value) =>
    crypto.createHash("sha256")
        .update(value)
        .digest("hex");

const normalizeEmail = (email) =>
    String(email || "").trim().toLowerCase();

const normalizePhone = (phone) => {
    let number = String(phone || "").replace(/\D/g, "");

    if (number.length === 10) {
        number = "91" + number;
    }

    return number;
};

async function sendLeadToMeta({
    email,
    phone,
    eventId,
    eventSourceUrl,
    userAgent,
    clientIp,
    fbp,
    fbc
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

    if (normalizedEmail) userData.em = [hash(normalizedEmail)];
    if (normalizedPhone) userData.ph = [hash(normalizedPhone)];

    if (userAgent) userData.client_user_agent = userAgent;
    if (clientIp) userData.client_ip_address = clientIp;
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    if (!userData.em && !userData.ph) {
        throw new Error("No customer matching data available.");
    }

    if (!eventSourceUrl || !userAgent) {
        throw new Error("Website event URL or user agent is missing.");
    }

    const event = {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: eventSourceUrl,
        user_data: userData
    };

    const payload = {
        data: [event]
    };

    if (process.env.META_TEST_EVENT_CODE) {
        payload.test_event_code = process.env.META_TEST_EVENT_CODE;
    }

    const url =
        `https://graph.facebook.com/${apiVersion}/${pixelId}/events` +
        `?access_token=${encodeURIComponent(accessToken)}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
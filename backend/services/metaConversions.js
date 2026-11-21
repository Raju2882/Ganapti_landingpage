
const crypto = require("crypto");
const axios = require("axios");

const hashData = (value) => {
    return crypto
        .createHash("sha256")
        .update(value)
        .digest("hex");
};

const normalizePhone = (phone) => {
    let number = phone.replace(/\D/g, "");

    // Add India's country code
    if (number.length === 10) {
        number = "91" + number;
    }

    return number;
};

const sendLeadEvent = async (lead, req) => {
    try {
        const pixelId = process.env.META_PIXEL_ID;
        const token = process.env.META_ACCESS_TOKEN;
        const version = process.env.META_API_VERSION;

        if (!pixelId || !token || !version) {
            throw new Error("Meta credentials are missing");
        }

        const userData = {
            ph: [
                hashData(normalizePhone(lead.phone))
            ],
            client_user_agent: req.get("user-agent"),
            client_ip_address: req.ip
        };

        if (lead.email) {
            userData.em = [
                hashData(lead.email.trim().toLowerCase())
            ];
        }

        const payload = {
            data: [
                {
                    event_name: "Lead",

                    event_time: Math.floor(Date.now() / 1000),

                    event_id: lead.eventId,

                    action_source: "website",

                    event_source_url:
                        process.env.WEBSITE_URL,

                    user_data: userData,

                    custom_data: {
                        event_source: "crm",
                        lead_event_source: "Ashraya Estates",
                        lead_id: lead.leadId
                    }
                }
            ]
        };

        const url =
            `https://graph.facebook.com/${version}/${pixelId}/events`;

        const response = await axios.post(url, payload, {
            params: {
                access_token: token
            },
            timeout: 15000
        });

        console.log("Meta Lead Event Success:", response.data);

        return response.data;

    } catch (error) {
        console.error(
            "Meta Lead Event Failed:",
            error.response?.data || error.message
        );

        throw error;
    }
};

module.exports = sendLeadEvent;

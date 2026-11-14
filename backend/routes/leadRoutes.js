const express = require("express");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../Leads.xlsx");

router.post("/add", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            budget,
            callingSlot,
            authorization
        } = req.body;

        if (!name || !email || !phone || !budget || !callingSlot) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required details."
            });
        }

        const workbook = new ExcelJS.Workbook();

        if (fs.existsSync(filePath)) {
            await workbook.xlsx.readFile(filePath);
        }

        let worksheet = workbook.getWorksheet("Leads");

        if (!worksheet) {
            worksheet = workbook.addWorksheet("Leads");

            worksheet.columns = [
                { header: "Lead ID", key: "id", width: 15 },
                { header: "Name", key: "name", width: 25 },
                { header: "Email", key: "email", width: 30 },
                { header: "Phone", key: "phone", width: 18 },
                { header: "Budget", key: "budget", width: 22 },
                { header: "Site Visit", key: "callingSlot", width: 22 },
                { header: "Source", key: "source", width: 20 },
                { header: "Status", key: "status", width: 15 },
                { header: "Authorization", key: "authorization", width: 18 },
                { header: "Created At", key: "createdAt", width: 25 }
            ];

            worksheet.getRow(1).font = { bold: true };
        }

        const leadId = `LEAD-${Date.now()}`;

        worksheet.addRow({
            id: leadId,
            name,
            email,
            phone,
            budget,
            callingSlot,
            source: "Website Enquiry",
            status: "New",
            authorization: authorization ? "Yes" : "No",
            createdAt: new Date().toLocaleString("en-IN")
        });

        await workbook.xlsx.writeFile(filePath);

        res.status(201).json({
            success: true,
            message: "Lead saved successfully!",
            leadId
        });

    } catch (error) {
        console.error("Excel Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to save lead."
        });
    }
});

module.exports = router;
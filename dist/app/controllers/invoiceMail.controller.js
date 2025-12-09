"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailInvoice = void 0;
const mail = __importStar(require("../model/mail.model"));
const logger_1 = __importDefault(require("../../config/logger"));
const handlebars_1 = __importDefault(require("handlebars"));
const juice_1 = __importDefault(require("juice"));
const invoiceTemp_1 = __importDefault(require("../template/invoiceTemp"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const path_1 = __importDefault(require("path"));
const mailInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { client_email, client_fname, client_lname, client_phone, client_address, client_postcode, client_city, client_tasks, client_total } = req.body;
    // const template = fs.readFileSync('src/app/template/invoiceTemp.html', 'utf-8').toString();
    const tasks = client_tasks.map((task) => ({ description: task.description, cost: task.cost }));
    try {
        // Compile the Handlebars template
        const compiledTemplate = handlebars_1.default.compile(invoiceTemp_1.default);
        // Provide dynamic data for the template
        const htmlContent = compiledTemplate({
            client_fname,
            client_lname,
            client_phone,
            client_address,
            client_postcode,
            client_city,
            tasks,
            totalCost: client_total
        });
        // Inline CSS
        const inlinedHtml = (0, juice_1.default)(htmlContent);
        const info = {
            client_fname,
            client_lname,
            client_phone,
            client_address,
            client_postcode,
            client_city,
            items: tasks,
            invoiceNumber: Math.floor(Math.random() * 1000000),
            amount: client_total
        };
        // Make PDF attachment (if needed)
        const pdfBuffer = yield generatePDF(info);
        logger_1.default.info("Sending email...");
        // Send the email
        const result = yield mail.send(client_email, inlinedHtml, pdfBuffer);
        res.status(200).send(result);
    }
    catch (err) {
        logger_1.default.error("Error sending email:", err.message);
        res.status(500).send('Error trying to send the email');
    }
});
exports.mailInvoice = mailInvoice;
const generatePDF = (invoice) => {
    return new Promise((resolvePromise, reject) => {
        try {
            const doc = new pdfkit_1.default();
            const buffers = [];
            doc.on("data", buffers.push.bind(buffers));
            doc.on("end", () => resolvePromise(Buffer.concat(buffers)));
            doc.on("error", reject);
            logger_1.default.info("pdf generation started 1");
            // -----------------------
            // HEADER
            // -----------------------
            doc.fontSize(37).font('Helvetica-Bold').fillColor("#000").text("INVOICE", 350, 50, {
                align: "right",
                width: 200
            });
            // -----------------------
            // LOGO
            // -----------------------
            const logoPath = path_1.default.join(__dirname, "../../../storage/pixelpalsLogo.png");
            doc.image(logoPath, 40, 40, { width: 100 });
            // PAY TO / BILL TO
            doc.fillColor("#000").font('Helvetica');
            doc.font('Helvetica-Bold').fontSize(12).text("PAY TO:", 40, 115, {
                width: 200
            });
            doc.font('Helvetica').fontSize(10).text("Pixel Pals", 40, 135);
            doc.text("03 667 9039", 40, 150).fontSize(10);
            doc.text("admin@pixelpals.co.nz", 40, 165).fontSize(10);
            doc.font('Helvetica-Bold').fontSize(12).text("BILL TO:", 400, 100, {
                width: 200
            });
            doc.font('Helvetica').fontSize(10).text(invoice.client_fname + " " + invoice.client_lname, 400, 120);
            doc.text(invoice.client_phone, 400, 135).fontSize(10);
            doc.text(invoice.client_address, 400, 150).fontSize(10);
            doc.text(invoice.client_city + ", " + invoice.client_postcode, 400, 165).fontSize(10);
            // -----------------------
            // INVOICE INFO + BANK
            // -----------------------
            doc.font('Helvetica-Bold').fontSize(12).fillColor("#000").text('BANK:', 40, 200);
            doc.font('Helvetica').fontSize(10).text(`Westpac Banking Corporation`, 40, 220);
            doc.font('Helvetica-Bold').fontSize(12).fillColor("#000").text('ACCOUNT DETAILS:', 40, 260);
            doc.font('Helvetica').fontSize(10).text(`Pixel Pals`, 40, 280);
            doc.text(`03-0767-0143648-000`, 40, 295).fontSize(10);
            doc.font('Helvetica-Bold').fontSize(12).fillColor("#000").text('INVOICE NO:', 400, 200);
            doc.font('Helvetica').fontSize(10).text(`${invoice.invoiceNumber}`, 400, 220);
            doc.font('Helvetica-Bold').fontSize(12).fillColor("#000").text('DATE:', 400, 260);
            doc.font('Helvetica').fontSize(10).text(`${new Date().toLocaleDateString("en-GB")}`, 400, 280);
            // -----------------------
            // TABLE HEADER
            // -----------------------
            let y = 330;
            doc.rect(40, y, 520, 20).fill("#ffdd00");
            doc.font('Helvetica-Bold').fontSize(12).fillColor("#fff").text("DESCRIPTION", 40, y + 5, { width: 360, align: "center" });
            doc.text("TOTAL", 400, y + 5, { width: 150, align: "center" });
            doc.font('Helvetica');
            // -----------------------
            // TABLE ITEMS (DYNAMIC)
            // -----------------------
            doc.fontSize(10).fillColor("#000");
            y += 25;
            invoice.items.forEach((item, index) => {
                doc.rect(40, y - 5, 520, 20).fill(index % 2 === 0 ? "#f1f1f1" : "#d5d5d5");
                doc.fillColor('#000').text(item.description, 45, y);
                doc.text(`$${item.cost.toFixed(2)}`, 400, y, { width: 150, align: "right" });
                y += 20;
            });
            // -----------------------
            // TOTALS SECTION
            // -----------------------
            y += 20;
            doc.fontSize(10).fillColor("#000");
            doc.text(`SUBTOTAL`, 400, y);
            doc.text(`$${invoice.amount.toFixed(2)}`, 400, y, { width: 150, align: "right" });
            y += 20;
            doc.text(`GST`, 400, y, { strike: true });
            doc.text(`$${0.00}`, 400, y, { width: 150, align: "right", strike: true });
            y += 20;
            doc.fontSize(14).fillColor("#000");
            doc.font('Helvetica-Bold').text(`Balance Due`, 350, y);
            doc.text(`$${invoice.amount.toFixed(2)}`, 400, y, { width: 150, align: "right" });
            logger_1.default.info("pdf ended");
            doc.end();
        }
        catch (error) {
            reject(error);
        }
    });
};
//# sourceMappingURL=invoiceMail.controller.js.map
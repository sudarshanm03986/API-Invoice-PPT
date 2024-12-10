"use strict";
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
exports.send = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = __importDefault(require("../../config/logger"));
require("dotenv/config");
// Create a transporter using your email service credentials
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.KEY, // Your app-specific password
    },
});
const send = (to, htmlContent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.http("Model started, sending from: " + process.env.EMAIL);
        const info = yield transporter.sendMail({
            from: process.env.INVOICE_EMAIL,
            to,
            subject: "Your invoice from Pixel Pals",
            html: htmlContent, // HTML content
        });
        logger_1.default.http("Email sent successfully");
        logger_1.default.info(info); // Log the result from sending the email
    }
    catch (error) {
        logger_1.default.http("Error sending email");
        logger_1.default.error(error.message); // Log the error
        throw new Error(`Error: ${error.message}`); // Throw error for further handling
    }
});
exports.send = send;
//# sourceMappingURL=mail.model.js.map
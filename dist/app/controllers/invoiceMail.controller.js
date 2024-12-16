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
const mailInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { client_email, client_fname, client_lname, client_phone, client_address, client_postcode, client_city, client_tasks, client_total } = req.body;
    // const template = fs.readFileSync('src/app/template/invoiceTemp.html', 'utf-8').toString();
    const tasks = client_tasks.map((task) => ({ description: task.description, cost: task.cost.toLocaleString("en-US", { style: "currency", currency: "USD" }) }));
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
            totalCost: client_total.toLocaleString("en-US", { style: "currency", currency: "USD" })
        });
        logger_1.default.info("Sending email...");
        // Inline CSS
        const inlinedHtml = (0, juice_1.default)(htmlContent);
        // Send the email
        const result = yield mail.send(client_email, inlinedHtml);
        res.status(200).send(result);
    }
    catch (err) {
        logger_1.default.error("Error sending email:", err.message);
        res.status(500).send('Error trying to send the email');
    }
});
exports.mailInvoice = mailInvoice;
//# sourceMappingURL=invoiceMail.controller.js.map
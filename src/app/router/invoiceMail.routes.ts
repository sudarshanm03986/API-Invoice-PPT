import { Express } from "express";
import * as mail from '../controllers/invoiceMail.controller';

module.exports = (app: Express) => {

    // ===  mail client their invoice =====
    app.route('/api/mail/emailInvoice')
    .post(mail.mailInvoice);
}
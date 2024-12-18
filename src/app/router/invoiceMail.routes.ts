import { Express } from "express";
import * as mail from '../controllers/invoiceMail.controller';
import * as auth from '../middleware/auth.middleware';

module.exports = (app: Express) => {

    // ===  mail client their invoice =====
    app.route('/api/mail/emailInvoice')
    .post(auth.authenticate, mail.mailInvoice);
}
import { Request, Response } from 'express';
import * as mail from '../model/mail.model'
import Logger from '../../config/logger';

const mailInvoice = async  (req: Request, res: Response): Promise<void> => {

    const email =  req.body.email;
    const subject = req.body.subject;


    Logger.info("controll");
    try {

        const result = await mail.send(
            email,
            subject,
            "<h1>HELLO</h1>"

        )

        res.status(200).send(result);

    } catch (err) {
        res.status(500)
        .send('Error trying to send the email')
    }








}



export {mailInvoice}
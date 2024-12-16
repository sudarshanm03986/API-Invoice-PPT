import { Request, Response } from 'express';
import * as mail from '../model/mail.model';
import Logger from '../../config/logger';
import handlebars from 'handlebars';
import juice from 'juice';
import template from '../template/invoiceTemp';
// import { fs } from 'mz';

interface OutTasks  {
  description : string;
  cost : string;
}

const mailInvoice = async (req: Request, res: Response): Promise<void> => {
  const { client_email, client_fname, client_lname, client_phone, client_address, client_postcode, client_city , client_tasks, client_total } = req.body;
  // const template = fs.readFileSync('src/app/template/invoiceTemp.html', 'utf-8').toString();

  const tasks : OutTasks[] = client_tasks.map((task : {description:string, cost:number}) => ({ description: task.description , cost: task.cost.toLocaleString("en-US", {style:"currency", currency:"USD"})}));


  try {
    // Compile the Handlebars template
    const compiledTemplate = handlebars.compile(template);

    // Provide dynamic data for the template
    const htmlContent = compiledTemplate({
      client_fname,
      client_lname,
      client_phone,
      client_address,
      client_postcode,
      client_city,
       tasks,
      totalCost: client_total.toLocaleString("en-US", {style:"currency", currency:"USD"})
    });

    Logger.info("Sending email...");


      // Inline CSS
      const inlinedHtml = juice(htmlContent);

    // Send the email
    const result = await mail.send(client_email, inlinedHtml);

    res.status(200).send(result);
  } catch (err) {
    Logger.error("Error sending email:", err.message);
    res.status(500).send('Error trying to send the email');
  }
};

export { mailInvoice };

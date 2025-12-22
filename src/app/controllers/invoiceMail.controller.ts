import { Request, Response } from 'express';
import * as mail from '../model/mail.model';
import Logger from '../../config/logger';
import handlebars from 'handlebars';
import juice from 'juice';
import template from '../template/invoiceTemp';

import PDFDocument from 'pdfkit';
import path from 'path';




// import { fs } from 'mz';



interface OutTasks  {
  description : string;
  cost : number;
}

interface InfoPDF  {
  client_fname: string;
  client_lname: string;
  client_phone: string;
  client_address: string;
  client_postcode: string;
  client_city: string;
  items : OutTasks[];
  invoiceNumber: number;
  amount: number;
}

const mailInvoice = async (req: Request, res: Response): Promise<void> => {
  const { client_email, client_fname, client_lname, client_phone, client_address, client_postcode, client_city , client_tasks, client_total } = req.body;
  // const template = fs.readFileSync('src/app/template/invoiceTemp.html', 'utf-8').toString();

  const tasks : OutTasks[] = client_tasks.map((task : {description:string, cost:number}) => ({ description: task.description , cost: task.cost }));



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
      totalCost: client_total
    });




      // Inline CSS
      const inlinedHtml = juice(htmlContent);

      const info : InfoPDF = {
      client_fname,
     client_lname,
     client_phone,
     client_address,
      client_postcode,
      client_city,
        items : tasks,
      invoiceNumber: Math.floor(Math.random() * 1000000),
      amount: client_total

      };

    // Make PDF attachment (if needed)
    const pdfBuffer = await generatePDF(info);

      Logger.info("Sending email...");
    // Send the email
    const result = await mail.send(client_email, inlinedHtml, pdfBuffer);

    res.status(200).send(result);
  } catch (err) {
    Logger.error("Error sending email:", err.message);
    res.status(500).send('Error trying to send the email');
  }
};


const generatePDF = (invoice: InfoPDF): Promise<Buffer> => {
  return new Promise((resolvePromise, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];
       doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolvePromise(Buffer.concat(buffers)));
    doc.on("error", reject);

      Logger.info("pdf generation started 1");

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
    const logoPath = path.join(__dirname, "../../../storage/pixelpalsLogo.png");
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
    doc.font('Helvetica-Bold').fontSize(12).fillColor("#000").text('BANK:', 40, 200, );
    doc.font('Helvetica').fontSize(10).text(`Westpac Banking Corporation`, 40, 220);

    doc.font('Helvetica-Bold').fontSize(12).fillColor("#000").text('ACCOUNT DETAILS:', 40, 260, );
    doc.font('Helvetica').fontSize(10).text(`Pixel Pals`, 40, 280);
    doc.text(`03-0767-0143648-000`, 40, 295).fontSize(10);

    doc.font('Helvetica-Bold').fontSize(12).fillColor("#000").text('INVOICE NO:', 400, 200, );
    doc.font('Helvetica').fontSize(10).text(`${invoice.invoiceNumber}`, 400, 220);

    doc.font('Helvetica-Bold').fontSize(12).fillColor("#000").text('DATE:', 400, 260, );
    doc.font('Helvetica').fontSize(10).text(`${ new Date().toLocaleDateString("en-GB", { timeZone: 'Pacific/Auckland', day: 'numeric', month: 'numeric', year: 'numeric' })}`, 400, 280);

    // -----------------------
    // TABLE HEADER
    // -----------------------
    let y = 330;

    doc.rect(40, y, 520, 20).fill("#ffdd00");



    doc.font('Helvetica-Bold').fontSize(12).fillColor("#fff").text("DESCRIPTION", 40, y + 5 , { width: 360, align: "center" });
    doc.text("TOTAL", 400, y + 5 , { width: 150, align: "center" });


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

    doc.text(`GST`, 400, y,
      { strike: true }
    );
    doc.text(`$${0.00}`, 400, y, { width: 150, align: "right", strike: true });

    y += 20;

    doc.fontSize(14).fillColor("#000");
    doc.font('Helvetica-Bold').text(`Balance Due`, 350, y );
    doc.text(`$${invoice.amount.toFixed(2)}`,  400, y, { width: 150, align: "right" });

      Logger.info("pdf ended");

    doc.end();
    } catch (error) {
      reject(error);
    }
  });
}


export { mailInvoice };

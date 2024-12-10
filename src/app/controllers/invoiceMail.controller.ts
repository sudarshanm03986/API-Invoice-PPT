import { Request, Response } from 'express';
import * as mail from '../model/mail.model';
import Logger from '../../config/logger';
import handlebars from 'handlebars';
import juice from 'juice';
// Template (use the provided HTML template string)
const template = `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add fallback styles */
    body {
      margin: 0;
      padding: 0;
      background-color: #dfdfdf !important; /* Light gray */
      font-family: Arial, sans-serif;
    }
    table {
      border-collapse: collapse;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #dfdfdf; font-family: Arial, sans-serif;">

  <!-- Outer container -->
  <table width="100%" bgcolor="#dfdfdf" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0;">
    <tr>
      <td align="center">
        <!-- Main content container -->
        <table width="700" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="margin: 20px 20px 0px 20px; padding: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 20px; text-align: left; background-color: #ffffff;">
              <!-- Header with logo and client details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="width: 50%; padding: 10px 0;">
                    <img src="https://www.pixelpals.co.nz/assets/pixelpalsLogo-yG8QUy6D.png" alt="Logo" style="width: 150px; height: auto;" />
                  </td>
                  <td align="right" style="width: 50%; font-size: 15px; line-height: 1.5; color: #333333; padding: 10px 0;">
                    <strong>Your Details</strong><br />
                    {{client_fname}} {{client_lname}}<br />
                    {{client_phone}}<br />
                    {{client_address}}<br />
                    {{client_postcode}} {{client_city}}
                  </td>
                </tr>
              </table>
              <!-- Greeting and content -->
              <h4 style="font-size: 18px; color: #333333; margin: 20px 0;">Hi {{client_fname}}, here's your invoice for the service we provided.</h4>
              <p style="font-size: 16px; color: #333333; line-height: 1.5; margin: 10px 0;">
                Below is a summary of what task was completed and what is owed.
              </p>
              <p style="font-size: 16px; color: #333333; line-height: 1.5; margin: 10px 0;">
                Your full invoice is also attached.
              </p>
            </td>
          </tr>
        </table>
        <!-- Footer -->
        <table width="700" bgcolor="#ffd42a" cellpadding="10" cellspacing="0" style="margin: 0px 0px 10px 0px; border-collapse: collapse; text-align: center;">
          <tr>
            <td style="font-size: 14px; color: black; background-color: #ffd42a;">
              Copyright &copy; 2024 Pixel Pals Technology. All rights reserved.
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px; color: gray; background-color: #ffd42a;">
              <a href="https://www.pixelpals.co.nz/" style="color: gray; text-decoration: none; margin-right: 15px;">Website</a>
              <a href="https://www.pixelpals.co.nz/" style="color: gray; text-decoration: none;">Instagram</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>


`;

const mailInvoice = async (req: Request, res: Response): Promise<void> => {
  const { client_email, client_fname, client_lname, client_phone, client_address, client_postcode, client_city } = req.body;

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

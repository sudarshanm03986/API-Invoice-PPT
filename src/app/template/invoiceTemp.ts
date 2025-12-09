const template =  ` <!DOCTYPE html>
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
            .main tr:nth-child(even) {background-color: #f2f2f2;}
            .main tr:nth-child(odd) {background-color: #f8f8f8;}
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #dfdfdf; font-family: Arial, sans-serif;">
          <div>
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
                      <p style="font-size: 16px; color: #616161; line-height: 1.5; margin: 10px 0;">
                        Your full invoice is also attached.
                      </p>
                      <!-- THE TASK -->
                      <table  width="100%"  cellpadding="0" cellspacing="0" style="margin: 0; padding: 10px; border-radius: 3px;">
                          <td align="center">
                            <!-- Tasks Section -->
                        <table width="100%" cellpadding="10" cellspacing="0" style="margin: 20px 0; border-collapse: collapse; background-color: #ffffff;">
                          <thead>
                            <tr style="background-color: #ffd42a;">
                              <th align="left" style="padding: 10px; font-size: 16px; color: black;">Task</th>
                              <th align="right" style="padding: 10px; font-size: 16px; color: black;">Cost (NZD)</th>
                            </tr>
                          </thead>
                          <tbody class="main">
                            {{#each tasks}}
                            <tr>
                              <td style="padding: 10px; font-size: 14px; color: #333333;">{{description}}</td>
                              <td align="right" style="padding: 10px; font-size: 14px; color: #333333;">{{cost}}</td>
                            </tr>
                            {{/each}}
                          </tbody>
                        </table>
                        <!-- Total Cost -->
                        <table width="100%" cellpadding="10" cellspacing="0" style="margin: 20px 0; border-collapse: collapse; background-color: #ffffff;">
                          <tr>
                            <td align="right" style="padding: 10px; font-size: 16px; font-weight: bold; color: #333333;">Total:</td>
                            <td align="right" style="padding: 10px; font-size: 16px; font-weight: bold; color: #333333;">{{totalCost}}</td>
                          </tr>
                            </table>


                          </td>
                      </table>

                      <p style="font-size: 0.9rem;"><strong>Account Number:</strong> 03-0767-0143648-000</p>
                      <p style="font-size: 0.9rem;"><strong>Account Name:</strong> Pixel Pals</p>

                    </td>
                  </tr>
                </table>
                <!-- Footer -->
                <table width="700" bgcolor="#ffd42a" cellpadding="0" cellspacing="0" style="margin: 0px 20px 20px 20px;  padding: 20px; border-collapse: collapse; text-align: center;">
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
        </div>

        </body>
        </html> `

export default template;

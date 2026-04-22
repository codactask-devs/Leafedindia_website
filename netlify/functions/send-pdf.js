const { Resend } = require('resend');
const multipart = require('lambda-multipart-parser');

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the multipart form data
    const result = await multipart.parse(event);
    const { userName, userContact, userEmail, uniqueKey } = result;
    const files = result.files;

    if (!files || files.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No PDF files uploaded.' }),
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const EMAIL_FROM = process.env.EMAIL_FROM || 'Studio <onboarding@resend.dev>';
    const EMAIL_TO = process.env.EMAIL_TO || 'maheshmarvel009@gmail.com';

    // Map files for Resend format
    // lambda-multipart-parser provides file content as a Buffer
    const attachments = files.map((file) => ({
      filename: file.filename,
      content: file.content,
    }));

    // Send email
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      subject: `INQUIRY-ID: ${uniqueKey}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0fdf4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #dcfce7; }
            .header { background: linear-gradient(135deg, #0d6e41, #10b981); padding: 40px 20px; text-align: center; color: white; }
            .logo-placeholder { font-size: 32px; font-weight: 800; letter-spacing: -1px; margin-bottom: 5px; }
            .logo-placeholder span { color: #fb923c; }
            .header-subtitle { font-size: 14px; opacity: 0.9; font-weight: 500; }
            .content { padding: 40px; }
            .title { color: #0d6e41; font-size: 24px; font-weight: 800; margin: 0 0 20px 0; border-bottom: 2px solid #f0fdf4; padding-bottom: 10px; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table th { text-align: left; padding: 12px; background-color: #f8fafc; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 8px 0 0 8px; }
            .details-table td { text-align: left; padding: 12px; color: #1e293b; font-weight: 600; border-bottom: 1px solid #f1f5f9; }
            .status-badge { display: inline-block; padding: 4px 12px; background: #dcfce7; color: #166534; border-radius: 99px; font-size: 12px; font-weight: 700; }
            .key-section { background: #f8fafc; padding: 25px; border-radius: 12px; margin-top: 30px; text-align: center; border: 1px dashed #cbd5e1; }
            .key-label { color: #64748b; font-size: 13px; margin-bottom: 8px; font-weight: 500; }
            .key-value { color: #0d6e41; font-size: 20px; font-weight: 800; font-family: 'Courier New', Courier, monospace; letter-spacing: 2px; }
            .footer { background: #f8fafc; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #f1f5f9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-placeholder">LeafedIndia<span>.</span> STUDIO</div>
              <div class="header-subtitle">Creative Packaging Design</div>
            </div>
            <div class="content">
              <h2 class="title">Inquiry Details</h2>
              <p style="color: #64748b; font-size: 15px; line-height: 1.6;">Hello Team, a new design inquiry has been triggered. Below are the requester's details and the design reference.</p>
              
              <table class="details-table">
                <tr>
                  <th width="35%">Customer Name</th>
                  <td>${userName || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Email Address</th>
                  <td><a href="mailto:${userEmail}" style="color: #10b981; text-decoration: none;">${userEmail || 'N/A'}</a></td>
                </tr>
                <tr>
                  <th>Contact No.</th>
                  <td>${userContact || 'N/A'}</td>
                </tr>
                <tr>
                  <th>PDF Count</th>
                  <td><span class="status-badge">${files.length} PDF(s)</span></td>
                </tr>
              </table>

              <div class="key-section">
                <div class="key-label">UNIQUE DESIGN REFERENCE KEY</div>
                <div class="key-value">${uniqueKey || 'N/A'}</div>
              </div>
            </div>
            <div class="footer">
              This is an automated inquiry from LeafedIndia Studio.<br>
              &copy; 2026 LeafedIndia. All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: attachments,
    });

    if (error) {
      console.error('Resend Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Inquiry details sent successfully.' }),
    };

  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'System error', details: error.message }),
    };
  }
};

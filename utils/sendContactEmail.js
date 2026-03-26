export const sendContactEmail = async (data) => {
  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY is missing in environment variables");
      return;
    }

    const emailData = {
      sender: { email: process.env.EMAIL_USER, name: "LAX360 Website" },
      to: [{ email: process.env.CONTACT_EMAIL }],
      replyTo: { email: data.email },
      subject: "📩 New Contact Message - LAX360",
      htmlContent: `
<div style="font-family:Arial, Helvetica, sans-serif;background:#f4f6fb;padding:30px">
<div style="max-width:650px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.08)">
<div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:25px;color:white;text-align:center">
<h2 style="margin:0">📩 New Contact Inquiry</h2>
<p style="margin-top:5px;font-size:14px">Message from LAX360 Website</p>
</div>
<div style="padding:25px">
<table style="width:100%;border-collapse:collapse;font-size:14px">
<tr>
<td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;width:150px">Name</td>
<td style="padding:10px;border-bottom:1px solid #eee">${data.Name}</td>
</tr>
<tr>
<td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Email</td>
<td style="padding:10px;border-bottom:1px solid #eee">${data.email}</td>
</tr>
<tr>
<td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Phone</td>
<td style="padding:10px;border-bottom:1px solid #eee">${data.phone || "Not provided"}</td>
</tr>
<tr>
<td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Service</td>
<td style="padding:10px;border-bottom:1px solid #eee">${data.service || "Not specified"}</td>
</tr>
<tr>
<td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Message</td>
<td style="padding:10px;border-bottom:1px solid #eee">${data.message}</td>
</tr>
</table>
</div>
<div style="background:#fafafa;padding:15px;text-align:center;font-size:12px;color:#777">
This email was automatically sent from the <strong>LAX360 Contact Form</strong>.
</div>
</div>
</div>
`,
    };

    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    console.log("Contact notification initiated via Brevo for:", data.email);
  } catch (error) {
    console.error("Brevo Contact Email failed:", error);
    throw error;
  }
};

export const sendCareerEmail = async (data) => {
  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY is missing in environment variables");
      return;
    }

    const emailData = {
      sender: { email: process.env.EMAIL_USER, name: "LAX360" },
      to: [{ email: process.env.HR_EMAIL }],
      subject: "New Job Application - LAX360",
      htmlContent: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif;background:#f4f4f4;padding:20px;">
<div style="max-width:600px;margin:auto;background:white;border-radius:6px;overflow:hidden;">
<div style="background:#667eea;color:white;padding:20px;text-align:center;">
<h2>📧 New Job Application Received</h2>
</div>
<div style="padding:20px;background:#f9f9f9;border:1px solid #ddd;">
<p><strong>First Name:</strong><br>${data.firstName}</p>
<p><strong>Last Name:</strong><br>${data.lastName || "Not provided"}</p>
<p><strong>Email:</strong><br>${data.email}</p>
<p><strong>Phone:</strong><br>${data.phone || "Not provided"}</p>
<p><strong>Address:</strong><br>${data.address || "Not provided"}</p>
<p><strong>City:</strong><br>${data.city || "Not provided"}</p>
<p><strong>State:</strong><br>${data.state || "Not provided"}</p>
<p><strong>ZIP Code:</strong><br>${data.zip || "Not provided"}</p>
<p><strong>Job Title Applied For:</strong><br><strong>${data.jobTitle}</strong></p>
<p><strong>Resume:</strong></p>
<a href="${data.resume}" target="_blank" style="display:inline-block;padding:10px 20px;background:#667eea;color:white;text-decoration:none;border-radius:5px;">📄 Open Resume</a>
</div>
<div style="padding:15px;text-align:center;font-size:12px;color:#777;background:#f1f1f1;">
This email was automatically generated from the LAX360 Careers Portal.
</div>
</div>
</body>
</html>
`,
    };

    // HR Notification
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    // Auto-reply to Student
    const autoReplyData = {
      sender: { email: process.env.EMAIL_USER, name: "LAX360 Team" },
      to: [{ email: data.email }],
      subject: "Application Received - LAX360",
      htmlContent: `
      <div style="font-family:Arial;padding:20px">
      <h2>Thank you for applying at LAX360</h2>
      <p>Hi ${data.firstName},</p>
      <p>We have received your application for the <strong>${data.jobTitle}</strong> position.</p>
      <p>Our HR team will review your profile and contact you if your qualifications match our requirements.</p>
      <p>Regards,<br>LAX360 Hiring Team</p>
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
      body: JSON.stringify(autoReplyData),
    });

    console.log("Emails initiated via Brevo for:", data.email);
  } catch (error) {
    console.error("Brevo Email failed:", error);
    throw error;
  }
};

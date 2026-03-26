import nodemailer from "nodemailer";
import dns from "node:dns/promises";

export const sendCareerEmail = async (data) => {
  try {
    // Manually resolve to IPv4 address to bypass system DNS and force IPv4
    const addresses = await dns.resolve4("smtp.gmail.com");
    const host = addresses[0];
    console.log("Resolved smtp.gmail.com to IPv4:", host);

    const transporter = nodemailer.createTransport({
      host: host,
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        servername: "smtp.gmail.com", // Essential when using an IP address for the host
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.HR_EMAIL,
      subject: "New Job Application - LAX360",
      html: `
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

<p><strong>Job Title Applied For:</strong><br>
<strong>${data.jobTitle}</strong>
</p>

<p><strong>Resume:</strong></p>

<a href="${data.resume}" target="_blank"
style="display:inline-block;padding:10px 20px;background:#667eea;color:white;text-decoration:none;border-radius:5px;">
📄 Open Resume
</a>

</div>

<div style="padding:15px;text-align:center;font-size:12px;color:#777;background:#f1f1f1;">
This email was automatically generated from the LAX360 Careers Portal.
</div>

</div>

</body>
</html>
`,
    };

    // HR Email
    await transporter.sendMail(mailOptions);

    // ------------------ AUTO REPLY TO STUDENT ------------------

    const studentMail = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: "Application Received - LAX360",
      html: `
      <div style="font-family:Arial;padding:20px">
      <h2>Thank you for applying at LAX360</h2>

      <p>Hi ${data.firstName},</p>

      <p>
      We have received your application for the 
      <strong>${data.jobTitle}</strong> position.
      </p>

      <p>
      Our HR team will review your profile and contact you if your qualifications match our requirements.
      </p>

      <p>Regards,<br>LAX360 Hiring Team</p>
      </div>
      `,
    };

    await transporter.sendMail(studentMail);

    console.log("Email sent successfully to:", process.env.HR_EMAIL);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

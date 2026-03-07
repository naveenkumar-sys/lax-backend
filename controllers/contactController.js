import Contact from "../model/contactModel.js";
import { sendContactEmail } from "../utils/sendContactEmail.js";
import { saveContactToSheet } from "../utils/googleSheets.js";

export const createContact = async (req, res) => {
  try {
    const { Name, email, phone, service, message } = req.body;

    if (!Name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Message are required",
      });
    }

    const newContact = new Contact({
      Name,
      email,
      phone,
      service,
      message,
    });

    // Save to MongoDB
    await newContact.save();
    // Save to Google Sheets
    await saveContactToSheet(newContact);
    // Send email notification
    await sendContactEmail({
      Name,
      email,
      phone,
      service,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Contact submitted successfully",
      data: newContact,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

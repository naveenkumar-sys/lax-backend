import Career from "../model/careerModel.js";
import { sendCareerEmail } from "../utils/sendCareerEmail.js";
import { saveCareerToSheet } from "../utils/googleSheets.js";

export const applyJob = async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      jobTitle,
    } = req.body;

    if (!firstName || !email || !req.file) {
      return res.status(400).json({
        success: false,
        message: "First Name, Email and Resume are required",
      });
    }

    // Correct Cloudinary URL
    const resumeUrl = req.file.path;
    // console.log(req.file.path);

    // console.log("Resume URL:", resumeUrl);

    const application = new Career({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      jobTitle,
      resume: resumeUrl,
    });

    await application.save();

    // Send email
    await sendCareerEmail(application);
    // Save to Google Sheets
    await saveCareerToSheet(application);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      resumeUrl,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "google-service-account.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});


// ---------------- CAREER SHEET ----------------

export const saveCareerToSheet = async (data) => {

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.CAREER_SHEET_ID,
    range: "Sheet1!A:J",
    valueInputOption: "USER_ENTERED",

    resource: {
      values: [[
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.address,
        data.city,
        data.state,
        data.zip,
        data.jobTitle,
        data.resume,
        new Date().toLocaleString()
      ]]
    }

  });

};


// ---------------- CONTACT SHEET ----------------

export const saveContactToSheet = async (data) => {

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.CONTACT_SHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",

    resource: {
      values: [[
        data.Name,
        data.email,
        data.phone,
        data.service,
        data.message,
        new Date().toLocaleString()
      ]]
    }

  });

};
import { google } from "googleapis";
import path from "path";

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), "config/credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const enquirySheetId = "1OLBTNM96FcGOnwV7hbAfpm_8fqSDvVWwInyIb6bYiu0";
const careerSheetId = "13vHKSOaC44Oo_a8Z1TumMwQis-cqSkWguPOgndQbqU4";

const getSheets = async () => {
  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client });
};

export const saveContactToSheet = async (data) => {
  const sheets = await getSheets();

  await sheets.spreadsheets.values.append({
    spreadsheetId: enquirySheetId,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.Name,
          data.email,
          data.phone,
          data.service,
          data.message,
          new Date().toLocaleString(),
        ],
      ],
    },
  });
};

export const saveCareerToSheet = async (data) => {
  const sheets = await getSheets();

  await sheets.spreadsheets.values.append({
    spreadsheetId: careerSheetId,
    range: "Sheet1!A:K",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
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
          new Date().toLocaleString(),
        ],
      ],
    },
  });
};

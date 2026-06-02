// Wedding RSVP Form Handler
// Paste this code into your Google Apps Script

function doPost(e) {
  try {
    // Get the spreadsheet and specifically the "RSVP" sheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("RSVP");

    // Check if sheet exists
    if (!sheet) {
      throw new Error("RSVP sheet not found");
    }

    // Parse the form data
    var data = e.parameter;

    // Add a timestamp
    var timestamp = new Date();

    // Append data to sheet - matches your new form fields
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.contact || '',
      data.side || '',
      data.num_people || '',
      data.arrival_date || '',
      data.arrival_time || ''
    ]);

    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({result: "success"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({result: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function
function doGet(e) {
  return ContentService
    .createTextOutput("Wedding RSVP Script is running!")
    .setMimeType(ContentService.MimeType.TEXT);
}

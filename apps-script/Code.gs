function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Submissions");
    var data = JSON.parse(e.postData.contents);
    
    // Validate required fields exist
    if (!data.googleUserId || !data.admissionYear || data.diplomaPercentage === undefined || !data.generalRank || !data.community || !data.communityRank) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Missing required fields" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // --- Server-Side Validation ---
    var percentage = parseFloat(data.diplomaPercentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Invalid diploma percentage. Must be between 0 and 100." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var genRank = parseInt(data.generalRank, 10);
    if (isNaN(genRank) || genRank <= 0 || genRank !== Number(data.generalRank)) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Invalid general rank. Must be a positive integer." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var commRank = parseInt(data.communityRank, 10);
    if (isNaN(commRank) || commRank <= 0 || commRank !== Number(data.communityRank)) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Invalid community rank. Must be a positive integer." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var allowedCommunities = ['OC', 'BC', 'BCM', 'MBC/DNC', 'SC', 'SCA', 'ST'];
    if (allowedCommunities.indexOf(data.community) === -1) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Invalid community. Not an allowed value." }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    // ------------------------------

    var timestamp = new Date();
    var googleVerified = true;
    
    // Find if user already exists
    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();
    var userRow = -1;
    
    // Search for existing Google User ID (column B / index 1)
    // Start loop from 1 to skip header row
    for (var i = 1; i < values.length; i++) {
      if (values[i][1] === data.googleUserId) {
        userRow = i + 1; // +1 because array is 0-indexed but rows are 1-indexed
        break;
      }
    }
    
    var rowData = [
      timestamp,                 // A: Timestamp (Only set on creation)
      data.googleUserId,         // B: Google User ID (Internal)
      data.admissionYear,        // C: Admission Year
      percentage,                // D: Diploma Percentage
      genRank,                   // E: General Rank
      data.community,            // F: Community
      commRank,                  // G: Community Rank
      googleVerified,            // H: Google Verified
      timestamp                  // I: Last Updated
    ];

    if (userRow > -1) {
      // Update existing row (skip updating original timestamp in Column A)
      // getRange(row, column, numRows, numColumns)
      // Starting at Column B (2), update 8 columns (B through I)
      sheet.getRange(userRow, 2, 1, 8).setValues([[
        rowData[1], rowData[2], rowData[3], rowData[4], rowData[5], rowData[6], rowData[7], rowData[8]
      ]]);
      return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Submission updated" }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      // Append new row
      sheet.appendRow(rowData);
      return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Submission created" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Submissions");
    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();
    
    var publicData = [];
    
    // Skip header row (index 0)
    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      // Skip empty rows
      if (!row[1]) continue;

      // Only return public fields, NEVER return Google User ID (row[1])
      publicData.push({
        id: "sub_" + i, // Generate fake ID based on row number
        admissionYear: row[2],
        diplomaPercentage: row[3],
        generalRank: row[4],
        community: row[5],
        communityRank: row[6],
        googleVerified: row[7]
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: true, data: publicData }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS for CORS preflight (Apps script handles this implicitly in most cases, 
// but defining it safely returns empty HTML to not break fetch preflights)
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

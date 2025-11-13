/**
 * Google Apps Script for Wedding RSVP Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code
 * 4. Copy and paste this entire file
 * 5. Save (Ctrl+S or Cmd+S)
 * 6. Deploy: Deploy > New deployment > Web app
 * 7. Settings:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Copy the Web App URL
 * 9. Paste it in js/main.js (line 7)
 */

/**
 * Handle POST requests (RSVP form submissions)
 */
function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Log for debugging
    Logger.log('Received RSVP: ' + JSON.stringify(data));
    
    // Append new row with RSVP data
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.guests,
      data.events,
      data.dietary,
      data.message
    ]);
    
    // Optional: Send email notification to couple
    sendEmailNotification(data);
    
    // Optional: Send confirmation email to guest
    sendConfirmationEmail(data);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'RSVP received successfully! We look forward to celebrating with you!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'An error occurred. Please try again or contact us directly.'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput("✓ Wedding RSVP Script is working! Your form submissions will be recorded.");
}

/**
 * Send email notification to the couple
 * UPDATE: Change the email address to yours!
 */
function sendEmailNotification(data) {
  try {
    // *** CHANGE THIS TO YOUR EMAIL ***
    const recipientEmail = "iamoperator199@gmail.com";
    
    const subject = "🎉 New Wedding RSVP from " + data.name;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;">
        <div style="background-color: #d4af37; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">💑 New RSVP Received!</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Guest Details</h2>
          
          <table style="width: 100%; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Name:</td>
              <td style="padding: 10px 0; color: #333;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; color: #333;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Phone:</td>
              <td style="padding: 10px 0; color: #333;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Number of Guests:</td>
              <td style="padding: 10px 0; color: #333;">${data.guests}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Events Attending:</td>
              <td style="padding: 10px 0; color: #333;">${data.events}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Dietary Restrictions:</td>
              <td style="padding: 10px 0; color: #333;">${data.dietary}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f8f8; border-left: 4px solid #d4af37;">
            <p style="margin: 0; color: #666; font-weight: bold;">Message:</p>
            <p style="margin: 10px 0 0 0; color: #333; font-style: italic;">${data.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Time:</strong> ${data.timestamp}
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>This is an automated notification from your wedding RSVP system.</p>
        </div>
      </div>
    `;
    
    const plainBody = `
New RSVP Received!

Guest Details:
--------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Number of Guests: ${data.guests}
Events Attending: ${data.events}
Dietary Restrictions: ${data.dietary}

Message:
${data.message}

Time: ${data.timestamp}

---
This is an automated notification from your wedding RSVP system.
    `;
    
    // Send email with HTML
    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });
    
    Logger.log('Email notification sent to: ' + recipientEmail);
    
  } catch (error) {
    Logger.log('Email notification error: ' + error.toString());
    // Don't throw error - we don't want to fail RSVP submission if email fails
  }
}

/**
 * Send confirmation email to the guest (Optional)
 */
function sendConfirmationEmail(data) {
  try {
    const subject = "Thank you for your RSVP! - Kartik & Palak's Wedding";
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;">
        <div style="background-color: #d4af37; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 32px;">💑</h1>
          <h2 style="margin: 10px 0 0 0;">Kartik & Palak</h2>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333;">Dear ${data.name},</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Thank you so much for your RSVP! We're absolutely delighted that you'll be joining us on our special day.
          </p>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Your RSVP Details:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #666;">
              <li>Number of Guests: ${data.guests}</li>
              <li>Events: ${data.events}</li>
            </ul>
          </div>
          
          <h3 style="color: #333; margin-top: 30px;">Event Details:</h3>
          <div style="background-color: #e8f4f8; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <p style="margin: 5px 0; color: #666;"><strong>📅 Mehendi:</strong> 22nd November, 5:00 PM onwards</p>
            <p style="margin: 5px 0; color: #666;"><strong>💍 Engagement:</strong> 22nd November, 8:00 PM onwards</p>
            <p style="margin: 5px 0; color: #666;"><strong>🎨 Haldi:</strong> 23rd November, 11:00 AM onwards</p>
            <p style="margin: 5px 0; color: #666;"><strong>💑 Wedding:</strong> 23rd November, 8:00 PM onwards</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>📍 Venue:</strong> Samar Grand, Faridabad</p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If you need to make any changes to your RSVP or have any questions, please don't hesitate to reach out to us!
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Looking forward to celebrating with you! 🎉
          </p>
          
          <p style="color: #666; margin-top: 30px;">
            With love,<br>
            <strong style="color: #d4af37; font-size: 18px;">Kartik & Palak</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          
          <div style="text-align: center;">
            <p style="color: #999; font-size: 14px; margin: 10px 0;">Follow our journey:</p>
            <p style="margin: 10px 0;">
              <a href="https://instagram.com/czartyik" style="color: #d4af37; text-decoration: none; margin: 0 10px;">@czartyik</a>
              <span style="color: #999;">•</span>
              <a href="https://instagram.com/palks_3010" style="color: #d4af37; text-decoration: none; margin: 0 10px;">@palks_3010</a>
            </p>
            <p style="color: #999; font-size: 14px; margin: 10px 0;">Share your photos with #kapal</p>
          </div>
        </div>
      </div>
    `;
    
    const plainBody = `
Dear ${data.name},

Thank you so much for your RSVP! We're absolutely delighted that you'll be joining us on our special day.

Your RSVP Details:
- Number of Guests: ${data.guests}
- Events: ${data.events}

Event Details:
📅 Mehendi: 22nd November, 5:00 PM onwards
💍 Engagement: 22nd November, 8:00 PM onwards
🎨 Haldi: 23rd November, 11:00 AM onwards
💑 Wedding: 23rd November, 8:00 PM onwards

📍 Venue: Samar Grand, Faridabad

If you need to make any changes to your RSVP or have any questions, please don't hesitate to reach out to us!

Looking forward to celebrating with you! 🎉

With love,
Kartik & Palak

---
Follow our journey: @czartyik • @palks_3010
Share your photos with #kapal
    `;
    
    // Send confirmation email
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });
    
    Logger.log('Confirmation email sent to: ' + data.email);
    
  } catch (error) {
    Logger.log('Confirmation email error: ' + error.toString());
    // Don't throw error - we don't want to fail RSVP submission if email fails
  }
}

/**
 * Test function - Run this to check if script is working
 */
function testScript() {
  const testData = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: "Test Guest",
    email: "test@example.com",
    phone: "9999999999",
    guests: "2",
    events: "Wedding",
    dietary: "None",
    message: "This is a test RSVP"
  };
  
  Logger.log('Running test...');
  
  try {
    // Test sheet append
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      testData.timestamp,
      testData.name,
      testData.email,
      testData.phone,
      testData.guests,
      testData.events,
      testData.dietary,
      testData.message
    ]);
    Logger.log('✓ Sheet append successful');
    
    // Test email notification
    sendEmailNotification(testData);
    Logger.log('✓ Email notification sent');
    
    Logger.log('✓ All tests passed!');
    return 'Success';
    
  } catch (error) {
    Logger.log('✗ Test failed: ' + error.toString());
    return 'Failed: ' + error.toString();
  }
}

/**
 * Initialize sheet with headers (run once)
 */
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Add headers
  sheet.appendRow([
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Number of Guests',
    'Events Attending',
    'Dietary Restrictions',
    'Message'
  ]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, 8);
  headerRange.setBackground('#d4af37');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  
  // Set column widths
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 150); // Name
  sheet.setColumnWidth(3, 200); // Email
  sheet.setColumnWidth(4, 120); // Phone
  sheet.setColumnWidth(5, 80);  // Guests
  sheet.setColumnWidth(6, 200); // Events
  sheet.setColumnWidth(7, 150); // Dietary
  sheet.setColumnWidth(8, 300); // Message
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  Logger.log('✓ Sheet setup complete!');
}


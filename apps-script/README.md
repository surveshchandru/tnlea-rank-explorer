# Google Apps Script Setup Guide

To replace Firebase with Google Sheets, follow these instructions to set up your backend.

## 1. Create the Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Name the document: `TNLEA Rank Explorer Database`
3. Rename the first sheet at the bottom to exactly: `Submissions`
4. Add the following headers to row 1 (A through I):
   - A1: `Timestamp`
   - B1: `Google User ID`
   - C1: `Admission Year`
   - D1: `Diploma Percentage`
   - E1: `General Rank`
   - F1: `Community`
   - G1: `Community Rank`
   - H1: `Google Verified`
   - I1: `Last Updated`

## 2. Add the Apps Script Code
1. In your Google Sheet, go to `Extensions` > `Apps Script` in the top menu.
2. Delete any code in `Code.gs` and paste the entire contents of the `apps-script/Code.gs` file from this project.
3. Click the Save icon (floppy disk) or press Ctrl+S.

## 3. Deploy as a Web App
1. Click the blue **Deploy** button in the top right corner and select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill out the configuration:
   - **Description**: `TNLEA Backend API`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` (This is required so the React app can fetch data without requiring users to log into Google Workspace).
4. Click **Deploy**.
5. You will be asked to authorize access. Follow the prompts (if it says "Google hasn't verified this app", click "Advanced" and then "Go to project (unsafe)").
6. Once deployed, copy the **Web app URL**.

## 4. Connect to Next.js
Create a `.env.local` file in the root of your Next.js project and add your URL and Google Client ID:

```env
NEXT_PUBLIC_APPS_SCRIPT_URL=your_web_app_url_here
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
```

## ⚠️ Limitations of Google Sheets as a Backend

While using Google Sheets and Apps Script is free and easy to set up, there are some limitations you should be aware of:

1. **Rate Limits & Quotas**: Google Apps Script is not designed for high-traffic production apps. It has quotas, such as limits on URL fetch calls and simultaneous executions. If hundreds of students try to submit at the exact same second, some requests might fail.
2. **Response Time**: Fetching data from an Apps Script Web App generally takes longer (1-2 seconds) compared to traditional databases like Firebase or PostgreSQL. You might notice a slight delay when the public rankings table loads.
3. **Data Volume**: Google Sheets starts to become very slow when dealing with tens of thousands of rows. If TNLEA has more than 5,000-10,000 active submitters, searching and appending rows via the script might degrade in performance.
4. **Concurrency Issues**: If two people submit data at the exact same millisecond, Google Sheets can sometimes encounter locking or race conditions, though `appendRow` is generally thread-safe.
5. **No Advanced Querying**: Unlike Firestore, we cannot do server-side pagination, indexing, or complex queries easily. The script currently loads the *entire* sheet into memory and returns it to the client, which is fine for small datasets but doesn't scale well.

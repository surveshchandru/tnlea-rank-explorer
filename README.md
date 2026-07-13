TNLEA Rank Explorer

A community-driven platform that brings transparency to TNLEA (Tamil Nadu Lateral Entry Admissions) by allowing students to voluntarily share their diploma percentage and TNLEA ranks.

Disclaimer: This project is not affiliated with the Government of Tamil Nadu, DOTE, or TNLEA. All data displayed on this platform is voluntarily contributed by students and is intended for informational purposes only.

📖 About the Project

TNLEA students often have very limited visibility into the admission process compared to TNEA students. There is no centralized platform where students can compare diploma percentages, general ranks, and community ranks to better understand the competition.

TNLEA Rank Explorer aims to bridge that gap by providing a simple, community-driven platform where students can:

Submit their TNLEA details.
Compare their rankings with other students.
View a live, sortable ranking table.
Help improve transparency within the TNLEA counselling process.
✨ Features
Google Sign-In
One submission per Google account
Edit existing submission
Community-driven data collection
Public anonymous ranking table
Live search and sorting
Responsive design
Google Sheets as the backend database
Google Apps Script API integration
📊 Data Collected

The platform only collects the following academic information:

Admission Year
Diploma Percentage
General Rank
Community
Community Rank

The public ranking table does not display:

Name
Email Address
Google User ID
Profile Picture
🛠 Tech Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Backend
Google Apps Script
Database
Google Sheets
Authentication
Google Sign-In
🚀 Getting Started
Clone the repository
git clone https://github.com/surveshchandru/tnlea-rank-explorer.git
Install dependencies
npm install
Create .env.local
NEXT_PUBLIC_APPS_SCRIPT_URL=YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL

NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
Start the development server
npm run dev

Visit:

http://localhost:3000
📂 Project Structure
src/
 ├── app/
 ├── components/
 ├── services/
 ├── types/

apps-script/
 ├── Code.gs
 └── README.md
🎯 Project Goals
Improve transparency in TNLEA admissions.
Build a useful community resource for diploma students.
Help future applicants make informed counselling decisions.
Provide anonymous analytics based on voluntarily submitted data.
🔒 Privacy

This project is designed with minimal data collection.

Only academic information required for ranking analysis is stored.

Personal information such as names, email addresses, and Google User IDs are never displayed publicly.

⚠ Disclaimer
This website is not an official TNLEA portal.
Information is voluntarily submitted by students.
Data accuracy depends on honest community participation.
Students should always verify counselling decisions using the official TNLEA counselling portal.
🤝 Contributing

Suggestions, bug reports, and improvements are welcome.

If you find an issue or have an idea to improve the project, feel free to open an Issue or submit a Pull Request.

👨‍💻 Developer

Survesh Chandru

LinkedIn: (Add your LinkedIn URL here)
GitHub: https://github.com/surveshchandru
⭐ Support the Project

If this project helped you or your friends during TNLEA counselling, please consider giving it a ⭐ on GitHub. It helps more students discover the project and encourages future development.

📄 License

This project is licensed under the MIT License unless stated otherwise.

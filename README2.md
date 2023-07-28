Student Records Management System
The Student Records Management System is a web application that allows staff members and administrators to manage student records, upload and store student documents (Marksheets, Certificates, Remarks), and perform various administrative tasks related to student registration.

Table of Contents
Introduction
Features
Technologies Used
Installation
Usage
Contributing
License
Introduction
The Student Records Management System provides a user-friendly interface for staff members, students, and administrators to interact with the application. Staff members can upload and update student documents, and administrators can manage user accounts and view system statistics.

Features
Staff can upload and update student documents (Marksheets, Certificates, Remarks).
Staff can search for students by roll number and view their details.
Administrators can manage user accounts (add new staff members and administrators).
Administrators can view system statistics, such as the total number of students, staff members, and administrators.
Technologies Used
The project uses the following technologies:

Node.js - Backend server environment
Express.js - Web application framework
IPFS - InterPlanetary File System for storing documents
MySQL - Relational database for storing student and user data
Web3.js - Ethereum JavaScript library for interacting with the blockchain (for storing document hashes)
EJS - Templating engine for rendering dynamic views
Multer - Middleware for handling file uploads
Body-parser - Middleware for parsing form data
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/student-records-management.git
cd student-records-management
Install the dependencies:
bash
Copy code
npm install
Create a MySQL database and update the dbConfig in app.js with your database credentials:
javascript
Copy code
const dbConfig = {
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'loginsignup', // Change this to your database name
  connectionLimit: 10,
};
Start the MySQL server.

Run the database migration and create tables:

bash
Copy code
npm run migrate
Start the application:
bash
Copy code
npm start
Access the application in your web browser at http://localhost:8080/.
Usage
Access the application in your web browser.
Staff members can log in using their credentials and upload/update student documents.
Administrators can log in using their credentials and manage user accounts and view system statistics.
Students can view their details and uploaded documents by entering their roll number.
Contributing
Contributions are welcome! If you find any bugs or want to add new features, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.

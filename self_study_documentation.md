### # Self-Study Documentation: Node.js and MySQL Integration

---

## ## Project Overview

This project demonstrates how to create a simple API using Node.js and Express that connects to a MySQL database to perform various GET operations. The goal is to interact with a hospital database and retrieve data related to patients and providers.

---

### ## Requirements

- **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).
- **MySQL**: Make sure you have MySQL installed and running.
- **MySQL Workbench**: For database management (if needed).
- **Visual Studio Code**: As your code editor.

---

### ## Setup

1. **Clone the Repository**: Clone your project repository or create a new project folder.

2. **Initialize Node.js Environment**:
   ```bash
   npm init -y
   ```

3. **Install Necessary Dependencies**:
   ```bash
   npm install express mysql2 dotenv nodemon
   ```

4. **Create `server.js` and `.env` Files**:
   - Create `server.js` for the Node.js application logic.
   - Create a `.env` file for your database credentials.

---

### ## Connecting to MySQL Database

Configure the `.env` file:
```
DB_USER=root
DB_HOST=localhost
DB_PASSWORD=your_password
DB_NAME=hospital_db
```

Configure the MySQL connection in `server.js`:
```javascript
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});
```

---

### ## Setting Up the API Endpoints

1. **Retrieve All Patients**: This endpoint retrieves all patients from the database.
   ```javascript
   app.get('/patients', (req, res) => {
     const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
     db.query(query, (err, results) => {
       if (err) {
         return res.status(500).json({ error: err.message });
       }
       res.json(results);
     });
   });
   ```
   **Access URL**: [http://localhost:3000/patients](http://localhost:3000/patients)

   ![Retrieve All Patients Screenshot](#) <!-- Insert screenshot here -->

2. **Retrieve All Providers**: This endpoint retrieves all providers from the database.
   ```javascript
   app.get('/providers', (req, res) => {
     const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
     db.query(query, (err, results) => {
       if (err) {
         return res.status(500).json({ error: err.message });
       }
       res.json(results);
     });
   });
   ```
   **Access URL**: [http://localhost:3000/providers](http://localhost:3000/providers)

   ![Retrieve All Providers Screenshot](#) <!-- Insert screenshot here -->

3. **Filter Patients by First Name**: This endpoint filters patients by their first name.
   ```javascript
   app.get('/patients/filter', (req, res) => {
     const firstName = req.query.first_name;
     const query = 'SELECT * FROM patients WHERE first_name = ?';
     db.query(query, [firstName], (err, results) => {
       if (err) {
         return res.status(500).json({ error: err.message });
       }
       res.json(results);
     });
   });
   ```
   **Access URL**: [http://localhost:3000/patients/filter?first_name=John](http://localhost:3000/patients/filter?first_name=John)

   ![Filter Patients by First Name Screenshot](#) <!-- Insert screenshot here -->

4. **Retrieve Providers by Specialty**: This endpoint retrieves providers by their specialty.
   ```javascript
   app.get('/providers/filter', (req, res) => {
     const specialty = req.query.specialty;
     const query = 'SELECT * FROM providers WHERE provider_specialty = ?';
     db.query(query, [specialty], (err, results) => {
       if (err) {
         return res.status(500).json({ error: err.message });
       }
       res.json(results);
     });
   });
   ```
   **Access URL**: [http://localhost:3000/providers/filter?specialty=Cardiology](http://localhost:3000/providers/filter?specialty=Cardiology)

   ![Retrieve Providers by Specialty Screenshot]() <!-- Insert screenshot here -->

---

### ## Running the Application

1. Start your MySQL server and make sure your database (`hospital_db`) and tables (`patients` and `providers`) are created and populated.
2. Run the application using:
   ```bash
   npx nodemon server.js
   ```
3. Test the API endpoints using your browser or Postman.

---

### ## Lessons Learned

- **Setting Up Node.js and Express**: Gained hands-on experience in setting up a Node.js environment and creating a server using Express.
- **Connecting to MySQL**: Successfully configured the database connection using the `mysql2` package and environment variables.
- **Creating REST API Endpoints**: Implemented multiple GET endpoints to retrieve and filter data from a MySQL database.
- **Testing APIs**: Used tools like Postman to test and verify the functionality of API endpoints.

---

### ## Challenges Faced and Solutions

- **Database Connection Issue**: Initially used `DB_USERNAME` instead of `DB_USER`, resulting in a connection error. This was resolved by updating the `.env` file and the code.
- **Password Configuration**: Had to set a new password for MySQL to ensure the connection worked correctly.

---


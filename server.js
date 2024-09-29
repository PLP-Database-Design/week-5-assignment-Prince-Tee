const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err =>{
    if (err){
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('connected to the database');
});

// Question 1
app.get('/patients', (req, res)=>{
    const query = 'SELECT patients_id, first_name, last_name, date_of_birth FROM patients'
    db.query(query, (err, results)=>{
        if (err){
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

// Question 2
app.get('/providers', (req,res)=>{
    const query = 'SELECT first_name, last_name, provider_speciality FROM providers';

    db.query(query,(err,results)=>{
        if (err){
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

// Question 3
app.get('/patients/filter', (req, res)=>{
    const firstName = req.query.first_name;
    const query = 'SELECT * FROM patients WHERE first_name = ?';

    db.query(query, [firstName], (err, results)=>{
        if (err){
            return res.status(500).json({ error: err.message});
        }
        res.json(results);
    });
});
 // Question 4
app.get('/providers/filter', (req,res)=>{
    const speciality = req.query.speciality;
    const query = 'SELECT * FROM providers WHERE provider_speciality = ?';
    
    db.query(query, [speciality], (err, results) =>{
        if (err){
            return res.status(500).json({error: err.message});
        }
        res.json(results);
      });
 });

 const PORT = 3000;
 app.listen(PORT, ()=>{
    console.log(`server is running o http://localhost:${PORT}`);
 });
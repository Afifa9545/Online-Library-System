const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves your HTML/CSS

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Afifa@123', 
    database: 'library'
});

db.connect(err => {
    if (err) console.error('Database connection failed: ' + err.stack);
    else console.log('Connected to MySQL database.');
});

// Get all books
app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Update book status (Issue/Return)
app.post('/api/update-book', (req, res) => {
    const { id, status, issued_to } = req.body;
    const query = 'UPDATE books SET status = ?, issued_to = ? WHERE id = ?';
    db.query(query, [status, issued_to, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Success' });
    });
});

app.listen(3000, () => console.log('Server running: http://localhost:3000'));
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'realhome'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

app.get('/api/agents', (req, res) => {
    const sql = 'SELECT * FROM agents';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '4559',
        database: 'employees'
    },
    console.log('Connected to the employee database.')
);

module.exports = db;
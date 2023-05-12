const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig.json');
const moment = require('moment');

async function connectToDatabase() {
    return await mysql.createConnection(dbConfig);
}

router.get('/', async (req, res) => {
    const connection = await connectToDatabase();
    const [rows] = await connection.query(`SELECT * FROM Customers`);
    rows.forEach(row => row.dob = moment(row.dob).format('YYYY-MM-DD')); // Format the date
    res.render('tables/customers', {rows});
    connection.end();
});

router.post('/', async (req, res) => {
    const { fname, lname, email, ssn, address } = req.body;
    const connection = await connectToDatabase();
    await connection.query(`INSERT INTO Customers (fname, lname, email, ssn, address) VALUES (?, ?, ?, ?, ?)`, [fname, lname, email, ssn, address]);
    connection.end();
    res.redirect('/customers');
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, ssn, address } = req.body;
    const connection = await connectToDatabase();
    await connection.query(`UPDATE Customers SET fname = ?, lname = ?, email = ?, ssn = ?, address = ? WHERE customerID = ?`, [fname, lname, email, ssn, address, id]);
    connection.end();
    res.redirect('/customers');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await connectToDatabase();
    await connection.query(`DELETE FROM Customers WHERE customerID = ?`, [id]);
    connection.end();
    res.redirect('/customers');
});

module.exports = router;

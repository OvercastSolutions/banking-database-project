const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const moment = require('moment'); // Import moment.js
const dbConfig = require('../dbConfig.json');

async function connectToDatabase() {
    return await mysql.createConnection(dbConfig);
}

router.get('/', async (req, res) => {
    const connection = await connectToDatabase();
    const [rows] = await connection.query(`SELECT * FROM Certificates`);
    res.render('tables/certificates', {rows});
    connection.end();
});

router.post('/', async (req, res) => {
    const { ownerID, startDate, endDate, amount, rate } = req.body;
    // Format dates using moment.js
    const startDateFormatted = moment(startDate, 'MM-DD-YYYY').format('YYYY-MM-DD');
    const endDateFormatted = moment(endDate, 'MM-DD-YYYY').format('YYYY-MM-DD');
    const connection = await connectToDatabase();
    await connection.query(`INSERT INTO Certificates (ownerID, startDate, endDate, amount, rate) VALUES (?, ?, ?, ?, ?)`, [ownerID, startDateFormatted, endDateFormatted, amount, rate]);
    connection.end();
    res.redirect('/certificates');
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { ownerID, startDate, endDate, amount, rate } = req.body;
    // Format dates using moment.js
    const startDateFormatted = moment(startDate, 'MM-DD-YYYY').format('YYYY-MM-DD');
    const endDateFormatted = moment(endDate, 'MM-DD-YYYY').format('YYYY-MM-DD');
    const connection = await connectToDatabase();
    await connection.query(`UPDATE Certificates SET ownerID = ?, startDate = ?, endDate = ?, amount = ?, rate = ? WHERE certificateID = ?`, [ownerID, startDateFormatted, endDateFormatted, amount, rate, id]);
    connection.end();
    res.redirect('/certificates');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await connectToDatabase();
    await connection.query(`DELETE FROM Certificates WHERE certificateID = ?`, [id]);
    connection.end();
    res.redirect('/certificates');
});

module.exports = router;

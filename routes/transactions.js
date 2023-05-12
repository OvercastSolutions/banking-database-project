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
    const [rows] = await connection.query(`SELECT * FROM Transactions`);
    rows.forEach(row => row.tstamp = moment(row.tstamp).format('YYYY-MM-DD HH:mm:ss')); // Format the datetime
    res.render('tables/transactions', {rows});
    connection.end();
});

router.post('/', async (req, res) => {
    const { amount, tstamp, sourceID, destID, statusID } = req.body;
    const formattedTstamp = moment(tstamp, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'); // Format the user input datetime
    const connection = await connectToDatabase();
    await connection.query(`INSERT INTO Transactions (amount, tstamp, sourceID, destID, statusID) VALUES (?, ?, ?, ?, ?)`, [amount, formattedTstamp, sourceID, destID, statusID]);
    connection.end();
    res.redirect('/transactions');
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { amount, tstamp, sourceID, destID, statusID } = req.body;
    const formattedTstamp = moment(tstamp, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'); // Format the user input datetime
    const connection = await connectToDatabase();
    await connection.query(`UPDATE Transactions SET amount = ?, tstamp = ?, sourceID = ?, destID = ?, statusID = ? WHERE transactionID = ?`, [amount, formattedTstamp, sourceID, destID, statusID, id]);
    connection.end();
    res.redirect('/transactions');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await connectToDatabase();
    await connection.query(`DELETE FROM Transactions WHERE transactionID = ?`, [id]);
    connection.end();
    res.redirect('/transactions');
});

module.exports = router;

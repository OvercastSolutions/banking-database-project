const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig.json');

async function connectToDatabase() {
    return await mysql.createConnection(dbConfig);
}

router.get('/', async (req, res) => {
    const connection = await connectToDatabase();
    const [rows] = await connection.query(`SELECT * FROM Accounts`);
    res.render('tables/accounts', {rows});
    connection.end();
});

router.post('/', async (req, res) => {
    const { name, balance } = req.body;
    const connection = await connectToDatabase();
    await connection.query(`INSERT INTO Accounts (name, balance) VALUES (?, ?)`, [name, balance]);
    connection.end();
    res.redirect('/accounts');
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, balance } = req.body;
    const connection = await connectToDatabase();
    await connection.query(`UPDATE Accounts SET name = ?, balance = ? WHERE accountID = ?`, [name, balance, id]);
    connection.end();
    res.redirect('/accounts');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await connectToDatabase();
    await connection.query(`DELETE FROM Accounts WHERE accountID = ?`, [id]);
    connection.end();
    res.redirect('/accounts');
});

module.exports = router;

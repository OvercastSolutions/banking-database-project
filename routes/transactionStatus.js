const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig.json');

async function connectToDatabase() {
    return await mysql.createConnection(dbConfig);
}

router.get('/', async (req, res) => {
    const connection = await connectToDatabase();
    const [rows] = await connection.query(`SELECT * FROM TransactionStatus`);
    res.render('tables/transactionStatus', {rows});
    connection.end();
});

router.post('/', async (req, res) => {
    const { name, description } = req.body;
    const connection = await connectToDatabase();
    await connection.query(`INSERT INTO TransactionStatus (name, description) VALUES (?, ?)`, [name, description]);
    connection.end();
    res.redirect('/transactionStatus');
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const connection = await connectToDatabase();
    await connection.query(`UPDATE TransactionStatus SET name = ?, description = ? WHERE transactionID = ?`, [name, description, id]);
    connection.end();
    res.redirect('/transactionStatus');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await connectToDatabase();
    await connection.query(`DELETE FROM TransactionStatus WHERE transactionID = ?`, [id]);
    connection.end();
    res.redirect('/transactionStatus');
});

module.exports = router;

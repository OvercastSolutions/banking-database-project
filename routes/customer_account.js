const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig.json');

async function connectToDatabase() {
    return await mysql.createConnection(dbConfig);
}

router.get('/', async (req, res) => {
    const connection = await connectToDatabase();
    const [rows] = await connection.query(`SELECT * FROM Customer_Account`);
    res.render('tables/customer_account', {rows});
    connection.end();
});

module.exports = router;

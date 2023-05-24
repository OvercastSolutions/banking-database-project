const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

// Import your database configuration
const dbConfig = require('../dbConfig.json');

// Create a new connection pool using the imported configuration
const pool = mysql.createPool(dbConfig);

/* REQUIRES NODE 7.6.0+ 
// Add a new account (async/await)
router.post('/', async function(req, res) {
  const { accountID, name, balance } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [result] = await connection.execute('INSERT INTO Accounts (name, balance) VALUES (?, ?)', [name, balance]);

    await connection.commit();
    connection.release();

    res.json({ status: 'success', message: 'Account added successfully', accountID: result.insertId });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to add account' });
    console.error(error);
  }
});
*/

// Add a new account
router.post('/', function(req, res) {
  const { accountID, name, balance } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(() => {
      connection.execute('INSERT INTO Accounts (name, balance) VALUES (?, ?)', [name, balance]).then(([result]) => {
        connection.commit();
        connection.release();

        res.json({ status: 'success', message: 'Account added successfully', accountID: result.insertId });
      });
    }).catch(function(error) {
      connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to add account' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to add account' });
    console.error(error);
  });
});

/* REQUIRES NODE 7.6.0+
// Edit an existing account
router.put('/', async function(req, res) {
  const { accountID, name, balance } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    await connection.execute('UPDATE Accounts SET name = ?, balance = ? WHERE accountID = ?', [name, balance, accountID]);

    await connection.commit();
    connection.release();

    res.json({ status: 'success', message: 'Account updated successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to update account' });
    console.error(error);
  }
});
*/

// Edit an existing account
router.put('/', function(req, res) {
  const { accountID, name, balance } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(function() {
      connection.execute('UPDATE Accounts SET name = ?, balance = ? WHERE accountID = ?', [name, balance, accountID]).then(function() {
        connection.commit();
        connection.release();
        res.json({ status: 'success', message: 'Account updated successfully' });
      });
    }).catch(function(error) {
      if (connection) connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to update account' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to update account' });
    console.error(error);
  });
});

/* REQUIRES NODE 7.6.0+
// Delete an account
router.delete('/', async function(req, res) {
  const { accountID } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    await connection.execute('DELETE FROM Accounts WHERE accountID = ?', [accountID]);

    await connection.commit();
    connection.release();

    res.json({ status: 'success', message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to delete account' });
    console.error(error);
  }
});
*/

// Delete an account
router.delete('/', function(req, res) {
  const { accountID } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(function() {
      connection.execute('DELETE FROM Accounts WHERE accountID = ?', [accountID]).then(function() {
        connection.commit();
        connection.release();
        res.json({ status: 'success', message: 'Account deleted successfully' });
      });
    }).catch(function(error) {
      if (connection) connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to delete account' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to delete account' });
    console.error(error);
  });
});

module.exports = router;

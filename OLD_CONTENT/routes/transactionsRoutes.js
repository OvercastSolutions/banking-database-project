const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

// Import your database configuration
const dbConfig = require('../dbConfig.json');

// Create a new connection pool using the imported configuration
const pool = mysql.createPool(dbConfig);

// Add a new transaction
router.post('/', function(req, res) {
  const { transactionID, amount, tstamp, sourceID, destID, statusID } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(() => {
      connection.execute(
          'INSERT INTO Transactions (amount, tstamp, sourceID, destID, statusID) VALUES (?, ?, ?, ?, ?)',
          [amount, tstamp, sourceID, destID, statusID])
      .then(([result]) => {
        connection.commit();
        connection.release();

        res.json({ status: 'success', message: 'Transactions added successfully', transactionID: result.insertId });
      });
    }).catch(function(error) {
      connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to add transaction' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to add transaction' });
    console.error(error);
  });
});


// Edit an existing transaction
router.put('/', function(req, res) {
  var transactionID = req.body.transactionID;
  var amount = req.body.amount;
  var tstamp = req.body.tstamp;
  var sourceID = req.body.sourceID;
  var destID = req.body.destID;
  var statusID = req.body.statusID;

  var query = 'UPDATE Transactions SET ';
  var params = [];
  
  if (amount !== null && amount !== undefined && amount !== '') {
    query += 'amount = ?, ';
    params.push(amount);
  }
  if (tstamp !== null && lname !== undefined && lname !== '') {
    query += 'lname = ?, ';
    params.push(lname);
  }
  if (sourceID !== null && sourceID !== undefined && sourceID !== '') {
    query += 'sourceID = ?, ';
    params.push(email);
  }
  if (destID !== null && destID !== undefined && destID !== '') {
    query += 'destID = ?, ';
    params.push(ssn);
  }
  if (statusID !== null && statusID !== undefined && statusID !== '') {
    query += 'statusID = ?, ';
    params.push(statusID);
  }
  
  // remove last comma and space
  query = query.slice(0, -2);
  
  query += ' WHERE transactionID = ?';
  params.push(transactionID);

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(function() {
      connection.execute(query, params).then(function() {
        connection.commit();
        connection.release();
        res.json({ status: 'success', message: 'Transaction updated successfully' });
      });
    }).catch(function(error) {
      if (connection) connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to update transaction' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to update transaction' });
    console.error(error);
  });
});


// Delete an transaction
router.delete('/', function(req, res) {
  const { transactionID } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(function() {
      connection.execute('DELETE FROM Transactions WHERE transactionID = ?', [transactionID]).then(function() {
        connection.commit();
        connection.release();
        res.json({ status: 'success', message: 'Transaction deleted successfully' });
      });
    }).catch(function(error) {
      if (connection) connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to delete transaction' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to delete transaction' });
    console.error(error);
  });
});

module.exports = router;

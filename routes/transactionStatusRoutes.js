const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

// Import your database configuration
const dbConfig = require('../dbConfig.json');

// Create a new connection pool using the imported configuration
const pool = mysql.createPool(dbConfig);

// Add a new transaction status
router.post('/', function(req, res) {
  const { statusID, ownerID, startDate, endDate, amount, rate } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(() => {
      connection.execute(
          'INSERT INTO TransactionStatus (ownerID, startDate, endDate, amount, rate) VALUES (?, ?, ?, ?, ?)',
          [ownerID, startDate, endDate, amount, rate])
      .then(([result]) => {
        connection.commit();
        connection.release();

        res.json({ status: 'success', message: 'TransactionStatus added successfully', statusID: result.insertId });
      });
    }).catch(function(error) {
      connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to add transaction status' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to add transaction status' });
    console.error(error);
  });
});


// Edit an existing transaction status
router.put('/', function(req, res) {
  var statusID = req.body.statusID;
  var name = req.body.name;
  var descrtiption = req.body.descrtiption;

  var query = 'UPDATE TransactionStatus SET ';
  var params = [];
  
  if (statusID !== null && statusID !== undefined && statusID !== '') {
    query += 'statusID = ?, ';
    params.push(statusID);
  }
  if (name !== null &&  name !== undefined && name !== '') {
    query += 'name = ?, ';
    params.push(name);
  }
  if (descrtiption !== null && descrtiption !== undefined && descrtiption !== '') {
    query += 'description = ?, ';
    params.push(descrtiption);
  }
  
  // remove last comma and space
  query = query.slice(0, -2);
  
  query += ' WHERE statusID = ?';
  params.push(statusID);

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(function() {
      connection.execute(query, params).then(function() {
        connection.commit();
        connection.release();
        res.json({ status: 'success', message: 'Transaction status updated successfully' });
      });
    }).catch(function(error) {
      if (connection) connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to update transaction status' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to update transaction status' });
    console.error(error);
  });
});


// Delete an transaction status
router.delete('/', function(req, res) {
  const { statusID } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(function() {
      connection.execute('DELETE FROM TransactionStatus WHERE statusID = ?', [statusID]).then(function() {
        connection.commit();
        connection.release();
        res.json({ status: 'success', message: 'TransactionStatus deleted successfully' });
      });
    }).catch(function(error) {
      if (connection) connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to delete transaction status' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to delete transaction status' });
    console.error(error);
  });
});

module.exports = router;

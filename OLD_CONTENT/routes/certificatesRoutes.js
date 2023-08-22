const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

// Import your database configuration
const dbConfig = require('../dbConfig.json');

// Create a new connection pool using the imported configuration
const pool = mysql.createPool(dbConfig);

// Add a new certificate
router.post('/', function(req, res) {
  const { certificateID, ownerID, startDate, endDate, amount, rate } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(() => {
      connection.execute(
          'INSERT INTO Certificates (ownerID, startDate, endDate, amount, rate) VALUES (?, ?, ?, ?, ?)',
          [ownerID, startDate, endDate, amount, rate])
      .then(([result]) => {
        connection.commit();
        connection.release();

        res.json({ status: 'success', message: 'Certificates added successfully', certificateID: result.insertId });
      });
    }).catch(function(error) {
      connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to add certificate' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to add certificate' });
    console.error(error);
  });
});


// Edit an existing certificate
router.put('/', function(req, res) {
  var certificateID = req.body.certificateID;
  var ownerID = req.body.ownerID;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  var amount = req.body.amount;
  var rate = req.body.rate;

  var query = 'UPDATE Certificates SET ';
  var params = [];
  
  if (ownerID !== null && ownerID !== undefined && ownerID !== '') {
    query += 'ownerID = ?, ';
    params.push(ownerID);
  }
  if (startDate !== null && startDate !== undefined && startDate !== '') {
    query += 'startDate = ?, ';
    params.push(startDate);
  }
  if (endDate !== null && endDate !== undefined && endDate !== '') {
    query += 'endDate = ?, ';
    params.push(endDate);
  }
  if (amount !== null && amount !== undefined && amount !== '') {
    query += 'amount = ?, ';
    params.push(amount);
  }
  if (rate !== null && rate !== undefined && rate !== '') {
    query += 'rate = ?, ';
    params.push(rate);
  }
  
  // remove last comma and space
  query = query.slice(0, -2);
  
  query += ' WHERE certificateID = ?';
  params.push(certificateID);

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(function() {
      connection.execute(query, params).then(function() {
        connection.commit();
        connection.release();
        res.json({ status: 'success', message: 'Certificate updated successfully' });
      });
    }).catch(function(error) {
      if (connection) connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to update certificate' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to update certificate' });
    console.error(error);
  });
});


// Delete an certificate
router.delete('/', function(req, res) {
  const { certificateID } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(function() {
      connection.execute('DELETE FROM Certificates WHERE certificateID = ?', [certificateID]).then(function() {
        connection.commit();
        connection.release();
        res.json({ status: 'success', message: 'Certificate deleted successfully' });
      });
    }).catch(function(error) {
      if (connection) connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to delete certificate' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to delete certificate' });
    console.error(error);
  });
});

module.exports = router;

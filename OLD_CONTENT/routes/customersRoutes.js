const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

// Import your database configuration
const dbConfig = require('../dbConfig.json');

// Create a new connection pool using the imported configuration
const pool = mysql.createPool(dbConfig);

// Add a new customer
router.post('/', function(req, res) {
  const { customerID, fname, lname, email, ssn, addr } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(() => {
      connection.execute(
          'INSERT INTO Customers (fname, lname, email, ssn, addr) VALUES (?, ?, ?, ?, ?)',
          [fname, lname, email, ssn, addr])
      .then(([result]) => {
        connection.commit();
        connection.release();

        res.json({ status: 'success', message: 'Customers added successfully', customerID: result.insertId });
      });
    }).catch(function(error) {
      connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to add customer' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to add customer' });
    console.error(error);
  });
});


// Edit an existing customer
router.put('/', function(req, res) {
  var customerID = req.body.customerID;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var ssn = req.body.ssn;
  var addr = req.body.addr;

  var query = 'UPDATE Customers SET ';
  var params = [];
  
  if (fname !== null && fname !== undefined && fname !== '') {
    query += 'fname = ?, ';
    params.push(fname);
  }
  if (lname !== null && lname !== undefined && lname !== '') {
    query += 'lname = ?, ';
    params.push(lname);
  }
  if (email !== null && email !== undefined && email !== '') {
    query += 'email = ?, ';
    params.push(email);
  }
  if (ssn !== null && ssn !== undefined && ssn !== '') {
    query += 'ssn = ?, ';
    params.push(ssn);
  }
  if (addr !== null && addr !== undefined && addr !== '') {
    query += 'addr = ?, ';
    params.push(addr);
  }
  
  // remove last comma and space
  query = query.slice(0, -2);
  
  query += ' WHERE customerID = ?';
  params.push(customerID);

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(function() {
      connection.execute(query, params).then(function() {
        connection.commit();
        connection.release();
        res.json({ status: 'success', message: 'Customer updated successfully' });
      });
    }).catch(function(error) {
      if (connection) connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to update customer' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to update customer' });
    console.error(error);
  });
});


// Delete an customer
router.delete('/', function(req, res) {
  const { customerID } = req.body;

  pool.getConnection().then(function(connection) {
    connection.beginTransaction().then(function() {
      connection.execute('DELETE FROM Customers WHERE customerID = ?', [customerID]).then(function() {
        connection.commit();
        connection.release();
        res.json({ status: 'success', message: 'Customer deleted successfully' });
      });
    }).catch(function(error) {
      if (connection) connection.release();
      res.status(500).json({ status: 'error', message: 'Failed to delete customer' });
      console.error(error);
    });
  }).catch(function(error) {
    res.status(500).json({ status: 'error', message: 'Failed to delete customer' });
    console.error(error);
  });
});

module.exports = router;

// Import required modules
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

// Read the database configuration from the private JSON file
const dbConfig = JSON.parse(fs.readFileSync('dbConfig.json', 'utf8'));

// Get the MySQL module
const mysql = require('mysql');
// Create a connection pool to the MySQL server
var pool = mysql.createPool(dbConfig);

// Initialize the Express app
const app = express();

// Set up the Handlebars view engine
const hbs = exphbs.create({ 
    extname: '.hbs', 
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Set up the public directory to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the home page
app.get('/', (req, res) => {
  res.render('home', { title: 'Banking Database Project' });
});

// Define another route for the home page
app.get('/index.html', (req, res) => {
  res.render('home', { title: 'Banking Database Project' });
})

// Define routes for other pages
app.get('/accounts', (req, res) => {
  pool.query('SELECT * FROM Accounts', (error, results) => {
    if (error) throw error;
    res.render('partials/accounts', { accounts: results });
  });
});

app.get('/transactions', (req, res) => {
  pool.query('SELECT * FROM Transactions', (error, results) => {
    if (error) throw error;
    res.render('partials/transactions', { transactions: results });
  });
});

app.get('/transactionstatus', (req, res) => {
  pool.query('SELECT * FROM TransactionStatus', (error, results) => {
    if (error) throw error;
    res.render('partials/transactionStatus', { transactionStatus: results });
  });
});

app.get('/customers', (req, res) => {
  pool.query('SELECT * FROM Customers', (error, results) => {
    if (error) throw error;
    res.render('partials/customers', { customers: results });
  });
});

app.get('/certificates', (req, res) => {
  pool.query('SELECT * FROM Certificates', (error, results) => {
    if (error) throw error;
    res.render('partials/certificates', { certificates: results });
  });
});

app.get('/customer_account', (req, res) => {
  pool.query('SELECT * FROM Customer_Account', (error, results) => {
    if (error) throw error;
    res.render('partials/customer_account', { customer_account: results });
  });
});

app.get('/account_transaction', (req, res) => {
  pool.query('SELECT * FROM Account_Transaction', (error, results) => {
    if (error) throw error;
    res.render('partials/account_transaction', { account_transaction: results });
  });
});

// Define the route for the 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start the server
const port = process.env.PORT || 5382;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

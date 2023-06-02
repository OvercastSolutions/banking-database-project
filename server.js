// Import required modules
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const accountsRouter = require('./routes/accountsRoutes');
const transactionsRouter = require('./routes/transactionsRoutes');
const transactionStatusRouter = require('./routes/transactionStatusRoutes');
const customersRouter = require('./routes/customersRoutes');
const certificatesRouter = require('./routes/certificatesRoutes');

// Read the database configuration from the private JSON file
const dbConfig = JSON.parse(fs.readFileSync('dbConfig.json', 'utf8'));

// Get the MySQL module
const mysql = require('mysql');
// Create a connection pool to the MySQL server
var pool = mysql.createPool(dbConfig);

// Initialize the Express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Add routes to support CRUD operations on accounts
app.use('/api/accounts', accountsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/transactionStatus', transactionStatusRouter);
app.use('/api/customers', customersRouter);
app.use('/api/certificates', certificatesRouter);

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

// Define routes for join table pages, passing in the three appropriate tables
app.get('/customer_account', (req, res) => {
  pool.query('SELECT * FROM Customers', (error, customers) => {
    if (error) throw error;

    pool.query('SELECT * FROM Accounts', (error, accounts) => {
      if (error) throw error;

      pool.query('SELECT * FROM Customer_Account', (error, customer_account) => {
        if (error) throw error;

        res.render('partials/customer_account', {
          customers,
          accounts,
          customer_account
        });
      });
    });
  });
});

app.get('/account_transaction', (req, res) => {
  pool.query('SELECT * FROM Accounts', (error, accounts) => {
    if (error) throw error;

    pool.query('SELECT * FROM Transactions', (error, transactions) => {
      if (error) throw error;

      pool.query('SELECT * FROM Account_Transaction', (error, account_transaction) => {
        if (error) throw error;

        res.render('partials/account_transaction', {
          accounts,
          transactions,
          account_transaction
        });
      });
    });
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

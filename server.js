// Simple server file, runs on port 3000

// Required modules for the server using Node.js and Handlebars
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const handlebars = require('express-handlebars');

const app = express();

// Set up Handlebars
app.engine('hbs', handlebars({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', 'hbs');

// Set up Express and body-parser
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up MySQL database connection using credentials
const connection = mysql.createConnection({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database',
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to the database.');
});

// Set up routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/tables/:table', (req, res) => {
  const { table } = req.params;
  const validTables = ['accounts', 'transactions', 'transactionStatus', 'customers', 'certificates', 'customer_account', 'account_transaction'];

  if (validTables.includes(table)) {
    if (table === 'customer_account') {
      connection.query(`SELECT c.customerID, c.fname, c.lname, a.accountID, a.name as accountName, a.balance
                        FROM Customers c
                        JOIN Customer_Account ca ON c.customerID = ca.customerID
                        JOIN Accounts a ON a.accountID = ca.accountID`, (error, results) => {
        if (error) throw error;
        res.render(`tables/${table}`, { data: results });
      });
    } else if (table === 'account_transaction') {
      connection.query(`SELECT a.accountID, a.name as accountName, a.balance, t.transactionID, t.amount, t.timestamp, t.sourceID, t.destID, t.statusID
                        FROM Accounts a
                        JOIN Account_Transaction at ON a.accountID = at.accountID
                        JOIN Transactions t ON t.transactionID = at.transactionID`, (error, results) => {
        if (error) throw error;
        res.render(`tables/${table}`, { data: results });
      });
    } else {
      connection.query(`SELECT * FROM ${table}`, (error, results) => {
        if (error) throw error;
        res.render(`tables/${table}`, { data: results });
      });
    }
  } else {
    res.status(404).send('Table not found');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

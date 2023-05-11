// Server hosted on http://localhost:3000

const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

// Database connection configuration
const dbConfig = {
    host: 'your_host',
    user: 'your_user',
    password: 'your_password',
    database: 'your_database'
};

// Helper function to connect to the database
async function connectToDatabase() {
    return await mysql.createConnection(dbConfig);
}

// Home page route
app.get('/', (req, res) => {
    res.render('home');
});

// Table routes
const tables = ['accounts', 'transactions', 'transactionstatus', 'customers', 'certificates', 'customer_account', 'account_transaction'];

tables.forEach(table => {
  app.get(`/${table}`, async (req, res) => {
      const connection = await connectToDatabase();
      const [rows] = await connection.query(`SELECT * FROM ${table}`);
      res.render(`tables/${table}`, {rows});
      connection.end();
  });
});

// 404 catch-all route
app.use((req, res) => {
    res.status(404).render('404');
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

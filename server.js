/*
Documentation could be better inline but ran out of time for this draft.

Sources consulted for NodeJS and SQL:

Using MySQL:
https://www.w3schools.com/nodejs/nodejs_mysql.asp

Using npm express:
https://expressjs.com/en/starter/hello-world.html

Setting up handlebars:
https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
*/

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// These two lines allow us to access req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route files
const accountsRoutes = require('./routes/accounts');
const transactionsRoutes = require('./routes/transactions');
const transactionStatusRoutes = require('./routes/transactionStatus');
const customersRoutes = require('./routes/customers');
const certificatesRoutes = require('./routes/certificates');
const customerAccountRoutes = require('./routes/customer_account');
const accountTransactionRoutes = require('./routes/account_transaction');
const { strictEqual } = require('assert');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Sets handlebars configurations
const hbs = handlebars.create({
    partialsDir: [
        path.join(__dirname, 'views', 'partials'),
        path.join(__dirname, 'views', 'tables')
    ],
    defaultLayout: 'main',
    extname: '.hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Use route files
app.use('/accounts', accountsRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/transactionStatus', transactionStatusRoutes);
app.use('/customers', customersRoutes);
app.use('/certificates', certificatesRoutes);
app.use('/customer_account', customerAccountRoutes);
app.use('/account_transaction', accountTransactionRoutes);

// Home page route
app.get('/', (req, res) => {
    res.render('home');
});

// 404 catch-all route
app.use((req, res) => {
    res.status(404).render('404');
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

/*

TODO 

RESET SERVER.JS TO ONLY WORK IN FRONT END AND REDO NPM INSTALLS

USE /views TO RENDER PAGES
`home.hbs` is the home page
/views/tables are partials to be completed by header and footer files

404 FUNCTIONALITY OPTIONAL
MOVE ALL .HBS INTO ONE FILE IF ABOSLUTELY NECESSARY
*/
// Import required modules
const express = require('express');
const xhbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

// Read the database configuration from the private JSON file
const dbConfig = JSON.parse(fs.readFileSync('dbConfig.json', 'utf8'));

// Create a new MySQL connection
/* TODO: GET THIS TO WORK
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});
*/

// Initialize the Express app
const app = express();

// Set up the Handlebars view engine
const hbs = xhbs.create({ extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts') });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Set up the public directory to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the home page
app.get('/', (req, res) => {
  res.render('home', { title: 'Banking Database Project' });
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

// Gracefully close the MySQL connection when the server is stopped
/* TODO: GET THIS TO WORK
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit();
  });
});
*/

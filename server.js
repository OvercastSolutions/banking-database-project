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
    layoutsDir: path.join(__dirname, 'views/layouts')
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Manually register partials
// TODO: Replace this messy ChatGPT solution with a better one
const partialsDir = path.join(__dirname, 'views/partials');
fs.readdirSync(partialsDir).forEach(function(filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
        return;
    }
    var name = matches[1];
    var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    hbs.handlebars.registerPartial(name, template);
});

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

// TODO: Gracefully close the MySQL connection when the server is stopped
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

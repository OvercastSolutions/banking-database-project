const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Import route files
const accountsRoutes = require('./routes/accounts');
// ... Import the rest of the route files here...

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars
const hbs = exphbs.create({
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
// Insert the rest of the route files here...

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

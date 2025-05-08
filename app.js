const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'kids-learning-secret',
  resave: false,
  saveUninitialized: true,
}));

// Set up EJS and layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'partials/layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Routes for different learning modules
app.get('/', (req, res) => {
  res.render('index', { title: 'Kids Learning App' });
});

app.get('/alphabet', (req, res) => {
  res.render('alphabet', { title: 'Learn the Alphabet' });
});

app.get('/numbers', (req, res) => {
  res.render('numbers', { title: 'Learn Numbers' });
});

app.get('/colors', (req, res) => {
  res.render('colors', { title: 'Learn Colors' });
});

app.get('/shapes', (req, res) => {
  res.render('shapes', { title: 'Learn Shapes' });
});

app.get('/animals', (req, res) => {
  res.render('animals', { title: 'Learn Animals' });
});

// Start the server with error handling for port already in use
const startServer = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use, trying port ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

// Initialize the server
startServer(PORT);
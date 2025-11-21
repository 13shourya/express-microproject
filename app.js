const express = require('express');
const path = require('path');
const app = express();
const PORT = 3002;

console.log(' Starting Express Microproject...');

// Serve static files from public directory
app.use(express.static('public'));

// Import JSON data
const productsData = require('./data/products.json');

// API route to serve JSON data
app.get('/api/products', (req, res) => {
    console.log('API Products endpoint hit');
    res.json(productsData);
});

// Routes for HTML pages - Express will automatically serve index.html from public folder
// No need for individual routes since we have HTML files in public folder

// Start server
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
    console.log(` Home page: http://localhost:${PORT}/`);
    console.log(` About page: http://localhost:${PORT}/about.html`);
    console.log(` API Demo: http://localhost:${PORT}/api-demo.html`);
    console.log(` API Endpoint: http://localhost:${PORT}/api/products`);
});
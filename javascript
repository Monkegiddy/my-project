const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (frontend HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Proxy handler: this will catch any request and forward it to the target URL
app.use('/proxy', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('Error: No URL provided.');
    }

    // Create a proxy middleware with dynamic target URL
    createProxyMiddleware({
        target: targetUrl,
        changeOrigin: true,  // Change the origin of the request to the target URL
        secure: false,      // Allow self-signed certificates
    })(req, res);
});

// Start the server
app.listen(port, () => {
    console.log(`Monkegid Proxy server running at http://localhost:${port}`);
});

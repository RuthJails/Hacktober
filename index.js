// Import the HTTP module
const http = require('http');

// Define the port to listen on
const PORT = 3000;

// Create a server object
const server = http.createServer((req, res) => {
  // Set Content-Type header for all responses
  res.setHeader('Content-Type', 'text/plain');

  // Simple routing logic
  if (req.url === '/') {
    res.writeHead(200);
    res.end('Hello, World!\n');
  } else if (req.url === '/about') {
    res.writeHead(200);
    res.end('This is the About page.\n');
  } else {
    res.writeHead(404);
    res.end('404 Not Found\n');
  }
});

// Start the server and listen on the specified port
server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

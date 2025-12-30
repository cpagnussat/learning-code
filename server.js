// Simple Node.js server for learning
// Built during daily coding sessions
const http = require('http');

let storedData = [];

const fs = require('fs');

const dataFile = 'data.json';

// Load data from file on startup
if (fs.existsSync(dataFile)) {
  const fileData = fs.readFileSync(dataFile, 'utf8');
  storedData = JSON.parse(fileData);
  console.log('Loaded existing data:', storedData);
}

function saveData() {
  fs.writeFileSync(dataFile, JSON.stringify(storedData, null, 2));
}


const server = http.createServer((request, response) => {
  console.log('Request received for:', request.url);
  
  if (request.url === '/') {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end('Error loading page');
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(data);
    }
  });
    
  } else if (request.url === '/about') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({message: 'This is the about page', version: 1}));
    
  } else if (request.url === '/data' && request.method === 'POST') {
  let body = '';
  
  request.on('data', chunk => {
    body += chunk;
  });
  
  request.on('end', () => {
    try {
      const data = JSON.parse(body);
      storedData.push(data);
      saveData();
      
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({success: true, stored: storedData}));
    } catch (error) {
      response.writeHead(400, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({error: 'Invalid JSON'}));
    }
  });
    
  } else if (request.url === '/data' && request.method === 'GET') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(storedData));
    
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Page not found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
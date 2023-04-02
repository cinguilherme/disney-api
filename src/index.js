const express = require('express');
const basicAuth = require('basic-auth');
const parser = require('body-parser');

const { authenticateToken, authenticateApiKey } = require('./auths-helpers');

const app = express();
const PORT = 3838;

app.use(parser.json());

// Endpoint 1 - Simple GET without auth
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint 2 - Simple GET with Basic Auth
app.get('/secure', (req, res) => {
  const user = basicAuth(req);
  if (!user || user.name !== 'admin' || user.pass !== 'admin') {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  res.send('You have access to secure endpoint!');
});

// Endpoint 3 - GET with Bearer Token
app.get('/protected', authenticateToken, (req, res) => {
  res.send('You have access to protected endpoint!');
});

// Endpoint 4 - GET with API Key
app.get('/apikey', authenticateApiKey, (req, res) => {
  res.send('You have access to API Key protected endpoint!');
});

// Enpoint 5 - GET with API Key in query string
app.get('/api/data', (req, res) => {
  const apiKey = req.query.apikey;
  if (apiKey !== 'MY_API_KEY') {
    res.status(401).send('Invalid API key');
  } else {
    // Your logic to return data
    res.send('Some data');
  }
});

// Enpoint 6 - POST with API Key in the body of post request
app.post('/api/data', (req, res) => {

  console.log(req.body);

  const apiKey = req.body.apikey;
  if (apiKey !== 'MY_API_KEY') {
    res.status(401).send('Invalid API key');
  } else {
    // Your logic to process the request
    res.send('Request processed successfully');
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

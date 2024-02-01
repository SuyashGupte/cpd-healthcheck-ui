const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express();
const port = 3000;


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cloudOptions = JSON.parse(fs.readFileSync("./options.json").toString())

// Define a route to render the EJS template
app.get('/', (req, res) => {
  res.render('index', { title: 'CPD-Healthcheck', cloudOptions: cloudOptions });
});

// API endpoint to close the server
app.post('/api/shutdown', (req, res) => {
  res.send('Shutting down the server...');
  // Close the server gracefully
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

app.post('/api/sendtasks', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  fs.writeFileSync('taskList.json', JSON.stringify(data))
  res.send('Shutting down the server...');
  // Close the server gracefully
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

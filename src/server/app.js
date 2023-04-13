const express = require('express');
const path = require('path');

const app = express();
const serverPort = 3000;

// Serve static files from the client folder
app.use(express.static(path.join(__dirname, '../client')));

// Start the server
app.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`);
});

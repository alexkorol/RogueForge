const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('src/client'));

http.listen(3000, () => {
  console.log('Listening on *:3000');
});

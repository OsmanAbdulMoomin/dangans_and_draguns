const express = require('express');
const  ws = require('ws');
const http = require('http');

const PORT = process.env.PORT || 8080;

const app = express();

const server = http.createServer(app);
//initialise ws server using the https server
const wsServer = new ws.Server({server});

//connect server
wsServer.on('connection', socket =>{

  //connected
  socket.on('message', message => {
    console.log(message);
    socket.send(`You sent : ${message}`)
  })

  socket.send('You have connected')
});

//spin up the server
server.listen(PORT, () => {
  console.log(`Server started on port ${server.address().port} (y)`)
})
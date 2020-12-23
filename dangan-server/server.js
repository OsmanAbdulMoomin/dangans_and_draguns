//create a http server
const http = require("http");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

// const server = app.listen(PORT, () => {
// console.log(`listneing on port : ${PORT}`);
// console.log(`http://localhost:${PORT}`);

// })

// app.use(express.static("public"));

const server = http.createServer(app);

//link server to socket io, create websocket
const io = require("socket.io")(server, {
  cors : {
    origin : "http://localhost:3000",
    methods : ["GET", "POST"]
  }
});


const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";



const activeUsers = new Set();

io.on( "connection", socket =>{
  console.log("socket connected");

  //join room
  const {roomId} = socket.handshake.query;

  socket.join(roomId);


 console.log(socket.id)

  //message listener
  socket.on(NEW_CHAT_MESSAGE_EVENT, data =>{
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on("new user", data =>{
    socket.userId = data;
    activeUsers.add(data);
    io.emit("new user", [...activeUsers])

  });


  // disconnect the socket, if user leaves
  socket.on("disconnect", ()=>{
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId)
    socket.leave(roomId);
  });

});


//spin up the server, tell us what port its begun on 
server.listen(PORT, () => {
  console.log(`Server started on port ${server.address().port} (y)`)
})
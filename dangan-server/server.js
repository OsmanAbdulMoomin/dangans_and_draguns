//create a http server
const http = require('http');
const server = http.createServer();

//link server to socket io, create websocket
const io = require("socket.io")(server, {
  cors : {
    origin : "http://localhost:3000",
    methods : ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";


io.on( "connection", socket =>{

  //join room
  const {roomId} = socket.handshake.query;
  socket.join(roomId);

  //message listener
  socket.on(NEW_CHAT_MESSAGE_EVENT, data =>{
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // disconnect the socket, if user leaves
  socket.on("disconnect", ()=>{
    socket.leave(roomId);
  });
});


//spin up the server, tell us what port its begun on 
server.listen(PORT, () => {
  console.log(`Server started on port ${server.address().port} (y)`)
})
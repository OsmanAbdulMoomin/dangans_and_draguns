import React, {useState, useEffect, useRef} from 'react';

import useViewport from "../hooks/useViewport";

import socketIOClient from 'socket.io-client';

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  TextField,
  Typography
} from '@material-ui/core';

import "./Room.css";


const Room = (props) => {
  //Get Room ID
  console.log(`my props are : ${props}`);
  const { roomname } = props.match.params;
  const {userName} = props.location.state;

  const {width, height} = useViewport();
  /////////////////////////////////////
  const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"
  const NEW_USER_EVENT ="newUser"
  ///////////SOCKET URL////////////////
  const SOCKET_SERVER_URL = "http://localhost:4000";
  ////////////////////////////////////
  const [messages, setMessages] = useState([]); //messages
  const [users, setUsers] = useState([]);
  ////////////////////////////////////
  const socketRef = useRef(); //use a reference to the socket rather than the socket
  
  useEffect(() =>{  
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: {roomname},
    });

     socketRef.current.emit(NEW_USER_EVENT, userName )


    }, [roomname]);

 
  console.log(roomname)
  console.log(`my username is : ${userName}`);

  //Manages Messaging - Opens Websocket

  
  
 

  //Message to be sent
  const [newMessage, setNewMessage] = useState("")
  
 

    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
    }
    //////////////HANDLES SENDING MESSAGE TO WEBSOCKET
     const sendMessage = (messageBody) =>
     
    {
      messageBody !== "" ? 
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, 
      {
      user: userName,
      body: messageBody,
      senderId: socketRef.current.id,
      })
      :
      alert("Cannot be empty");
    };

    const handleMessageSend = () => {
      sendMessage(newMessage);
      setNewMessage("");
    };

    

 
  useEffect(() => { 
  //create WebSocket
  socketRef.current.on('login', data =>{
  console.log(data)
  var currentUsers = [];
  for(let value of Object.values(data.users)){
    currentUsers.push(value);
  }
  setUsers(currentUsers)
  console.log(users)
// setUsers(users => [...users, data.users]);
} )

socketRef.current.on('update', (data)=>{
  var currentUsers = [];
  for(let value of Object.values(data)){
    currentUsers.push(value);
  }
  setUsers(currentUsers)
  console.log(users)

})
   
   
  //message listener
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, message => {
    const incomingMessage ={
      ...message,
      ownedByCurrentUser: message.senderId === socketRef.current.id,
    };
   
    setMessages(messages => [...messages, incomingMessage]);
  });

  // socketRef.current.on(USERNAME, username =>{
  //   const
  // })

  //cleanup, remove socket if connection closes
    return () =>{
    socketRef.current.disconnect();
  };
   }, [roomname]);

  return (  
  <Grid id = "room-container" container xs = {12} style = {{border : "2px solid red", height : height}}>
    <Grid id = "social-interaction-container" item container xs = {4} style = {{border : "2px solid yellow", height : height}}>
      <Grid id = "room-player-message-container" direction = "column" item container xs = {12} style = {{border : "2px solid green", height : height}}>
      <Grid item xs = {2} style = {{border : "2px solid pink", maxWidth : "100%"}}  zeroMinWidth>
      <Box flexGrow={1}>
        <Typography variant = "h2" > {`Room : ${roomname}`} </Typography> 
        </Box>
      </Grid>
       <Grid item xs={5} style = {{border : "2px solid pink", maxWidth : "100%"}}>
          <List className="message-list" fullWidth>
       {users.map((user, i) => (
         <ListItem key={i}
         className = "message-item player" style={{color :"black"}}>
          <Typography variant="body1" fullWidth> {user} </Typography>
         </ListItem>
       ))}
          </List>

       </Grid>

       <Grid direction = "column" item container xs={5} style = {{border : "2px solid pink", maxWidth : "100%"}}>
        <Grid item xs = {8} style={{maxWidth : "100%" , maxHeight: "100%"}}>

          <List className="message-list" fullWidth>
       {messages.map((message, i) => (
         <ListItem key={i}
         className={`message-item ${message.ownedByCurrentUser ? "my-message" : "received-message"}`} >
         <Typography variant="body1" fullWidth> {`${message.user} : ${message.body}`} </Typography>
         </ListItem>
       ))} 
          </List>

        </Grid>
        <Grid direction="column" item container xs = {4} style = {{border : "2px solid pink", maxWidth : "100%"}}>
          <Grid item xs ={6} style = {{border : "2px solid pink", maxWidth : "100%"}}> 
            <TextField value={newMessage} onChange={handleNewMessageChange} placeholder="Write message..." className="new-message-field" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs ={6} style = {{border : "2px solid pink", maxWidth : "100%", maxHeight :"100%"}}> 
            <Button onClick={handleMessageSend}  fullWidth  variant="contained" color="primary" size = "large">
            Send
            </Button>
          </Grid>
        </Grid>
       </Grid>
  
    </Grid>
    </Grid>
      <Grid item  alignItems="center" xs = {8} style = {{border : "2px solid pink", maxWidth : "100%", maxHeight :"100%"}} >
        <Paper style = {{border : "2px solid green", maxWidth : "100%", maxHeight :"100%", height : "100%"}}>
          <Typography> SPACE FOR MAP </Typography>
        </Paper>
      </Grid> 
  
  

  </Grid> 
  );

}

export default Room; 
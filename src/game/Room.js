import React, {useState, useEffect, useRef} from 'react';

// import useChat from "../hooks/useChat";

import socketIOClient from 'socket.io-client';

import {
  Box,
  Button,
  Container,
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
  
  const [playerList] = useState([]);

    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
    }
    //////////////HANDLES SENDING MESSAGE TO WEBSOCKET
     const sendMessage = (messageBody) =>
    {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, 
      {
      user: userName,
      body: messageBody,
      senderId: socketRef.current.id,
      });

    }

    const handleMessageSend = () =>{
      sendMessage(newMessage);
      setNewMessage("");
    }

    

 
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


      return (<Container>
      <Box className="chat-room-container">
      <Typography variant="h1" className="room-name">
      Room : {roomname}
      </Typography>
      <Box className="messages-container">
      <List className="message-list">
      {messages.map((message, i) => (
        <ListItem key={i}
        className={`message-item ${message.ownedByCurrentUser ? "my-message" : "received-message"}`}>
        {`${message.user} : ${message.body}`}
        </ListItem>
      ))} 
      </List>
      </Box>
       <Box className="messages-container">
      <List className="message-list">
      {users.map((user, i) => (
        <ListItem key={i}
        className={`message-item ${ "received-message"}`} style={{color :"black"}}>
        {user}
        </ListItem>
      ))}
      </List>
      </Box>
     
      <TextField
      value={newMessage}
      onChange={handleNewMessageChange}
      placeholder="Write message..."
      className="new-message-field"/>

      <Button onClick={handleMessageSend} className="send-message-button">
      Send
      </Button>
      <Button onClick={()=>{console.log(users) }}>users? </Button>
      </Box>
      
      </Container>);

}

// const clientRef = useRef();
// const [data, setData] = useState();
// const [input, setInput] = useState('');
// const [messageHistory, setMessageHistory] = useState([])
// useEffect(() => {

//   if(client){
//     client.onerror = client.onopen = client.onclose = null;
//     client.close();
//   }
//   //crate new client  (port we open the app on);
//   const client = new WebSocket('ws://localhost:8080');
  
//   //add client ref to clientRef();
//   clientRef.current = client;

//   clientRef.current.onopen = () => {
//     clientRef.current.send('Connected to server');
//   }

//   clientRef.current.onerror = (error) => {
//     console.log('Error' + error)
//   };

//   clientRef.current.onmessage = (message) => {
//     messageHistory.push(`${message.data}\n\n`)
//     setData(message.data)
//   }
//   //remove socket onclose
//   clientRef.current.onclose = ( ) =>{
//     clientRef.current = null;
//   }
//   //close socket
//   return () => clientRef.current.close();

// }, []);

// const handleInputChange = (event) =>{
  
//   event.preventDefault();
//   const input = event.target.value;
//   console.log(input);
//   setInput(input);
// };

// const sendMessage = (input) => {
//     console.log(input)
//       clientRef.current.send(input);
//       input = ''
// }
 


// return(
 
//   <Container>
//   <Grid container xs={12}>
//   <Grid item xs={10}>
//   <Input onChange={(event=>{handleInputChange(event)})}> </Input>
//   </Grid>
//   <Grid item xs={2}>
//   <Button 
//   id="send"
//   title="Send Message"
//   color="primary"
//   onClick={()=>{
//     sendMessage(input);
//   }}>
//   Send Message
//   </Button>
//   </Grid>
//   </Grid>

//   <Grid container xs = {12} >
//   <Grid item xs={12}>
//   <Typography>Responses from server below</Typography>
//   </Grid>
//   <Grid item xs ={12}>
//   <Typography style={{height : "400px"}}>
//   {data}
//   </Typography>
//   </Grid>
//    </Grid>

//   </Container>
// );}

 


export default Room; 
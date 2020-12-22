import React, {useState} from 'react';

import useChat from "../hooks/useChat";

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


const Map = (props) => {
  //Get Room ID
  console.log(props);
  const { roomname } = props.match.params;
  //Manages Messaging - Opens Websocket
  const {messages, sendMessage} = useChat(roomname);
  //Message to be sent
  const [newMessage, setNewMessage] = useState("")

    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
    }

    const handleMessageSend = () =>{
      sendMessage(newMessage);
      setNewMessage("");
    }

      return (<Container>
      <Box className="chat-room-container">
      <Typography variant="h1" className="room-name">
      Room : {roomname}
      </Typography>
      <Box className="messages-container">
      <List className="message-list">
      {messages.map((message, i) => (
        <ListItem key={i}
        className={`message-item${message.ownedByCurrentUser ? "my-message" : "recieved-message"}`}>
        {message.body}
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
      </Box>
      
      </Container>);

}


 


export default Map; 
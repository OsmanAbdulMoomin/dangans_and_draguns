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


const Room = (props) => {
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
import React, {useEffect, useRef, useState, setState} from 'react';

import useChat from "../hooks/useChat";

import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Typography
} from '@material-ui/core';


const Room = (props) => {

  
const clientRef = useRef();
const [data, setData] = useState();
const [input, setInput] = useState('');
const [messageHistory, setMessageHistory] = useState([])
useEffect(() => {

  if(client){
    client.onerror = client.onopen = client.onclose = null;
    client.close();
  }
  //crate new client  (port we open the app on);
  const client = new WebSocket('ws://localhost:8080');
  
  //add client ref to clientRef();
  clientRef.current = client;

  clientRef.current.onopen = () => {
    clientRef.current.send('Connected to server');
  }

  clientRef.current.onerror = (error) => {
    console.log('Error' + error)
  };

  clientRef.current.onmessage = (message) => {
    messageHistory.push(`${message.data}\n\n`)
    setData(message.data)
  }
  //remove socket onclose
  clientRef.current.onclose = ( ) =>{
    clientRef.current = null;
  }
  //close socket
  return () => clientRef.current.close();

}, []);

const handleInputChange = (event) =>{
  
  event.preventDefault();
  const input = event.target.value;
  console.log(input);
  setInput(input);
};

const sendMessage = (input) => {
    console.log(input)
      clientRef.current.send(input);
      input = ''
}
 


return(
 
  <Container>
  <Grid container xs={12}>
  <Grid item xs={10}>
  <Input onChange={(event=>{handleInputChange(event)})}> </Input>
  </Grid>
  <Grid item xs={2}>
  <Button 
  id="send"
  title="Send Message"
  color="primary"
  onClick={()=>{
    sendMessage(input);
  }}>
  Send Message
  </Button>
  </Grid>
  </Grid>

  <Grid container xs = {12} >
  <Grid item xs={12}>
  <Typography>Responses from server below</Typography>
  </Grid>
  <Grid item xs ={12}>
  <Typography style={{height : "400px"}}>
  {data}
  </Typography>
  </Grid>
   </Grid>

  </Container>
);

 
}

export default Room; 
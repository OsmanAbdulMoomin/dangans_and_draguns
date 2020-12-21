import React, {useState} from "react";

import {Link} from "react-router-dom";

import {Box, Button, Container, Grid, TextField  } from "@material-ui/core";

import "./HomePage.css";

const HomePage = () =>{
const [roomName, setRoomName] = useState("");

const handleRoomChange = (event) =>{
  setRoomName(event.target.value);
}

return (
  <Container >
  <Box className="home-container">
  
  <TextField className="text-input-field" type="text" placeholder="Room" value={roomName} onChange={handleRoomChange} />

  
  
<Button className="enter-room-button" component={Link} to={`/${roomName}`}> Enter Room</Button>

  </Box>

  </Container>
)

}

export default HomePage;
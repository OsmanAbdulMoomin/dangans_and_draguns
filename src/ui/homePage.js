import React, {useState} from "react";

import {Link} from "react-router-dom";

import {Box, Button, Container, Grid, TextField, FormControl  } from "@material-ui/core";



import "./HomePage.css";

const HomePage = () => {

const [roomId, setRoomId] = useState("");
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");

const [error, setError] = useState(true);

const handleRoomChange = (event) =>{
  setRoomId(event.target.value);
  checkForm(roomId, userName);
}

const handleNameChange = (event) =>{
  setUserName(event.target.value);
  checkForm(roomId, userName);
}

const handlePasswordChange = (event) =>{
  setPassword(event.target.value);
}

const checkForm = (roomId, userName) =>{
  var error = false;
  if (roomId === "" || userName === ""){
    error = true;
  }

  setError(error)
}

return (
  <Container >
  <Grid container>
  <Box className="home-container">
  <FormControl>

  <TextField error={error} className="text-input-field" type="text" placeholder="Room" value={roomId} onChange={handleRoomChange} />
  <TextField error = {error} className="text-input-field" type="text" placeholder="Username" value={userName} onChange={handleNameChange}/>

  </FormControl>
  {!error &&
<Button color="primary" variant="contained" className="enter-room-button" component={Link} to={{pathname : `/${roomId}`, state : {
  userName }}}> Enter Room</Button>
}
  </Box>
</Grid>
  </Container>
)

}

export default HomePage;
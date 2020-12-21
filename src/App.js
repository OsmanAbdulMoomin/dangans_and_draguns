import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";


//Homepage, where we make  the games, add amount of players, etc.
import HomePage from './ui/HomePage'

//Actual Room Page
import Room from "./game/Room.js"


//Pages Home and any rooms we need to go into


const App = () => {
  return (<BrowserRouter>
  <Switch>
  <Route exact path="/" component={HomePage}></Route>
  <Route exact path="/:roomname" component={Room}></Route>
  </Switch>
  </BrowserRouter>);
}
export default App;

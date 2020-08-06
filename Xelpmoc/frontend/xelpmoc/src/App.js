import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom" 
import Login from "./components/Login";
import Register from './components/Register';
import Posts from './components/Posts';

function App() {
  return (
    <Router >
     <Switch>
       <Route exat path ="/post"><Posts /></Route>
       <Route exact path="/register"><Register /></Route>
       <Route exact path="/"><Register /></Route>
       <Route exact path="/login"><Login /></Route>
     </Switch>
    </Router>
  );
}

export default App;

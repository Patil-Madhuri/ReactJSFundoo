import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home.js';
import Note from './components/Note.js';
import ArchiveNotes from './components/ArchiveNotes.js'
import './App.css';
import TrashNotes from './components/TrashNotes';
let hashHistory = Router.hashHistory;

class App extends Component {

  render() {
    return (
      <Router history={hashHistory}>
        <div className="App">
          <Route exact path="/" render={() => (<Redirect to="/home/notes" />)} />

          <Route path="/login" exact strict component={Login} />
          <Link to="login" />

          <Route path="/home"   component={Home}>
            <Route path="/notes" component={Note} />
            <Link to="home/notes" />
            <Route path="/archive" component={ArchiveNotes} />
            <Route path="/trash" component={TrashNotes} />
          </Route>
          {/* <Link to="home/notes" /> */}

          <Route path="/register" component={Register} />
          <Link to="register" />

          <Route path="/forgotPassword" exact strict component={ForgotPassword} />

        </div>
      </Router>
    );
  }
}

export default App;

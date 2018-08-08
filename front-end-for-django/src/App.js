import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

// import logo from './logo.svg';
import "./App.css";

import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => <Redirect from="/" to="/login" />}
        />
        <Route exact path="/login" component={Login} />
        {/* <Route path="/notes" component={NoteList} /> */}
      </div>
    );
  }
}

export default App;

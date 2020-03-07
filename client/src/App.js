import React from "react";
import "./App.css";
import Calendar from "./components/Calender";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <div id="logo">
              <span className="icon">date_range</span>
              <span>
                react<b>calendar</b>
              </span>

            </div>
          </header>
        </div>
        <Switch>
          <Route exact path="/">
              <Login />
          </Route>
          <Route exact path="/private">
              <Calendar />
          </Route>
          <Route>
            <div>no route</div>
          </Route>
        </Switch>
      </Router >
    );
  }
}

export default App;

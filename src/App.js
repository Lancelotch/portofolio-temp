import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import SliderPrimary from './components/SlidePrimary/Index'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;

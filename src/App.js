import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import SliderPrimary from './components/SlidePrimary/Index'
import Benefits from './components/Benefits/Benefits'


class App extends Component {
  render() {
    return (
      // <BrowserRouter>
      //   <Switch>
      //     <Route exact path="/" component={HomePage} />
      //   </Switch>

      // </BrowserRouter>
      <div>
        <Benefits />
      </div>
    );
  }
}

export default App;

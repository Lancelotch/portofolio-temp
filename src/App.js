import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import ProductDetail from "./containers/ProductDetail/ProductDetail";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/register" component={RegisterPage} />
          <Route path = "/product-detail" component={ProductDetail}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

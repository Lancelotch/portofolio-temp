import React, { Component } from "react";
import {connect} from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import ProductDetail from "./containers/ProductDetail/ProductDetail";
import { isTokenExpired,logout } from "./store/actions/authentication";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log({api : token});
    
    if (token) {
      this.props.isTokenExpired(token);
    }else{
      console.log("masuk")
      this.props.logout();
    }
  }

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

export default connect(null,{isTokenExpired,logout})(App);

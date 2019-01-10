import React, { Component } from "react";
import {connect} from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { isTokenExpired,logout } from "./store/actions/authentication";
import routes from "./routers/routes";

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
    const routeComponents = 
    routes.map(({path,component},key)=> 
    <Route 
    exact path={path} 
    component={component} 
    key={key}/>
    );
    return (
      <BrowserRouter>
        <Switch>
          {routeComponents}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(null,{isTokenExpired,logout})(App);

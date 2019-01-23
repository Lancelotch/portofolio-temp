import React, { Component } from "react";
<<<<<<< HEAD
import {connect} from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import { isTokenExpired,logout } from "./store/actions/authentication";
import DashboardCustomer from "./containers/Dashboard/Dashboard"
=======
import { connect } from 'react-redux';
import { Switch, Route, Router } from "react-router-dom";
// import { isTokenExpired} from "./store/actions/authentication";
import routes from "./routers/routes";
import history from "./routers/history";

import { login, logout, isExpired } from './store/actions/auth';
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037

class App extends Component {
  componentDidMount() {
    const token = this.props.auth.token
    // console.log({ api: token });
    if (token) {
      this.props.isTokenExpired(token)
    } else {
      console.log("masuk")
      this.props.logout();
    }
  }

  render() {
    const routeComponents =
      routes.map(({ path, component }, key) =>
        <Route 
          key={key} 
          exact 
          path={path}
          component={component} 
        />
      );
    return (
      <Router history={history}>
        <Switch>
<<<<<<< HEAD
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/dashboard-customer/:tab" component={DashboardCustomer} />
=======
          {routeComponents}
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
        </Switch>
      </Router>
    );
  }
}

const maptStateToProps = state => ({
  auth : state.auth
})

const mapDispatchToProps = (dispatch) => ({
  isTokenExpired: (token) => dispatch(isExpired(token)),
  logout: () => dispatch(logout())
});

export default connect(maptStateToProps, mapDispatchToProps)(App);

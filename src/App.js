import React, { Component } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import {connect} from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import { isTokenExpired,logout } from "./store/actions/authentication";
import DashboardCustomer from "./containers/Dashboard/Dashboard"
=======
=======
>>>>>>> 6dc9075a8b15681a00ed927e675f5e7352c891d4
import { connect } from 'react-redux';
import { Switch, Route, Router } from "react-router-dom";
// import { isTokenExpired} from "./store/actions/authentication";
import routes from "./routers/routes";
import history from "./routers/history";

import { login, logout, isExpired } from './store/actions/auth';
<<<<<<< HEAD
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
=======
>>>>>>> 6dc9075a8b15681a00ed927e675f5e7352c891d4

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
<<<<<<< HEAD
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/dashboard-customer/:tab" component={DashboardCustomer} />
=======
          {routeComponents}
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
=======
          {routeComponents}
>>>>>>> 6dc9075a8b15681a00ed927e675f5e7352c891d4
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

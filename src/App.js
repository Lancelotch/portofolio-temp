import React, { Component } from "react";
import { connect } from 'react-redux';
import { Switch, Route, Router } from "react-router-dom";
// import { isTokenExpired} from "./store/actions/authentication";
import routes from "./routers/routes";
import history from "./routers/history";

import { login, logout, isExpired } from './store/actions/auth';

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
          {routeComponents}
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
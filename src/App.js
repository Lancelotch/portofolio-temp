import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import routes from "./routers/routes";
import history from "./routers/history";

class App extends Component {
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

export default App;
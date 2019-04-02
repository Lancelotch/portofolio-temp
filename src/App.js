import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import routes from "./routers/routes";
import history from "./routers/history";
import MainLayout from "layouts/MainLayout";
import FullLayout from "layouts/FullLayout";


class App extends Component {
  render() {
    const RouteWithLayout = ({ component: Component, layout: Layout, ...rest }) => (
      <Route {...rest} render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )} />
    );

    const routeComponents =
      routes.map(({ path, component, layoutName }, key) => {
          if(layoutName === "mainLayout" || layoutName === undefined) {
            return <RouteWithLayout 
              key={key} 
              exact 
              path={path}
              layout={MainLayout}
              component={component}
            />
          }
          else if(layoutName === "fullLayout") {
            return <RouteWithLayout 
              key={key} 
              exact 
              path={path}
              layout={FullLayout}
              component={component}
            />          
          }
        }
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
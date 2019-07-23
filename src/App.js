import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import routes from "./routers/routes";
import history from "./routers/history";
import MainLayout from "./layouts/MainLayout";
import FullLayout from "./layouts/FullLayout";
import CustomerLayout from "layouts/CustomerLayout";
import SidebarNavigationCustomer from "./layouts/NavigationCustomer";

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
        let layout = MainLayout;
        if (layoutName === "fullLayout") {
          layout = FullLayout;
        } else if (layoutName === "customerLayout") {
          layout = CustomerLayout;
        } else if (layoutName === "customerNavigation"){
          layout = SidebarNavigationCustomer
        }
        return <RouteWithLayout
          key={key}
          exact
          path={path}
          layout={layout}
          component={component}
        />
      }
      );

    return (
      <Router history={history} check={"check"}>
        <Switch>
          {routeComponents}
        </Switch>
      </Router>
    );
  }
}

export default App;
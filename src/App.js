import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import routes from "./routers/routes";
import history from "./routers/history";
import RootContext from "./hoc/RootContext";
import AppLayout from "./layouts/AppLayout";

function App() {
  const RouteWithLayout = ({
    component: Component,
    layout: Layout,
    needAuthenticated,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props => (
          <AppLayout needAuthenticated={needAuthenticated}>
            <Layout>
              <Component {...props} />
            </Layout>
          </AppLayout>
        )}
      />
    );
  };

  const routeComponents = routes.map(
    ({ path, component, layout, needAuthenticated = false }, key) => {
      return (
        <RouteWithLayout
          key={key}
          exact
          path={path}
          layout={layout}
          component={component}
          needAuthenticated={needAuthenticated}
        />
      );
    }
  );

  return (
    <Router history={history}>
      <RootContext>
        <Switch>
          {routeComponents}
        </Switch>
      </RootContext>
    </Router>
  );
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";


class ProfilCustomer extends Component {
    
    render() {
        const routes = [
            {
              path: "/",
              exact: true,
              sidebar: () => <div>home!</div>,
              main: () => <h2>Home</h2>
            },
            {
              path: "/bubblegum",
              sidebar: () => <div>bubblegum!</div>,
              main: () => <h2>Bubblegum</h2>
            },
            {
              path: "/shoelaces",
              sidebar: () => <div>shoelaces!</div>,
              main: () => <h2>Shoelaces</h2>
            }
          ];
        return (
            <Router>
            <Switch>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  padding: "10px",
                  width: "40%",
                  background: "#f0f0f0"
                }}
              >
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/bubblegum">Bubblegum</Link>
                  </li>
                  <li>
                    <Link to="/dashboard-customer/pesanan-saya">Shoelaces</Link>
                  </li>
                </ul>
              </div>
      
              <div style={{ flex: 1, padding: "10px" }}>

                {routes.map((route, index) => (
                  // Render more <Route>s with the same paths as
                  // above, but different components this time.

                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
              </div>
            </div>
            </Switch>
          </Router>
        );
    }
}

export default ProfilCustomer;
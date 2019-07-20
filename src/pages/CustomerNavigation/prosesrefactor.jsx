import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomerOderNavigation from "../../containers/CustomerOrderNavigation/prosesrefactor";
import OrderDetailsDashboardNotPay from "../../containers/OrderDetailsDashboardNotPay";

const routes = [
  {
    path: "/dashboard-refactor",
    exact: true,
    //sidebar: () => <div>home!</div>,
    main: () => <CustomerOderNavigation />
  },
  {
    path: "/detail-pesanan",
    main: () => <OrderDetailsDashboardNotPay/>
  }

];

function SidebarExample() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div style={{ width: "20%" }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/dashboard-refactor">Pesanan Saya</Link>
            </li>
          </ul>
        </div>

        <div className="dashboardUser" style={{ marginTop: 20, width: "80%" }} >
          <div className="customerOrderNavigation">
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default SidebarExample;

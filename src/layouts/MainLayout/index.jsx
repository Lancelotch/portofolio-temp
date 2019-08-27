import React from "react";
import Header from "containers/Header";
import Footer from "components/Footer";
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import { useRootContext } from "../../hoc/RootContext";
import PATH_URL from "../../routers/path";
import PropTypes from "prop-types";

function MainLayout(props) {
  const { isAuthenticated, history } = useRootContext();
  if (props.needAuthenticated && !isAuthenticated) {
    history.push(PATH_URL.LOGIN);
    return null;
  } else {
    return (
      <div>
        <Header match={props} />
        <ScrollToTopOnMount />
        <div className="container">{props.children}</div>
        <Footer />
      </div>
    );
  }
}

MainLayout.propTypes = {
  needAuthenticated: PropTypes.bool.isRequired
};

export default MainLayout;

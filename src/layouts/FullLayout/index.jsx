import React from "react";
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import { useRootContext } from "../../hoc/RootContext";
import PATH_URL from "../../routers/path";
import PropTypes from "prop-types";

function FullLayout(props) {
  const { isAuthenticated, history } = useRootContext();
  if (props.needAuthenticated && !isAuthenticated) {
    history.push(PATH_URL.LOGIN);
    return null;
  }else {
    return (
      <div>
        <ScrollToTopOnMount />
        {props.children}
      </div>
    );
  }
}

FullLayout.propTypes = {
  needAuthenticated: PropTypes.bool.isRequired
};

export default FullLayout;

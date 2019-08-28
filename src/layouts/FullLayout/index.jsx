import React, {useEffect} from "react";
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import { useRootContext } from "../../hoc/RootContext";
import PropTypes from "prop-types";

function FullLayout(props) {
  const {isAuthenticated, history} = useRootContext();

  useEffect(() => {
    if(props.needAuthenticated && !isAuthenticated){
      history.push('/login');
    }      
  })

  if(props.needAuthenticated && !isAuthenticated){
    return null;
  } else {
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

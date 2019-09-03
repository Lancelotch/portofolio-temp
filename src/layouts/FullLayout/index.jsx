import React, {useEffect} from "react";
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";

function FullLayout(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default FullLayout;

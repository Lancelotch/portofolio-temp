import React from "react";
import "./style.sass";


function FullLayout(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default FullLayout;

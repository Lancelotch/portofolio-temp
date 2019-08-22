import React from "react";
import Headers from "containers/Header";
import Footer from "components/Footer";
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount"


export default function CustomerLayout (props) {
    return (
      <div className="customerLayout">
        <ScrollToTopOnMount />
        <Headers match={props} />
        <div className="container">{props.children}</div>
        <Footer />
      </div>
    );
}


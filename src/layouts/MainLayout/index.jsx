import React, { useEffect } from "react";
import Header from "containers/Header";
import Footer from "../../containers/Footer";
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";

function MainLayout(props) {
  return (
    <div>
      <Header match={props} />
      <div className="container">{props.children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;

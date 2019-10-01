import React from "react";
import Header from "containers/Header";
import Footer from "../../containers/Footer";
import "./style.sass";
import { Affix } from "antd";
import { useRootContext } from "../../hoc/RootContext";

function MainLayout(props) {
  const { history } = useRootContext();
  const location = history.location.pathname;
  return (
    <div>
      {location === "/" ? (
        <Affix>
          <Header match={props}></Header>
        </Affix>
      ) : (
        <Header match={props} />
      )}
      <div className="container">{props.children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;

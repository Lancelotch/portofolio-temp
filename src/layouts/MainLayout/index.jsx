import React from "react";
import Header from "containers/Header";
import Footer from "../../containers/Footer";
import "./style.sass";
import { Affix } from "antd";

function MainLayout(props) {
  const type = props.children.type.name;
  return (
    <div>
      {type === "Home" ? (
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

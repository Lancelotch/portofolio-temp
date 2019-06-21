import React, { Component } from "react";
import Headers from "containers/Header";
import Footer from "components/Footer";
import "./style.sass";

class CustomerLayout extends Component {
  render() {
    const {match} = this.props
    return (
      <div className="customerLayout">
          <Headers match={match} />
        <div className="container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default CustomerLayout;

import React, { Component } from "react";
import Headers from "containers/Header";
import Footer from "components/Footer";
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount"


class CustomerLayout extends Component {
  render() {
    return (
      <div className="customerLayout">
        <ScrollToTopOnMount />
        <Headers match={this.props} />
        <div className="container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default CustomerLayout;

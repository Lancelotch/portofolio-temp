import React, { Component } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import "./style.sass";

class CustomerLayout extends Component {
  render() {
    return (
      <div className="customerLayout">
        <Header match={this.props} />
        <div className="container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default CustomerLayout;

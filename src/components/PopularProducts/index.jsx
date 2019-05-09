import React, { Component } from "react";
import PopularProduct from "../PopularProduct";
import { Col } from "antd";

class PopularProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        {data.map((product, index) => {
          return (
            <Col  style={{ margin: "18px" }} key={index}>
              <PopularProduct key={product.id} product={product} />
            </Col>
          );
        })}
      </React.Fragment>
    );
  }
}

export default PopularProducts;

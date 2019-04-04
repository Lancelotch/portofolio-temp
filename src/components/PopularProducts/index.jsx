import React, { Component } from "react";
import PopularProduct from "../PopularProduct";
import { Col } from "antd";

class PopularProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data, maxNumber } = this.props;
    let counter = 0;
    return (
      <React.Fragment>
        {data.map((product, index) => {
          if (maxNumber && counter < maxNumber) {
            if (maxNumber !== null) {
              counter += 1;
            }
            return (
              <Col style={{ margin: "18px" }}>
                <PopularProduct key={product.id} product={product} />
              </Col>
            );
          }
          if (!maxNumber) {
            return (
              <Col>
                <PopularProduct key={product.id} product={product} />
              </Col>
            );
          }
        })}
      </React.Fragment>
    );
  }
}

export default PopularProducts;

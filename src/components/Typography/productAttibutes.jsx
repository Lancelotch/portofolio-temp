import React from "react";
import { Col } from "antd";

const productAttibutes = props => {
  return (
    <div className="container">
      {props.productAttributes.map((productAttribute, index) => {
        return <Col lg={4} key={index}>
          <p
            style=
            {{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "1.4em"
            }}>
            {productAttribute}
          </p>
        </Col>
      })}
    </div>
  );
};

export default productAttibutes;

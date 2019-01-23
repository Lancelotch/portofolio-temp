import React from "react"
import CartVariant from "./CartVariant"
import { Row, Col } from "antd"

const cartVariants = props => {
  return (
    <Row>
       {props.variants.map((variant, index) => {
        return (
          <Col md={24} key={index}>
            <CartVariant
              name={variant.name}
              valText={variant.valText}
              valImage={variant.valImage}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default cartVariants;

import React from "react";
import { Input, Icon, Row, Col } from "antd";
import "./style.sass";

const ButtonQuantity = props => {
  const disable = props.quantity <= 1 ? true : false;
  return (
    <React.Fragment>
      <Row>
        <Col md={2}>
          <button
            className="button_quantity"
            onClick={props.decrementItem}
            disabled={disable}
          >
            <Icon className="icon__quantity" type="minus" />
          </button>
        </Col>
        <Col
          md={3}
          className="input-quantity"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "6px 0 0 6px"
          }}
        >
          <Input
            maxLength={4}
            defaultValue={1}
            value={props.quantity}
            onChange={props.onChangeQuantity}
          />
        </Col>
        <Col md={2}>
          <button className="button_quantity" onClick={props.incrementItem}>
            <Icon className="icon__quantity" type="plus" />
          </button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ButtonQuantity;

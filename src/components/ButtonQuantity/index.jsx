import React from "react";
import { Button, Input } from "antd";
import "./style.css";

const ButtonQuantity = props => {
  return (
    <React.Fragment>
    <button className="button_quantity" onClick={props.decrementItem}>-</button>
      <Input
        maxLength={4}
        defaultValue={1}
        style={{
          textAlign: "center",
          fontSize: 16,
          width: "100px",
          color: "#004853"
        }}
        value={props.quantity}
        onChange={props.onChangeQuantity}
      />
      <button className="button_quantity" onClick={props.incrementItem}>+</button>
      <p>{props.stockAlert}</p>
    </React.Fragment>
  );
};

export default ButtonQuantity;

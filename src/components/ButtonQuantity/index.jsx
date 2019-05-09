import React from "react";
import { Input } from "antd";
import "./style.css";

const ButtonQuantity = props => {
  const disable = props.quantity <= 1 ? true: false;
  return (
    <React.Fragment>
    <button className="button_quantity" onClick={props.decrementItem} disabled={disable}>-</button>
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
    </React.Fragment>
  );
};

export default ButtonQuantity;
import React from "react";
import { Button, Input } from "antd";

const ButtonQuantity = props => {
  return (
    <div>
      <Button onClick={props.incrementItem}>+</Button>
      <Input
        maxLength={4}
        defaultValue={1}
        value={props.quantity}
        onChange={props.onChangeQuantity}
      />
      <Button onClick={props.decrementItem}>-</Button>
      <p>{props.stock}</p>
    </div>
  );
};

export default ButtonQuantity;

import React from "react";
import { Input, Icon, Typography } from "antd";
import "./style.sass";


const {Text} = Typography

const ButtonQuantity = props => {
  const disabled = props.quantity <= 1 ? true : false;
  const Buttondisabled = props.quantity >= props.stock ? true : false
  return (
    <React.Fragment>
    <div className="row-quantity">
    <div>
      <button
        className="button_quantity"
        onClick={props.decrementItem}
        disabled={disabled}
      >
        <Icon className="icon__quantity" type="minus" />
      </button>
    </div>
    <div className="input-quantity">
      <Input
        //maxLength={4}
        // defaultValue={1}
        min={1}
        max={10}
        type="number"
        value={props.quantity}
        onChange={(e) => props.onChangeQuantity(e)}
        onBlur={(e) => props.onChangeQuantityBlur(e)}
      />
    </div>
    <div>
      <button className="button_quantity" onClick={props.incrementItem} disabled={Buttondisabled}>
        <Icon className="icon__quantity" type="plus" />
      </button>
    </div>
    <Text style={{ marginTop: "3 %" }} type="danger">{props.text}</Text>
  </div>
    </React.Fragment>
  );
};

export default ButtonQuantity;

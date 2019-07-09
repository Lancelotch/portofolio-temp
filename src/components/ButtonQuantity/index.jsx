import React from "react";
import { Input, Icon } from "antd";
import "./style.sass";

const ButtonQuantity = props => {
  const disable = props.quantity <= 1 ? true : false;
  return (
    <React.Fragment>
      <div className="row-quantity">
        <div>
          <button
            className="button_quantity"
            onClick={props.decrementItem}
            disabled={disable}
          >
            <Icon className="icon__quantity" type="minus" />
          </button>
        </div>
        <div className="input-quantity">
          <Input
            maxLength={props.quantity > props.stock ? props.stock : props.stock}
            defaultValue={1}
            value={props.quantity}
            onChange={props.onChangeQuantity}
          />
        </div>
        <div>
          <button className="button_quantity" onClick={props.incrementItem} disabled={props.disable}>
            <Icon className="icon__quantity" type="plus" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ButtonQuantity;

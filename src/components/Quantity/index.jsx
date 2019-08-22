import React, { useState } from "react";
import { Input, Icon, Typography, Button } from "antd";
import "./style.sass";
import strings from "../../localization/localization"
import PropTypes from "prop-types";

const { Text } = Typography


export default function Quantity(props) {

  const [text, setText] = useState("")
  const [quantity, setQuantity] = useState(props.initValue);

  function incrementItem() {
    let currentQuantity = quantity + 1;
    setQuantity(currentQuantity);
    props.updateQuantity(currentQuantity);
  };

  function decrementItem() {
    let currentQuantity = quantity - 1;
    setQuantity(currentQuantity);
    props.updateQuantity(currentQuantity);
  };

  function onChangeQuantityBlur(event) {
    if (event.target.value < 1) {
      props.updateQuantity(1);
      setQuantity(1)
    }
  };

  function onChangeQuantity(event) { 
    let stock = props.stock
    let checkCount = 1
    setQuantity(event.target.value)
    if (event.target.value > stock) {
      setText(
        strings.formatString(strings.product_detail_info_stock, stock)
      )
      checkCount = stock
      setTimeout(() => {
        setQuantity(stock)
        // props.updateQuantity(stock)
      }, 300)
      setTimeout(() => {
        setText("")
      }, 3000)
    } else {
      checkCount = event.target.value
      props.updateQuantity(checkCount)
    }
  };

  const disabled = quantity <= 1 ? true : false;

  const Buttondisabled = quantity >= props.stock ? true : false

  return (
    <React.Fragment>
      <div className="mp-quantity">
        <div>
          <Button
            className={disabled ? "mp-quantity-circle-small-disabled" : "mp-quantity-circle-small"}
            onClick={decrementItem}
            disabled={disabled}
          >
            <Icon className="mp-icon__quantity" type="minus" />
          </Button>
        </div>
        <div className="mp-input-quantity">
          <Input
            min={1}
            max={10}
            type="number"
            value={quantity}
            onChange={(e) => onChangeQuantity(e)}
            onBlur={(e) => onChangeQuantityBlur(e)}
          />
        </div>
        <div>
          <Button
            className={Buttondisabled ? "mp-quantity-circle-small-disabled" : "mp-quantity-circle-small"}
            onClick={incrementItem}
            disabled={Buttondisabled}>
            <Icon className="mp-icon__quantity" type="plus" />
          </Button>
        </div>
        <Text type="danger">{text}</Text>
      </div>
    </React.Fragment>
  );
};

Quantity.propTypes = {
  initValue: PropTypes.number,
  stock: PropTypes.number,
  updateQuantity: PropTypes.func,

};

Quantity.defaultProps = {
  initValue: 1,
}

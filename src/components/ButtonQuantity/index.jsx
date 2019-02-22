import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Input, Icon } from "antd";
import "./style.css"


class ButtonQuantity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.quantity,
      title: this.props.title,
      onChangeQuantity: this.props.quantity
    };
  }

  incrementItem = () => {
    const quantity = this.state.quantity;
    this.setState({ quantity: quantity + 1 }, () => {
      this.props.onChange(this.state.quantity, true);
    });
  };

  decreaseItem = () => {
    const quantity = this.state.quantity;
    if (this.state.quantity > 1) {
      this.setState({ quantity: quantity - 1 }, () => {
        this.props.onChange(this.state.quantity, false);
      });
    }
  };

  onChangeQuantity = event => {
    let quantity = 0;
    isNaN(event.target.value) === true ||
    event.target.value === "0" ||
    event.target.value === ""
      ? (quantity = 1)
      : (quantity = parseInt(event.target.value));
    this.setState(
      {
        quantity: quantity
      },
      () => {
        this.props.onChange(this.state.quantity, true);
      }
    );
  };

  render() {
    return (
          <Row>
            <Col md={24}>
              <b>{this.props.title}</b>
            </Col>
            <Col md={24} style={{ marginLeft: "8px" }}>
              <button
                className="button_quantity"
                onClick={this.decreaseItem}
              >
                <Icon type="minus" style={{ fontSize: "14px" }} />
              </button>
              <Input
                defaultValue={1}
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  width: "100px",
                  color: "#004853"
                }}
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
              />
              <button
                className="button_quantity"
                onClick={this.incrementItem}
              >
                <Icon type="plus" style={{ fontSize: "14px" }} />
              </button>
            </Col>
          </Row>
    );
  }
}

ButtonQuantity.propTypes = {
  quantity: PropTypes.number,
  title: PropTypes.string
};

export default ButtonQuantity;

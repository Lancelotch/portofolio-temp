import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Input, Icon, InputNumber } from "antd";
import { Button } from "antd/lib/radio";

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
    var quantity = 0;
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
      <div className="buttonKategoryProduct">
        <div className="container-fluid">
          <Row>
            <Col md={24}>
              <b>{this.props.title}</b>
            </Col>
            <Col md={24} style={{ marginLeft: "8px" }}>
              <Button
                style={{ marginRight: "8px" }}
                size="sm"
                round
                onClick={this.decreaseItem}
              >
                <Icon type="minus" style={{ fontSize: "14px" }} />
              </Button>
              <Input
                defaultValue={1}
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  width: "100px",
                  borderBottom: "1px solid #FFA122"
                }}
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
              />
              <Button
                style={{ marginLeft: "8px" }}
                size="sm"
                round
                onClick={this.incrementItem}
              >
                <Icon type="plus" style={{ fontSize: "14px" }} />
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

ButtonQuantity.propTypes = {
  quantity: PropTypes.number,
  title: PropTypes.string
};

export default ButtonQuantity;

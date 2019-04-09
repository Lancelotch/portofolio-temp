import React, { Component } from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Card, Row, Col, Divider } from "antd";
import { Button } from "antd/lib/radio";
import currencyRupiah from "../../library/currency";

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subTotal: this.props.subTotal
    };
  }
  render() {
    const { subTotal, viaRoute, viaRoutePrice } = this.props;
    const total = subTotal + viaRoutePrice;
    return (
      <Card title={strings.order_summary} className="card__Style">
        <Row className="card__Content">
          <Col span={12} >
            <p>{strings.sub_total}</p>
            {strings.international_shipping}
          </Col>
          <Col span={12} className="card__ColumnLeft">
            <p className="price">{currencyRupiah(subTotal)}</p>
          </Col>
          <Col span={12}>{viaRoute}</Col>
          <Col span={12} className="card__ColumnLeftVia">
            {viaRoutePrice}
          </Col>
        </Row>
        <Divider/>
        <Row className="rowUnderDivider">
          <Col span={12}><b>{strings.checkout_total}</b></Col>
          <Col span={12} className="card__ColumnLeft">
            <p className="price">{currencyRupiah(total)}</p>
          </Col>
          <div className="ordersummary">
            <Button className="card__Button">
              {strings.choose_payment_methods}
            </Button>
          </div>
        </Row>
      </Card>
    );
  }
}

export default OrderSummary;

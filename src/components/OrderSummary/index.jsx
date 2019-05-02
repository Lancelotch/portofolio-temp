import React from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Card, Row, Col, Button, Divider } from "antd";
import currencyRupiah from "../../library/currency";

const OrderSummary = props => {
  const { quantity, viaRoute, priceProduct } = props;
  const subTotal = priceProduct * quantity;
  const total = subTotal + viaRoute.price;

  return (
    <Card title={strings.order_summary} className="card__Style">
    <Row className="card__Content">
        <Col md={12}>
          <p>{"Harga Product"}</p>
          <p>{`Pcs`}</p>
          <p>{"Sub Total"}</p>
          <p>Pengiriman International</p>
          <p>{viaRoute.via}</p>
        </Col>
        <Col md={12} className="card__ColumnLeft">
          <p className="price">{currencyRupiah(priceProduct)}</p>
          <p>{`x ${quantity}`}</p>
          <p>{currencyRupiah(subTotal)}</p>
          <p></p>
          <p>{viaRoute.via === "Laut" ? "Ongkir Sudah Termasuk" : currencyRupiah(viaRoute.price)}</p>
        </Col>
      </Row>
      <Divider/>
      <Row className="rowUnderDivider">
        <Col md={12}>
          <b>{strings.sub_total}</b>
        </Col>
        <Col md={12} className="card__ColumnLeft">
          <p className="price">{currencyRupiah(total)}</p>
        </Col>
        <Col md={24}>
        <div className="ordersummary">
          <Button className="card__Button" onClick={props.onOrder}>
            {strings.choose_payment_methods}
          </Button>
        </div>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderSummary;

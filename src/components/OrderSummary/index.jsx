import React from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Card, Row, Col, Button, Divider } from "antd";
import currencyRupiah from "../../library/currency";

const OrderSummary = props => {
  const { quantity, viaRoute, priceProduct } = props;
  const subTotal = priceProduct * quantity;
  const totalViaRoutePrice = viaRoute.price * quantity;
  const total = subTotal + totalViaRoutePrice;

  return (
    <Card title={strings.order_summary} className="card__Style">
      <Row className="card__Content">
        <Col md={12}>
          <div className="price-pcs">
            <p>{"Harga Product"}</p>
            <p>{`Pcs`}</p>
          </div>
          <div className="sub-total">
            <p>{"Sub Total"}</p>
          </div>
          <div className="international-shipping">
            <p>Pengiriman International</p>
            <p className="p-color">{viaRoute.via}</p>
          </div>
        </Col>
        <Col md={12} className="card__ColumnLeft">
          <div className="price-pcs">
            <p className="price">{currencyRupiah(priceProduct)}</p>
            <p>{`x ${quantity}`}</p>
          </div>
          <div className="sub-total">
            <p>{currencyRupiah(subTotal)}</p>
          </div>
          <div className="international-shipping-price">
            <p className="p-color">
              {viaRoute.via === "Laut"
                ? "Ongkir Sudah Termasuk"
                : currencyRupiah(viaRoute.price)}
            </p>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row className="rowUnderDivider">
        <Col md={12}>
          <b>{strings.real_total}</b>
        </Col>
        <Col md={12} className="card__ColumnLeft">
          <b className="price">{currencyRupiah(total)}</b>
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

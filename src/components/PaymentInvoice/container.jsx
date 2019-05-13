import React, { Component } from "react";
import strings from "../../localization/localization";
import { Row, Col } from "antd";
import currencyRupiah from "../../library/currency";

const Payment = props => {
  const { totalAmounts, viaRoute, viaPrice, bankName } = props;
  const total = currencyRupiah(totalAmounts);
  return (
    <div className="payment__style">
      <Row>
        <Col md={12}>
          <p>{strings.sub_total}</p>
        </Col>
        <Col md={12} className="payment__rightText">
          <p>{total}</p>
        </Col>
        <Col md={24}>
          <text>{strings.international_shipping}</text>
        </Col>
        <Col md={12}><p style={{color:"#007E80"}}>{viaRoute}</p></Col>
        <Col md={12} className="payment__rightText">
          <p style={{color:"#9B9B9B"}}>{viaPrice}</p>
        </Col>
        <Col md={12}>
          <b>{strings.total_order}</b>
        </Col>
        <Col md={12} className="payment__rightText">
          <p>
            <b>{total}</b>
          </p>
        </Col>
        <Col md={12}>
          <p style={{color:"#9B9B9B"}}>{strings.payment_methods}</p>
        </Col>
        <Col md={12} className="payment__rightText">
          <p style={{color:"#9B9B9B"}}>{bankName}</p>
        </Col>
        <Col md={24} className="payment__bottomInfo">
          <p>{strings.payment_note}</p>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;

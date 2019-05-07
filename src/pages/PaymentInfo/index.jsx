import React from "react";
import "./style.sass";
import strings from "../../localization/localization";
import ic_bni from "../../assets/img/ic_bni.png";
import { Divider, Button, Row, Col } from "antd";
import PaymentInstructions from "../../components/PaymentInstructions/index";

const PaymentInfo = props => {
  const { instruction } = props;
  return (
    <div className="info__style">
      <div className="info__title">
        <p>{strings.payment_info}</p>
        <Divider />
      </div>
      <div className="info__content">
        <Row className="info__payment">
          <Col md={24}>
            <p style={{ color: "#9B9B9B", fontSize: "18px" }}>
              {strings.payment_total_amount}
            </p>
            <p style={{ color: "#004853", fontSize: "36px" }}>Rp. 1.500.000</p>
            <br />
          </Col>
          <Col md={24}>
            <p style={{ color: "#9B9B9B", fontSize: "18px" }}>
              {strings.payment_pay_before}
            </p>
            <p style={{ color: "#4A4A4A", fontSize: "24px" }}>
              February 29 - 13.20 WIB
            </p>
          </Col>
        </Row>
        <Row type="flex" align="middle" className="info__bank">
          <Col md={4}>
            <img src={ic_bni} alt="" className="info__bni" />
            <br />
            <text style={{ color: "#9B9B9B", fontSize: "18px" }}>
              {strings.virtual_account}
            </text>
          </Col>
          <Col md={16} style={{ textAlign: "center" }}>
            <text className="virtualNumber">ABCD123454321</text>
          </Col>
          <Col md={4} style={{ textAlign: "end" }}>
            <Button className="info__bankButton">
              <p>Salin</p>
            </Button>
          </Col>
        </Row>
        <div className="info__dropdownMethod">
          <PaymentInstructions instruction={instruction} />
        </div>
        <div>
          <Button className="info__button">
            <p>Cek Status Pembayaran</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;

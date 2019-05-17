import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import strings from "../../localization/localization";
import { Row, Col, Button, message } from "antd";
import currencyRupiah from "../../library/currency";
import convertTimesTime from "../../library/convertTimestime";

const PaymentInvoice = props => {
  const { grossAmount, endDatePay, virtualAccount, onCopy, imageBank } = props;
  const success = () => {
    message.success("Copied", 1);
  };
  return (
    <React.Fragment>
      <Row className="info__payment">
        <Col md={24}>
          <p style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.payment_total_amount}
          </p>
          <p style={{ color: "#004853", fontSize: "36px" }}>
            {currencyRupiah(grossAmount)}
          </p>
          <br />
        </Col>
        <Col md={24}>
          <p style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.payment_pay_before}
          </p>
          <p style={{ color: "#4A4A4A", fontSize: "24px" }}>
            {convertTimesTime.second(endDatePay)}
          </p>
        </Col>
      </Row>
      <Row type="flex" align="middle" className="info__bank">
        <Col md={4}>
          <img src={imageBank} alt="" className="info__bni" />
          <br />
          <span style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.virtual_account}
          </span>
        </Col>
        <Col md={16} style={{ textAlign: "center" }}>
          <span className="virtualNumber">{virtualAccount}</span>
        </Col>
        <Col md={4} style={{ textAlign: "end" }}>
          <CopyToClipboard text={virtualAccount} onCopy={onCopy}>
            <Button onClick={success} className="info__bankButton">
              <p>{strings.copy}</p>
            </Button>
          </CopyToClipboard>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PaymentInvoice;

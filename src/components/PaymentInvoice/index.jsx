import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import strings from "../../localization/localization";
import { Row, Col } from "antd";
import currencyRupiah from "../../library/currency";
import convertTimesTime from "../../library/convertTimestime";
import Button from "../Button";

const PaymentInvoice = props => {
  const { gateway, onCopy } = props;
  return (
    <React.Fragment>
      <Row className="mp-info-payment">
        <Col md={24}>
          <p className="mp-info-payment__payment">
            {strings.payment_total_amount}
          </p>
          <p className="mp-info-payment__gross-amount">
            {currencyRupiah(gateway.grossAmount)}
          </p>
          <br />
        </Col>
        <Col md={24}>
          <p className="mp-info-payment__payment">
            {strings.payment_pay_before}
          </p>
          <p className="mp-info-payment__expired-payment">
            {convertTimesTime.millisecond(gateway.expiredPaymentDate)}
          </p>
        </Col>
      </Row>
      <div className="mp-info-payment__wrapper-virtual-account">
        <p className="mp-info-payment__virtual-account">
          {strings.virtual_account}
        </p>
      </div>
      <Row type="flex" align="middle" className="mp-info-payment__info-bank">
        <Col md={4}>
          <img src={gateway.bank && gateway.bank.imageUrl} alt="" style={{ maxWidth: 250, maxHeight: 50 }} />
        </Col>
        <Col md={16} style={{ textAlign: "center" }}>
          <span className="mp-info-payment__virtual-number">{gateway.virtualAccount}</span>
        </Col>
        <Col md={4} style={{ textAlign: "end" }}>
          <CopyToClipboard text={gateway.virtualAccount} onCopy={onCopy}>
            <Button type="primary" size="large" width="full">
              {strings.copy}
            </Button>
          </CopyToClipboard>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PaymentInvoice;

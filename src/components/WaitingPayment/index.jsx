import React from "react";
import convertTimesTime from "../../library/convertTimestime";
import "./style.sass";
import { Row, Col } from "antd";
import currencyRupiah from "../../library/currency";

const WaitingPayment = props => {
  const {
    endDatePay,
    indexes,
    orderId,
    labelNotPay,
    tabsNotPay,
    tabsInDelivery,
    tabsNotSent,
    tabsFinish,
    tabsCancel,
    cancelBy,
    labelNotSent,
    labelCancel,
    labelInDelivery,
    labelFinish,
    estimateShippingDate,
    receivedDate,
    cancelDate
  } = props;
  return (
    <React.Fragment>
      <div className="waitingPayment" key={orderId}>
        <Row>
          {tabsNotPay === 1 &&
            <Col md={12}>
              <b>{labelNotPay}</b>
              <p className="waitingPayment__endDatePay">
                {convertTimesTime.millisecond(endDatePay)}
              </p>
            </Col>
          }
          {tabsNotSent === 2 &&
            <Col md={12}>
              <p
                className="dalamProsesPengiriman"
                style={{
                  paddingLeft: 15
                }}>
                {labelNotSent}
              </p>
            </Col>
          }
          {tabsInDelivery === 3 &&
            <Col md={12}>
              <p
                style={{
                  paddingLeft: 15,
                  marginBottom: 0
                }}>
                {labelInDelivery}
              </p>
              <p style={{
                color: " #BBBBBB",
                fontSize: 16,
                marginLeft: 15
              }}>
                {estimateShippingDate}
              </p>
            </Col>
          }
          {tabsFinish === 4 &&
            <Col md={12}>
              <p
                style={{
                  paddingLeft: 15,
                  marginBottom: 0
                }}>
                {labelFinish}
              </p>
              <p style={{
                color: " #BBBBBB",
                fontSize: 16,
                marginLeft: 15
              }}>
                {convertTimesTime.millisecond(receivedDate)}
              </p>
            </Col>
          }
          {tabsCancel === 5 &&
            <Col md={12}>
              <p
                style={{
                  paddingLeft: 15,
                  marginBottom: 0
                }}>
                {labelCancel} {cancelBy}
              </p>
              <p style={{
                color: " #BBBBBB",
                fontSize: 16,
                marginLeft: 15
              }}>
                {convertTimesTime.millisecond(cancelDate)}
              </p>
            </Col>
          }
          <Col md={12}>
            <font className="waitingPayment__totalReceived">Total Pesenan : &nbsp;
            <h4 style={{ display: "unset", fontSize: 20 }}>
                {currencyRupiah(indexes[0].totalAmount)}
              </h4>
            </font>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default WaitingPayment;

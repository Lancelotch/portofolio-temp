import React from "react";
import convertTimesTime from "../../library/convertTimestime";
import "./style.sass";
import { Row, Col } from "antd";
import currencyRupiah from "../../library/currency";

const WaitingPayment = props => {
  const {
    indexes,
    orderId,
    labelNotPay,
    tabsShowItem,
    labelNotSent,
    labelCancel,
    labelInDelivery,
    labelFinish
  } = props;
  return (
    <React.Fragment>
      <div className="waiting-payment" key={orderId}>
        <Row>
          {tabsShowItem === 1 &&
            <Col md={12}>
              <p
                style={{
                  marginBottom: 0,
                  fontSize: 16
                }}>
                {labelNotPay}
              </p>
              <p className="waiting-payment__end-date-pay">
                {convertTimesTime.millisecond(indexes.payment.gateway.expiredPaymentDate)}
              </p>
            </Col>
          }
          {tabsShowItem === 2 &&
            <Col md={12}>
              <p
                className="indevelivery">
                {labelNotSent}
              </p>
            </Col>
          }
          {tabsShowItem === 3 &&
            <Col md={12}>
              <p
                style={{
                  marginBottom: 0,
                  fontSize: 16
                }}>
                {labelInDelivery}
              </p>
              <p style={{
                color: " #BBBBBB",
                fontSize: 16
              }}>
                {convertTimesTime.millisecond(indexes.orderActivityDate.shipmentDate)}
              </p>
            </Col>
          }
          {tabsShowItem === 4 &&
            <Col md={12}>
              <p
                style={{
                  marginBottom: 0,
                  fontSize: 16
                }}>
                {labelFinish}
              </p>
              <p style={{
                color: " #BBBBBB",
                fontSize: 16
              }}>
                {convertTimesTime.millisecond(indexes.orderActivityDate.receivedDate)}
              </p>
            </Col>
          }
          {tabsShowItem === 5 &&
            <Col md={12}>
              <p
                style={{
                  marginBottom: 0,
                  color: "black"
                }}>
                {labelCancel} {indexes.orderCancel && indexes.orderCancel.cancelBy}
              </p>
              <p style={{
                color: " #BBBBBB",
                fontSize: 16
              }}>
                {convertTimesTime.millisecond(indexes.orderCancel && indexes.orderCancel.createdDate)}
              </p>
            </Col>
          }
          <Col md={12}>
            <font className="waiting-payment__total-received">
              Total Pesenan : &nbsp;
            <h4 className="waiting-payment__total-amount">
                {currencyRupiah(indexes.amount)}
              </h4>
            </font>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default WaitingPayment;

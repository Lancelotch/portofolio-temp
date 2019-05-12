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
    label,
    index,
    indexDalamPengiriman,
    indexBelumDikirim,
    indexSelesai,
    labelBelumDikirim,
    labelDalamPengiriman,
    labelSelesai,
    estimateShippingDate,
    receivedDate
  } = props;
  return (
    <React.Fragment>
      <div className="waitingPayment" key={orderId}>
        <Row>
          {indexBelumDikirim === 2 &&
            <Col md={12}>
              <p
                className="dalamProsesPengiriman"
                style={{
                  paddingLeft: 15
                }}>
                {labelBelumDikirim}
              </p>
            </Col>
          }
          {indexDalamPengiriman === 3 &&
            <Col md={12}>
              <p
                style={{
                  paddingLeft: 15
                }}>
                {labelDalamPengiriman}
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
          {indexSelesai === 4 &&
            <Col md={12}>
              <p
                style={{
                  paddingLeft: 15
                }}>
                {labelSelesai}
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
          {index === 1 &&
            <Col md={12}>
              <b>{label}</b>
              <p className="waitingPayment__endDatePay">
                {convertTimesTime.millisecond(endDatePay)}
              </p>
            </Col>
          }
          {index === 4 &&
            <Col md={12}>
              <p
                style={{
                  paddingLeft: 15,
                  color: "#777777",
                  fontSize: 16
                }}>{label}
              </p>
              <p className="waitingPayment__endDatePay">
                {convertTimesTime.millisecond(endDatePay)}
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

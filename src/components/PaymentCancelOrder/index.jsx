import React from "react";
import convertTimesTime from "../../library/convertTimestime";
import "./style.sass";
import { Row, Col } from "antd";
import currencyRupiah from "../../library/currency";

const PaymentCancelOrder = props => {
  const {
    labelPembatalan,
    estimateShippingDate
  } = props;
  return (
    <React.Fragment>
      <div className="paymentCancelOrder" key={""}>
        <Row>
          <Col md={24}>
            <p className="paymentCancelOrder__label">
              {labelPembatalan}
            </p>
            <p className="paymentCancelOrder__labelEstimate">
              {estimateShippingDate}
            </p>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default PaymentCancelOrder;
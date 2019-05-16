import React from "react";
import "./style.sass";
import { Row, Col } from "antd";


const PaymentCancelOrder = props => {
  const {
    cancelBy,
    estimateShippingDate
  } = props;
  return (
    <React.Fragment>
      <div className="paymentCancelOrder" key={""}>
        <Row>
          <Col md={24}>
            <p className="paymentCancelOrder__label">
             Dibatalan Oleh {cancelBy}
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

import React from "react";
import { Col, Row } from "antd";
import "./style.sass";


const Shippings = props => {
  const { shipping } = props;
  return (
    <React.Fragment>
      {shipping.length > 0 ? (
        <div className="container-row-shipping">
          <div className="shipping" style={{ marginRight: 25 }}>
          <Col md={24}>
              <Col md={12}>
              <p style={{fontSize:18}}>{shipping[1].via}</p>
              {shipping[1].estimation.substring(8)}<br/>
              Harga sudah termasuk
              </Col>
              <Col md={12}>{shipping[0].via}<br/>
              {shipping[0].estimation.substring(9)}<br/>
              Rp. {shipping[0].price}</Col>
              </Col>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Shippings;

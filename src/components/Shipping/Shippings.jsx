import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
import currencyRupiah from "../../library/currency";
import Laut from "../../assets/img/icon_product-detail/ic_sailingboat.png";
import Udara from "../../assets/img/icon_product-detail/ic_airplane.png";
import PropTypes from "prop-types";

const Shippings = props => {
  const { shipping } = props;
  return (
    <React.Fragment>
      {shipping && shipping.length > 0 ? (
        <div className="container-row-shipping">
          <div className="shipping">
            <Row style={{ width: "100%" }}>
              <Col md={12}>
                <Col md={4}>
                  <img src={Laut} alt="" style={{ maxWidth: "100%" }} />
                </Col>
                <Col md={20}>
                  <p>
                    {shipping[1].estimation.charAt(0).toUpperCase() +
                      shipping[1].estimation.substring(1)}
                  </p>
                  <p className="price">Harga sudah termasuk</p>
                </Col>
              </Col>
              <Col md={12}>
                <Col md={4}>
                  <img src={Udara} alt="" style={{ maxWidth: "100%" }} />
                </Col>
                <Col md={20}>
                  <p>
                    {shipping[0].estimation.charAt(0).toUpperCase() +
                      shipping[0].estimation.substring(1)}
                  </p>
                  <p className="price">{currencyRupiah(shipping[0].price)}</p>
                </Col>
              </Col>
            </Row>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

Shippings.propTypes = {
  estimation: PropTypes.string,
  price: PropTypes.string
};

export default Shippings;

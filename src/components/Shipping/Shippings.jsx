import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
import currencyRupiah from "../../library/currency";
import Laut from "../../assets/img/icon_product-detail/ic_sailingboat.png";
import Udara from "../../assets/img/icon_product-detail/ic_airplane.png";
import PropTypes from "prop-types";

const Shippings = props => {
  const { shipping, priceShippment } = props;
  return (
    <React.Fragment>
      {shipping && shipping.length > 0 ? (
        <div className="container-row-shipping">
          <div className="shipping">
            <Row className="shipping__content-row">
              <Col md={10} className="shipping__content-col">
                <div className="space">
                  <img src={Laut} alt="" style={{ maxWidth: "100%" }} />
                </div>
                <div>
                  <p>
                    {shipping[0].estimation.charAt(0).toUpperCase() +
                      shipping[0].estimation.substring(1)}
                  </p>
                  <p className="price">Ongkir sudah termasuk</p>
                </div>
              </Col>
              <Col md={10} offset={1} className="shipping__content-col">
                <div className="space">
                  <img src={Udara} alt="" style={{ maxWidth: "100%" }} />
                </div>
                <div>
                  <p>
                    {shipping[1].estimation.charAt(0).toUpperCase() +
                      shipping[1].estimation.substring(1)}
                  </p>
                  <p className="price">{currencyRupiah(priceShippment.shipmentFee.difference)}</p>
                </div>
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

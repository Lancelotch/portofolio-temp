import React from "react";
import { Col } from "antd";
import "./style.sass";
import currencyRupiah from "../../library/currency";
import Laut from "../../assets/img/icon_product-detail/ic_sailingboat.png";
import Udara from "../../assets/img/icon_product-detail/ic_airplane.png";

const Shippings = props => {
  const { shipping } = props;
  return (
    <React.Fragment>
      {shipping.length > 0 ? (
        <div className="container-row-shipping">
          <div className="shipping" style={{ marginRight: 25 }}>
            <Col md={24}>
              <p>
                <img src={Laut} alt="" />
                &nbsp;
                {shipping[1].estimation.charAt(0).toUpperCase() +
                  shipping[1].estimation.substring(1)}
              </p>
              <p className="price">Harga sudah termasuk</p>
            </Col>
          </div>
          <div className="shipping">
            <Col md={24}>
              <p>
                <img src={Udara} alt="" />
                &nbsp;
                {shipping[0].estimation.charAt(0).toUpperCase() +
                  shipping[0].estimation.substring(1)}
              </p>
              <p className="price">{currencyRupiah(shipping[0].price)}</p>
            </Col>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Shippings;

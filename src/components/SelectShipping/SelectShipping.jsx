import React from "react";
import { Col, Row } from "antd";
import "./style.sass";
import currencyRupiah from "../../library/currency";
import Laut from "../../assets/img/icon_product-detail/ic_sailingboat.png";
import Udara from "../../assets/img/icon_product-detail/ic_airplane.png";

function compareShipping(a, b) {
  if (a.via < b.via) {
    return -1;
  }
  if (a.via > b.via) {
    return 1;
  }
  return 0;
}

export const SelectShipping = props => {
  const { shipping, selected, onChangeSelected } = props;
  shipping.sort(compareShipping);
  return (
    <React.Fragment>
      {shipping.length > 0 && (
        <div className="container-row-shipping-selected">
          {shipping.map((ship, index) => (
            <div
              key={index.toString()}
              className={
                selected === ship.id
                  ? "shipping-selected"
                  : "shipping-selected-active"
              }
              onClick={onChangeSelected.bind(this, ship)}
            >
              <Row>
                <Col md={6} className="shipping-img">
                  <img
                    src={ship.via === "Laut" ? Laut : Udara}
                    alt=""
                    style={{ maxWidth: "100%" }}
                  />
                </Col>
                <Col md={16} className="shipping-text">
                  <p className="text-selected">
                    {ship.estimation.charAt(0).toUpperCase() +
                      ship.estimation.substring(1)}
                    <br />
                    <span className="price-selected">
                      {ship.via === "Laut"
                        ? "Ongkir Sudah Termasuk"
                        : currencyRupiah(ship.price)}
                    </span>
                  </p>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

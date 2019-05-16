import React from "react";
import { Col, Row } from "antd";
import "./style.sass";
import currencyRupiah from "../../library/currency";
import Laut from "../../assets/img/icon_product-detail/ic_sailingboat.png";
import Udara from "../../assets/img/icon_product-detail/ic_airplane.png";

export const SelectShipping = props => {
  const { shipping, selected, onChangeSelected } = props;
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
              <Row style={{padding:"10px"}}>
                <Col md={4}>
                  <img
                    src={ship.via === "Laut" ? Laut : Udara}
                    alt=""
                    style={{ maxWidth: "100%" }}
                  />
                </Col>
                <Col md={20} style={{ padding: 5 }}>
                  {/* {ship.id} */}
                  <p>
                    {ship.estimation.charAt(0).toUpperCase() +
                      ship.estimation.substring(1)}
                  </p>
                  <p className="price-selected">
                    {ship.via === "Laut"
                      ? "Ongkir Termasuk"
                      : currencyRupiah(ship.price)}
                  </p>
                </Col>
                {/* <p className="price">{ ship.via ===  'Laut' ?  'Harga sudah termasuk' : currencyRupiah(ship.price) }</p> */}
              </Row>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

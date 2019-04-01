import React, { Component } from "react";
import { Col } from "antd";
import "./style.sass";
import currencyRupiah from "../../library/currency";
import Laut from "../../assets/img/icon_product-detail/ic_sailingboat.png";
import Udara from "../../assets/img/icon_product-detail/ic_airplane.png";

class SelectShipping extends Component {
  render() {
    const { shipping, selected, onChangeSelected } = this.props;
    return (
      <React.Fragment>
        {shipping.length > 0 && (
          <div className="container-row-shipping-selected">
            {shipping.map((ship, index) => (
              <div
                key={index.toString()}
                className={
                  selected &&
                  selected === ship.id &&
                  "shipping-selected-selected"
                }
                onClick={onChangeSelected.bind(this, ship)}
              >
                <Col md={24} style={{ padding: 15 }}>
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
                      {currencyRupiah(ship.price)}
                    </p>
                  </Col>
                  {/* <p className="price">{ ship.via ===  'Laut' ?  'Harga sudah termasuk' : currencyRupiah(ship.price) }</p> */}
                </Col>
              </div>
            ))}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SelectShipping;

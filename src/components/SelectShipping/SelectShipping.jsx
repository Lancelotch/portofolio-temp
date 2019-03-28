import React, { Component } from "react";
import { Col } from "antd";
import "./style.sass";
import currencyRupiah from "../../library/currency";
import Laut from "../../assets/img/icon_product-detail/ic_sailingboat.png";
import Udara from "../../assets/img/icon_product-detail/ic_airplane.png";



class SelectShipping extends Component {
  onShippingSelected = () => {
    this.props.onChangeSelected(this.props.shipping[1].id);
  };
  render() {
    const { shipping, selected } = this.props;
    return (
      <React.Fragment>
        {shipping.length > 0 ? (
          <div className="container-row-shipping">
            <div className={selected} onClick={this.onShippingSelected}>
              <div className="shipping" style={{ marginRight: 25 }}>
                <Col md={24}>
                  <Col md={3}>
                    <img src={Laut} alt="" style={{ maxWidth: "100%" }} />
                  </Col>
                  <Col md={21}>
                    {shipping[1].id}
                    <p>
                      {shipping[1].estimation.charAt(0).toUpperCase() +
                        shipping[1].estimation.substring(1)}
                    </p>
                    <p className="price">Harga sudah termasuk</p>
                  </Col>
                </Col>
              </div>
            </div>
            <div className="shipping">
              <Col md={24} style={{ marginLeft: 50 }}>
                <Col md={3}>
                  <img src={Udara} alt="" style={{ maxWidth: "100%" }} />
                </Col>
                <Col md={21}>
                  {shipping[0].id}
                  <p>
                    {shipping[0].estimation.charAt(0).toUpperCase() +
                      shipping[0].estimation.substring(1)}
                  </p>
                  <p className="price">{currencyRupiah(shipping[0].price)}</p>
                </Col>
              </Col>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default SelectShipping;

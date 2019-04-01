import React, { Component } from "react";
import ButtonQuantity from "../ButtonQuantity";
import TextArea from "antd/lib/input/TextArea";
import "./style.sass";
import { Row, Col, Card, Icon } from "antd";
import NotedLimit from "../NotedLimit";
import SelectShipping from "../SelectShipping";
import currencyRupiah from "../../library/currency";
import strings from "../../localization/localization";

class OderDetails extends Component {
  render() {
    const {
      warna,
      ukuran,
      totalPrice,
      quantity,
      onChangeQuantity,
      onChangeShipping,
      name
    } = this.props;

    return (
      <React.Fragment>
        <Row>
          <Col md={24}>
            <Card>
              <div className="detailPesanan">
                <b className="detailPesanan__label">{strings.order_details}</b>
                <hr className="detailPesanan__inline" />
                <Row>
                  <Col md={3} style={{ marginTop: 20 }}>
                    <img
                      src={warna.image.medium}
                      alt=""
                      style={{ width: 70, height: 36 }}
                    />
                  </Col>
                  <Col md={14} style={{ marginTop: 20 }}>
                    <h2 className="detailPesanan__nameProduct">{name}</h2>
                    <p className="detailPesanan__variant">
                      {" "}
                      Variant : {warna.name}
                    </p>
                    <p className="detailPesanan__variant">
                      {" "}
                      Ukuran : {ukuran.name}
                    </p>
                    <ButtonQuantity
                      quantity={quantity}
                      onChange={onChangeQuantity}
                    />
                  </Col>
                  <Col md={7} style={{ marginTop: 20 }}>
                    <p className="detailPesanan__price">
                      {currencyRupiah(totalPrice)}
                    </p>
                  </Col>
                  <Col md={24}>
                    <div className="detailPesanan__alert">
                      <Icon
                        type="exclamation-circle"
                        className="detailPesanan__iconAlert"
                      />
                      <p className="detailPesanan__textAlert">
                        {strings.checkout_alert_info}
                      </p>
                      <p className="detailPesanan__textParagraph">
                        {strings.checkout_alert_description_detail_pesanan}
                      </p>
                    </div>
                  </Col>
                </Row>
                <hr className="detailPesanan__inline" />
                <Col md={24} style={{ marginTop: 20 }}>
                  <Row>
                    <Col md={5}>
                      <b>{strings.international_shipping}</b>
                    </Col>
                    <Col md={19}>
                      <SelectShipping onChangeShipping={onChangeShipping} />
                    </Col>
                    <Col md={5}>
                      <b>{strings.note}</b>
                    </Col>
                    <Col md={19}>
                      <NotedLimit />
                    </Col>
                  </Row>
                </Col>
                {/* {JSON.stringify(warna)}
                {JSON.stringify(ukuran)}
                <p>{productId}</p>
                <p>{JSON.stringify(sku)}</p>
                <p>{quantity}</p>
                <p>{JSON.stringify(shipping)}</p>
                {shipping.price} */}
              </div>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default OderDetails;

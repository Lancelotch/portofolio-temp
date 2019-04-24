import React, { Component, Fragment } from "react";
import ButtonQuantity from "../ButtonQuantity";
import "./style.sass";
import { Row, Col, Card, Icon } from "antd";
import NotedLimit from "../../components/NotedLimit";
import Shipping from "../../components/SelectShipping";
import currencyRupiah from "../../library/currency";
import strings from "../../localization/localization";

class OrderDetailContainer extends Component {
  constructor(props){
      super(props);
      this.state = {
      }
  }

  actionChangeQuantity = (quantity) => {
    this.props.onChangeQuantity(quantity);
  }

  actionChangeShipping = (shipping) => {
    this.props.onChangeShipping(shipping);
  }

  actionChangeNote = (note) => {
    this.props.onChangeNote(note)
  }

  variants = (variants) => {
    return variants.map(variant=>(
        <p key={variant.variantId} className="detailPesanan__variant">
          {`${variant.variantName} : ${variant.value.name}`}
        </p>
      ))
    }

  render() {
    const {image, name, sku, quantity} = this.props.payloadProductDetail;
    return (
      <Fragment>
        <Row>
          <Col md={24}>
            <Card>
              <div className="detailPesanan">
                <b className="detailPesanan__label">{strings.order_details}</b>
                <hr className="detailPesanan__inline" />
                <Row>
                  <Col md={3} style={{ marginTop: 20 }}>
                    <img
                      src={image}
                      alt=""
                      style={{ width: 70, height: 36 }}
                    />
                  </Col>
                  <Col md={14} style={{ marginTop: 20 }}>
                    <h2 className="detailPesanan__nameProduct">{name}</h2>
                    {this.variants(sku.variants)}
                    <ButtonQuantity
                      quantity={quantity}
                      onChange={this.actionChangeQuantity}
                    />
                  </Col>
                  <Col md={7} style={{ marginTop: 20 }}>
                    <p className="detailPesanan__price">
                      {currencyRupiah(sku.price)}
                    </p>
                  </Col>
                  <Col md={24} offset={3}>
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
                      <Shipping onChangeShipping={this.actionChangeShipping} />
                    </Col>
                    <Col md={5}>
                      <b>{strings.note}</b>
                    </Col>
                    <Col md={19}>
                      <NotedLimit onChange={this.actionChangeNote}/>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default OrderDetailContainer;

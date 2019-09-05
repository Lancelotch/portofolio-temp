import React, { Component, Fragment } from "react";
import Quantity from "../../components/Quantity";
import "./style.sass";
import { Row, Col, Card, Icon, Divider } from "antd";
import NotedLimit from "../../components/NotedLimit";
import SelectShipping from "../../components/SelectShipping";
import currencyRupiah from "../../library/currency";
import strings from "../../localization/localization";

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalProductPrice: 0,
      quantity: this.props.quantity,
      variantText: ""
    };
  }

  actionUpdateQuantity = quantity => {
    this.props.actionUpdateQuantity(quantity);
  };

  actionChangeShipping = (shipping) => {
    this.props.actionChangeShipping(shipping);
  };

  actionChangeNote = note => {
    this.props.actionChangeNote(note);
  };

  variantsItem = (sku) => {
    return (
      sku.reduce((acc, cur) => {
        let arr = acc
        if (Object.keys(cur).length > 0) {
          arr = (`${acc}${cur.name}${' '}${cur.variantItem.name}${':'}`)
        }
        return arr
      }, '').split(':').filter(e => e !== '').join(', ')
    )
  }

  render() {
    const { image, name, sku } = this.props.payloadProductDetail;
    const { priceProduct, shipmentFee } = this.props;
    const totalProductPrice = this.props.quantity * priceProduct;
    const totalPriceShipping = this.props.quantity * shipmentFee;
    return (
      <Fragment>
        <Row>
          <Col md={24} className="card__row">
            <Card className="card__order-detail" title={strings.order_details}>
              <div className="detail">
                <Row className="detail__order">
                  <Col md={5} style={{ padding: "20px" }}>
                    <div style={{ width: "100%" }}>
                      <img
                        src={image}
                        alt=""
                        style={{ maxHeight: "75px", maxWidth: "75px" }}
                      />
                    </div>
                  </Col>
                  <Col md={13}>
                    <h2 className="detail__product-name">{name}</h2>
                    {/* <Row>
                      <Col span={6}>Variant</Col>
                      <Col md={12}>{this.variants(sku.variants)}</Col>
                    </Row> */}
                    <Row>
                      {sku &&
                        <React.Fragment>
                          <Col className="detail__variant" md={4}>
                            Varian
                      </Col>
                          <Col
                            className="detail__variant"
                            style={{ textAlign: "left" }}
                            md={20}
                          > :&nbsp;
                          {sku.length > 0 &&
                              <React.Fragment>
                                {this.variantsItem(sku)}
                              </React.Fragment>}
                          </Col>
                        </React.Fragment>
                      }

                    </Row>
                  </Col>
                  <Col md={6}>
                    <h2 className="detail__price">
                      {currencyRupiah(totalProductPrice)}
                    </h2>
                  </Col>
                  <Col md={19} offset={5}>
                    <div className="detail__button-quantity">
                      <Quantity
                        stock={this.props.stock}
                        initValue={Number(this.props.quantity)}
                        updateQuantity={this.actionUpdateQuantity}
                      />
                    </div>
                    <div className="detail__alert">
                      <Row>
                        <Col md={2} className="detail__alert-icon">
                          <Icon type="exclamation-circle" />
                        </Col>
                        <Col md={22} className="detail__alert-text">
                          <h4>{strings.checkout_alert_info}</h4>
                          <span>
                            {strings.checkout_alert_description_detail_pesanan}
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <Divider />
              <Row className="shipping-checkout">
                <Col md={5}>
                  <b>{strings.international_shipping}</b>
                </Col>
                <Col md={19}>
                  <SelectShipping quantity={this.props.quantity} shipmentFee={totalPriceShipping} onChangeShipping={this.actionChangeShipping} />
                </Col>
                <Col md={5} className="shipping-checkout__note">
                  <b>{strings.note}</b>
                </Col>
                <Col md={19} className="shipping-checkout__note">
                  <NotedLimit 
                    // setFieldValue={this.props.setFieldValue} 
                    setStateNote={this.props.setStateNote}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default OrderDetail;



import React, { Component, Fragment } from "react";
import ButtonQuantityContainer from "../ButtonQuantity";
import "./style.sass";
import { Row, Col, Card, Icon, Divider } from "antd";
import NotedLimit from "../../components/NotedLimit";
import SelectShipping from "../../components/SelectShipping";
import currencyRupiah from "../../library/currency";
import strings from "../../localization/localization";

class OrderDetailContainer extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      totalProductPrice: 0,
      quantity: this.props.quantity
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

  // variants = variants => {
  //   console.log(variants);
  //   return (
  //     <div key={variants.id} className="detail__product-variant">
  //       <p>
  //         {`${variants.name} : ${variants.variantItem.name}`}
  //       </p>
  //     </div>
  //   )
  // };


  variants = variants => {
    return variants.map((variant, index) => {
      return (
        <span className="detail__variant" key={index}>
          {variant.name}&nbsp;&nbsp;:&nbsp;{variant.variantItem.name}
        </span>
      )
    })
  };


  render() {
    const { image, name, sku } = this.props.payloadProductDetail;
    const { priceProduct,shipmentFee } = this.props;
    const totalProductPrice = this.props.quantity * priceProduct;
    const totalPriceShipping = this.props.quantity * shipmentFee
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
                          > :
                            {sku.length > 0 && this.variants(sku)}
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
                      <ButtonQuantityContainer
                        stock={this.props.stock}
                        quantity={this.props.quantity}
                        actionUpdateQuantity={this.actionUpdateQuantity}
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
                  <NotedLimit onChange={this.actionChangeNote} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default OrderDetailContainer;

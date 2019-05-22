import React, { Component, Fragment } from "react";
import ButtonQuantity from "../ButtonQuantity";
import "./style.sass";
import { Row, Col, Card, Icon, Divider } from "antd";
import NotedLimit from "../../components/NotedLimit";
import Shipping from "../../components/SelectShipping";
import currencyRupiah from "../../library/currency";
import strings from "../../localization/localization";

class OrderDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalProductPrice: 0
    };
  }

  actionChangeQuantity = quantity => {
    this.props.onChangeQuantity(quantity);
  };

  actionChangeShipping = shipping => {
    this.props.onChangeShipping(shipping);
  };

  actionChangeNote = note => {
    this.props.onChangeNote(note);
  };

  // variants = variants => {
  //   return variants.map(variant => (
  //     <div key={variant.variantId} className="detail__product-variant">
  //       <p>
  //         {`${variant.variantName} : ${variant.value.name}`}
  //       </p>
  //     </div>
  //   ));
  // };
  variants = variants => {
<<<<<<< HEAD
    return variants.map((variant,index)=> {
      if(index === variants.length -1){
        return (
          <Col className="detail__variant" key={index} span={3}>{variant.value.name}</Col>
        )
      }else{
        return (
          <Col className="detail__variant" key={index} span={3}>{variant.value.name},</Col>
        )
      }
      
    })
  }
  
=======
    return variants.map((variant,i) => (
      <div key={i} className="detail__product-variant">
        <p>
          {`${variant.variantName} : ${variant.value.name}`}
        </p>
      </div>
    ));
  };
>>>>>>> development

  render() {
    const { image, name, sku, quantity } = this.props.payloadProductDetail;
    const totalProductPrice = this.props.quantity * sku.price;

    return (
      <Fragment>
        <Row>
          <Col md={24} className="card__row">
            <Card
              className="card__order-detail"
              title={
                <span style={{ fontSize: "17px" }}>
                  {strings.order_details}
                </span>
              }
            >
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
                  <Col md={14}>
                    <h2 className="detail__product-name">{name}</h2>
                    {/* <Row>
                      <Col span={6}>Variant</Col>
                      <Col md={12}>{this.variants(sku.variants)}</Col>
                    </Row> */}
                      <Row>
                        <Col className="detail__variant" span={5}>
                          Variant
                        </Col>
                        <Col className="detail__variant" span={1}>
                          :
                        </Col>
                        {this.variants(sku.variants)}
                      </Row>
                  </Col>
                  <Col md={5}>
                    <h2 className="detail__price">
                      {currencyRupiah(totalProductPrice)}
                    </h2>
                  </Col>
                  <Col md={19} offset={5}>
                    <div className="detail__button-quantity">
                      <ButtonQuantity
                        quantity={quantity}
                        onChange={this.actionChangeQuantity}
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
              <Row className="shipping">
                <Col md={5}>
                  <b>{strings.international_shipping}</b>
                </Col>
                <Col md={19}>
                  <Shipping onChangeShipping={this.actionChangeShipping} />
                </Col>
                <Col md={5} className="shipping__note">
                  <b>{strings.note}</b>
                </Col>
                <Col md={19} className="shipping__note">
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

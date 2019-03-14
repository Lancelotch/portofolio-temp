import React, { Component } from "react"
import Header from "../../components/Header"
import SliderProductDetail from "components/SliderSecondary"
import { Col, Row, Card, Spin } from "antd"
import Variants from "../../components/Variant/Variants"
import "./style.sass"
import ButtonQuantity from "../../components/ButtonQuantity"

import strings from "../../localization/localization"
import ProductAttibutes from "../../components/ProductAttributes"
import Footer from "../../components/Footer"

import Shipping from "../../components/Shipping"

export default class ProductDetail extends Component {
  render() {
    const { 
      price,
      match, productTitle, productImages, index, 
      productSalePrice, variants, variantsRef,
      changed,
      onChangeVariant,
      sizeId,
      colorId,
      sku,
      onChangeQuantity,
      stockAlert,
      details
    } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col md={24}>
            <Header match={match} />
            <div className="container productDetail">
              <Row>
                <Col md={10}>
                  <h2> {productTitle || <Spin />}</h2>
                  <SliderProductDetail
                    productImages={productImages}
                    index={index}
                  />
                </Col>
                <Col md={14}>
                  <div className="productDetail__variantContent">
                    {!productSalePrice ? (
                      <Spin />
                    ) : (
                      <p className="productDetail__price">{price}</p>
                    )}
                    {variants.map((variant, index) => (
                      <Variants
                        ref={variantsRef[index]}
                        key={variant.id}
                        index={index}
                        name={
                          variant.name.charAt(0).toUpperCase() +
                          variant.name.substring(1)
                        }
                        productImages={productImages}
                        values={variant.values}
                        id={variant.id}
                        changed={changed}
                        onChangeVariant={onChangeVariant}
                        sizeId={sizeId}
                        colorId={colorId}
                        sku={sku}
                      />
                    ))}
                    <ButtonQuantity
                      title="Jumlah"
                      quantity={1}
                      onChange={onChangeQuantity}
                    />
                    <p className="productDetail__stock">
                      {stockAlert}
                    </p>

                    <div className="productDetail__delivery">
                      {!productSalePrice ? (
                        <Spin />
                      ) : (
                        <p>
                          {strings.delivery_from}:{" "}
                          <b className="productDetail__china">
                            {strings.china}
                          </b>{" "}
                          {strings.delivery_to}
                        </p>
                      )}
                    </div>
                    <Shipping />
                    <button className="productDetail__addCart">
                      {strings.add_to_cart}
                    </button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={24} style={{ marginTop: 50 }}>
                  <Card>
                    <h2 style={{ padding: 12 }}>{strings.detail_product}</h2>
                    {Object.keys(details).map(detail => {
                      return (
                        <ProductAttibutes
                          description={details[detail]}
                          label={
                            detail.charAt(0).toUpperCase() + detail.substring(1)
                          }
                        />
                      );
                    })}
                  </Card>
                </Col>
              </Row>
            </div>
            <Footer />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

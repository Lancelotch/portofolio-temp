import React from "react";
import SliderProductDetail from "components/SliderSecondary";
import { Col, Row, Card, Spin } from "antd";
import Variants from "../../components/Variant/Variants";
import "./style.sass";
import ButtonQuantity from "../../components/ButtonQuantity";
import { Redirect } from "react-router-dom";
import strings from "../../localization/localization";
import ProductAttibutes from "../../components/ProductAttributes";
import Shipping from "../../components/Shipping";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";

const ProductDetail = props => {
    const {
      changeCheckout,
      open,
      addCheckout,
      price,
      name,
      images,
      index,
      variants,
      variantsRef,
      changed,
      onChangeVariant,
      sizeId,
      colorId,
      sku,
      onChangeQuantity,
      stockAlert,
      details
    } = props;
    return (
      <React.Fragment>
        <Row>
          <Col md={24}>
            <ScrollToTopOnMount />
            <div className="productDetailBorder" />
            <div className="container productDetail">
              <Row>
                <Col md={10}>
                  <h2> {name || <Spin />}</h2>
                  <SliderProductDetail images={images} index={index} />
                </Col>
                <Col md={14}>
                  <div className="productDetail__variantContent">
                    {!name ? (
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
                    <p className="productDetail__stock">{stockAlert}</p>

                    <div className="productDetail__delivery">
                      {!price ? (
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
                    <button
                      className="productDetail__addCart"
                      onClick={addCheckout}
                    >
                      {strings.add_to_cart}
                    </button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={24} style={{ marginTop: 50 }}>
                  <Card>
                    <h2 style={{ padding: 12 }}>{strings.detail_product}</h2>
                    {Object.keys(details).map((detail, i) => {
                      return (
                        <ProductAttibutes
                          key={i}
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
          </Col>
        </Row>
        {open === true && <Redirect to={{pathname: "/login", state:{nextPage:"checkout"}}} /> }
        {changeCheckout === true && <Redirect to="/checkout" />}
      </React.Fragment>
    );
  }


  export default ProductDetail


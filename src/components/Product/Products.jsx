import React from "react";
import Product from "./Product";
import {Row, Col} from 'antd'
import "./style.sass"

const products = props => {
  let counter = 0;
  let products = props.products;
  if ((!props.products || props.products.length < 1) && props.maxProductCount) {
    for (var i = 0; i < props.maxProductCount; i++) {
      products.push({
        productId: undefined,
        prices: [],
        productPic: undefined
      });
    }
  }
  return (
    <Row>
      {props.products.map((product, index) => {
        if (props.maxProductCount && counter < props.maxProductCount) {
          if (props.maxProductCount !== null) {
            counter += 1;
          }
          return (
            <Col
              key={index}
              md={4}
              style={{
                paddingLeft: "5px",
                paddingRight: "5px",
                marginTop: "10px"
              }}
            >
              <Product
                key={product.productId}
                productId={product.productId}
                prices={product.prices}
                productName={product.productName}
                productPic={product.productPic}
              />
            </Col>
          );
        }

        if (!props.maxProductCount) {
          return (
            <Col
              key={index}
              md={4}
              style={{
                paddingLeft: "5px",
                paddingRight: "5px",
                marginTop: "10px"
              }}
            >
              <Product
                key={product.productId}
                productId={product.productId}
                prices={product.prices}
                productName={product.productName}
                productPic={product.productPic}
              />
            </Col>
          );
        }
      })}
    </Row>
  );
};

export default products;

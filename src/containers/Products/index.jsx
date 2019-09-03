import React from "react";
import Product from "../../components/Product";
import { Col, Row } from "antd";
import PropTypes from "prop-types";

export default function Products(props) {
  const products = props.products;
  return (
    <Row style={{ margin: "24px 18px 0 18px" }}>
      {products.map((product, index) => {
        console.log("price", product.price.amount);
        console.log("price2", product.price);
        return (
          <Col key={index} md={4} style={{ padding: "8px" }}>
            <Product
              id={product.id}
              urlImage={
                product.defaultImage
                  ? product.defaultImage.mediumUrl
                  : product.image.mediumUrl
              }
              name={
                product.information ? product.information.name : product.name
              }
              price={
                product.price.amount ? product.price.amount : product.price
              }
              videoUrl={product.videoUrl}
            />
          </Col>
        );
      })}
    </Row>
  );
}

Products.propTypes = {
  products: PropTypes.arrayOf(Object)
};

import React from "react";
import Product from "../../components/Product";
import { Col, Row } from "antd";
import PropTypes from "prop-types";

export default function Products(props) {
  let products = props.products;
  return (
    <Row style={{margin: "24px 18px 0 18px"}}>
      {products.map((product, index) => {
        return (
          <Col key={index} md={4} style={{ padding: "8px" }}>
            <Product
              id={product.id}
              urlImage={product.image.mediumUrl}
              name={product.name}
              price={product.price}
              videoUrl={product.videoUrl}
            />
          </Col>
        );
      })}
    </Row>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(Object)
};


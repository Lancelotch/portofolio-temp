import React from "react";
import Product from "../Product";
import { Col } from "antd";
import PropTypes from 'prop-types';

const colStyle = {
  paddingRight: "16px",
  paddingBottom: "16px"
};

const Products = props => {
  return props.productList.map((product, index) => (
    <Col key={index} md={4} style={colStyle}>
      <Product
        id={product.id}
        urlImage={product.urlImage}
        name={product.name}
        price={product.price}
      />
    </Col>
  ));
};

Products.propTypes = {
  productList : PropTypes.arrayOf(Object)
}

export default Products;

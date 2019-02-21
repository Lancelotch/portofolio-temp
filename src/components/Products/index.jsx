import React from "react";
import Product from "../Product";
import { Col } from "antd";

const colStyle = {
  paddingRight: "16px",
  paddingBottom: "16px"
};

const Products = props => {
  return props.productList.map((product, index) => (
    <Col key={index} span={6} style={colStyle}>
      <Product
        id={product.id}
        urlImage={product.urlImage}
        name={product.name}
        price={product.price}
      />
    </Col>
  ));
};

export default Products;

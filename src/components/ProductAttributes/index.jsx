import React from "react";
import { Col } from "antd";

const ProductAttibutes = props => {
  const { product } = props
  return (
    <div style={{ paddingLeft: 20 }} >
      <Col md={3}>
        <p>Kategori</p>
        <p>Berat</p>
        <p>Dimension</p>
        <p>Description</p>
      </Col>
      <Col md={21}>
        <p>{product.category}</p>
        <p>{product.weight}</p>
        <p>{product.dimension}}</p>
        <p>{product.description}</p>
      </Col>
    </div>
  );
}


export default ProductAttibutes;

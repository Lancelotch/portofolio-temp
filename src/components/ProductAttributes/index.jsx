import React from "react";
import './style.sass'
import { Col } from "antd";

const ProductAttibutes = props => {
  const { product } = props
  return (
    <div className="card-description">
      <Col md={3} className="card-description__title">
        <p>Kategori</p>
        <p>Berat</p>
        <p>Dimension</p>
        <p>Description</p>
      </Col>
      <Col md={21} className="card-description__text">
        <p><span>: </span>{product.category}</p>
        <p><span>: </span>{product.weight}</p>
        <p><span>: </span>{product.dimension}</p>
        <p><span>: </span>{product.description}</p>
      </Col>
    </div>
  );
}


export default ProductAttibutes;

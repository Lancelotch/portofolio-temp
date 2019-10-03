import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import PropTypes from "prop-types";
import Cards from "../../components/Cards";
import { PATH_PRODUCT } from "../../services/path/product";

export default function Products(props) {
  const products = props.products;
  return (
    <Row type="flex" style={{ margin: "24px 15px 0" }}>
      {products.map((product, index) => {
        return (
          <Col key={index} style={{ margin: "10px" }}>
            <Link to={`/${PATH_PRODUCT.PRODUCT}/${product.id}` || "#"}>
              <Cards
                urlImage={product.thumbnail}
                title={product.name}
                price={product.price}
                showPlayButton={product.isVideoExist}
              />
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}

Products.propTypes = {
  products: PropTypes.arrayOf(Object)
};

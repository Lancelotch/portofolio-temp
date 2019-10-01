import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import PropTypes from "prop-types";
import Cards from "../../components/Cards";
import PATH_URL from "../../routers/path";

export default function Products(props) {
  const products = props.products;
  return (
    <Row style={{ margin: "24px 18px 0 18px" }}>
      {products.map((product, index) => {
        return (
          <Col key={index} md={4} style={{ padding: "8px" }}>
            <Link to={`${PATH_URL.PRODUCTS}/${product.id}` || "#"}>
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

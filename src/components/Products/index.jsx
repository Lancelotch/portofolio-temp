import React from "react";
import Product from "../Product";
import { Col } from "antd";
import PropTypes from 'prop-types';

const colStyle = {
  paddingRight: "16px",
  paddingBottom: "16px"
};

const Products = props => {
  return(
    <Col  md={4} style={colStyle}>
      <Product
        id={props.id}
        urlImage={props.defaultImage}
        name={props.information}
        price={props.price}
        videoUrl={props.videoUrl}
      />
    </Col>
  )
};

Products.propTypes = {
  productList : PropTypes.arrayOf(Object)
}

export default Products;

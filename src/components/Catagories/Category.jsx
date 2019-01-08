import React from "react";
import "./style.sass";
import { Col } from "antd";
import { Card } from "antd";
const { Meta } = Card;

const Category = props => {
  var link = "/category-product/" + props.id;

  return (
    <Col
      xs={{ span: 24 }}
      md={{ span: 3 }}
      style={{
        paddingLeft: "8px",
        paddingRight: "8px"
      }}
    >
      {props.imageUrl ? (
        <a href={link}>
          <img src={props.imageUrl} alt="" />
        </a>
      ) : (
        <Meta />
      )}
    </Col>
  );
};

export default Category;

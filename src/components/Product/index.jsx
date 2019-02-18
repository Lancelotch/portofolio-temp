import React from "react";
import { Card } from "antd";

const {Meta} = Card;

const Product = props => {
  const urlImage = props.urlImage;
  const title = props.name;
  const price = props.price;
  return (
    <React.Fragment>
      <Card
        hoverable
        style={{ width: 240, marginTop: 20}}
        cover={
          <img
            alt="example"
            src={urlImage}
          />
        }
      >
        <Meta title={title} description={price} />
      </Card>
    </React.Fragment>
  );
};

export default Product;
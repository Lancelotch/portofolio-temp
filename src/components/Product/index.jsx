import React from "react";
import { Card } from "antd";
import currencyRupiah from "../../library/currency";

const { Meta } = Card;

const cardStyle = {
  width: "100%"
};

const imageStyle = {
  height: "250px",
  objectFit: "scale-down"
}

const Product = props => {
  const urlImage = props.urlImage;
  const title = props.name;
  const price = currencyRupiah(props.price);
  return (
    <React.Fragment>
      <Card
        hoverable
        style={cardStyle}
        cover={<img alt="example" src={urlImage} style={imageStyle}/>}
      >
        <Meta title={title} description={price} />
      </Card>
    </React.Fragment>
  );
};

export default Product;

import React from "react";
import { Card } from "antd";
import currencyRupiah from "../../library/currency";
import { Link } from "react-router-dom"
import PATH_URL from "../../routers/path";
import { pageUrlProductDetail } from "../../library/url";

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
  const id = props.id;
  return (
    <React.Fragment>
      <Link to={pageUrlProductDetail + id || "#"}>
      <Card
        hoverable
        bordered={true}
        style={cardStyle}
        cover={<img alt="example" src={urlImage} style={imageStyle}/>}
      >
        <Meta title={title} description={price} />
      </Card>
      </Link>
    </React.Fragment>
  );
};



export default Product;

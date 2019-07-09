import React from "react";
import { Card } from "antd";
import currencyRupiah from "../../library/currency";
import { Link } from "react-router-dom"
import { pageUrlProductDetail } from "../../library/url";
import "./style.sass";

const { Meta } = Card;

const cardStyle = {
  width: "100%",
};

let imageStyle = {
  maxWidth: "100 %",
  maxHeight: "100 %"
}

const Product = props => {
  const urlImage = props.urlImage;
  const title = props.name;
  const price = currencyRupiah(props.price);
  const id = props.id;
  return (
    <div className="productBorderWrapper">
      <Link to={pageUrlProductDetail + id || "#"}>
        <Card
          hoverable
          bordered={true}
          style={cardStyle}
          cover={<img alt="example" src={urlImage} style={imageStyle} />}
        >
          <Meta title={title} description={<span className="priceProduct">{price}</span>} />
        </Card>
      </Link>
    </div>
  );
};



export default Product;

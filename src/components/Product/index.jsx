import React from "react";
import { Card } from "antd";
import currencyRupiah from "../../library/currency";
import { Link } from "react-router-dom"
import { pageUrlProductDetail } from "../../library/url";
import "./style.sass";
import ButtonPlay from "../Button Play";

const { Meta } = Card;

const cardStyle = {
  height:"300px"
};

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
          cover={ 
            <div className="popular__image-cover">
            <img alt="example" src={urlImage} className="popular__image" />
            {props.videoUrl && <ButtonPlay type="thumbnail"/>}
            </div>
          }
        >
          <Meta title={title} description={<span className="priceProduct">{price}</span>} />
        </Card>
      </Link>
    </div>
  );
};



export default Product;

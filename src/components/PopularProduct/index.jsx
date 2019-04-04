import React from "react";
import { Card, Col } from "antd";
import currencyRupiah from "../../library/currency";
import LazyLoad from "react-lazyload";
import SkeletomImg from "react-js-skeleton";
import { Link } from "react-router-dom";
import "./style.sass";
import PATH_URL from "../../routers/path";

const { Meta } = Card;

const PopularProduct = props => {
  const { id, name, urlImage, price } = props.product;

  const priceRp = currencyRupiah(price);

  return (
    <div className="popular-wrapper">
      <Card
        bordered={false}
        className="popular__card"
        style={{
          background: "linear-gradient(188.23deg, #FFFFFF 65%, #D5D5D5 100%)"
        }}
        cover={
          <div className="popular__image-cover">
            <img alt="example" src={urlImage} className="popular__image" />
          </div>
        }
      >
        <div className="popular__info">
          <span className="popular__title">{name.substr(0, 8) + "..."}</span>
          <br />
          <span className="popular__price">{priceRp} </span>
        </div>
      </Card>
    </div>
  );
};

export default PopularProduct;

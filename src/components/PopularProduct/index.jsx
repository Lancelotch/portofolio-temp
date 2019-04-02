import React from "react";
import { Card } from "antd";
import currencyRupiah from "../../library/currency";
import LazyLoad from "react-lazyload";
import SkeletomImg from "react-js-skeleton";
import "./style.sass";
import PATH_URL from "../../routers/path";
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../library/url";

const { Meta } = Card;

const PopularProduct = props => {
  const { id, name, urlImage, price } = props.product;

  const priceRp = currencyRupiah(price);

  return (
    <div>
      <Link to={pageUrlProductDetail + id || "#"}>
        <Card
          bordered={false}
          className="popular__card"
          style={{
            height: "285px",
            width: "245px",
            padding: "20px",
            background: "linear-gradient( #FFFFFF1A , #E0E0E0 )"
          }}
          cover={
            <img alt="example" src={urlImage} className="popular__image" />
          }
        >
          <div>
            <span className="popular__title">{name.substr(0, 8) + "..."}</span>

            <br />
            <span className="popular__price">{priceRp} </span>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default PopularProduct;

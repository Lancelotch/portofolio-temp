import React from "react";
import { Card } from "antd";
import currencyRupiah from "../../library/currency";
import { Link } from "react-router-dom";
import "./style.sass";
import { pageUrlProductDetail } from "../../library/url";

const BestSeller = props => {
  const {  name, urlImage, price,id } = props.product;

  const priceRp = currencyRupiah(price);
  return (
    <div className="best-card">
      <div className="best__content">
      <Link to={pageUrlProductDetail + id || "#"}>
          <Card
            bordered={false}
            className="best__card"
            cover={
              <div className="best__image-cover">
                <img alt="example" src={urlImage} className="best__image" />
              </div>
            }
          >
            <div className="best__info">
              <p className="best__title">{name}</p>
              <p className="best__price">{priceRp} </p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default BestSeller;

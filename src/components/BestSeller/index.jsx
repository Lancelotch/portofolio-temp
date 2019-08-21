import React from "react";
import { Card } from "antd";
import currencyRupiah from "../../library/currency";
import { Link } from "react-router-dom";
import "./style.sass";
import { pageUrlProductDetail } from "../../library/url";
import ButtonVideo from "../ButtonVideo"

const BestSeller = props => {
  const { name, image, price, id, videoUrl } = props.product;
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
                <img alt="" src={image && image.defaultImage} className="best__image" />
                {videoUrl && <ButtonVideo className="play-button-card-products"/>}
              </div>
            }
          >
            <div className="best__info">
              <p className="best__nameProduct" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "1", overflow: "hidden" }}>{name}</p>
              <p className="best__price">{priceRp} </p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default BestSeller;

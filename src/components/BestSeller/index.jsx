import React from "react";
import { Link } from "react-router-dom";
import "./style.sass";
import { pageUrlProductDetail } from "../../library/url";
import Cards from "../Cards";

const BestSeller = props => {
  const { name, image, price, id, videoUrl } = props.product;
  const priceRp = price;
  return (
      <div className="mp-best-content">
        <Link to={pageUrlProductDetail + id || "#"}>
        <Cards
        type="best-seller"
        title={name}
        urlImage={image.defaultImage}
        price={priceRp}
        playButton={videoUrl}
      />
        </Link>
      </div>
  );
};

export default BestSeller;

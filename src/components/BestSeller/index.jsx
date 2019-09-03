import React from "react";
import currencyRupiah from "../../library/currency";
import { Link } from "react-router-dom";
import "./style.sass";
import { pageUrlProductDetail } from "../../library/url";
import Cards from "../Cards";

const BestSeller = props => {
  const { name, image, price, id, videoUrl } = props.product;
  const priceRp = currencyRupiah(price);
  return (
      <div className="mp-best-content">
        <Link to={pageUrlProductDetail + id || "#"}>
        <Cards
        type="bestSeller"
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

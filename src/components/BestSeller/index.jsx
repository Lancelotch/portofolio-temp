import React from "react";
import { Link } from "react-router-dom";
import "./style.sass";
import Cards from "../Cards";
import { PATH_PRODUCT } from "../../services/path/product";

const BestSeller = props => {
  const { name, image, price, id, videoUrl } = props.product;
  const priceRp = price;
  return (
      <div className="mp-best-content">
        <Link to={`${PATH_PRODUCT.PRODUCT}/${id} `|| "#"}>
        <Cards
        type="best-seller"
        title={name}
        urlImage={image && image.defaultImage}
        price={priceRp}
        playButton={videoUrl}
      />
        </Link>
      </div>
  );
};

export default BestSeller;

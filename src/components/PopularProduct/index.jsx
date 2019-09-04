import React from "react";
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../library/url";
import Cards from "../Cards";

const PopularProduct = props => {
  const { id, name, urlImage, price } = props;
  const priceRp = price;
  return (
    <Link to={pageUrlProductDetail + id || "#"}>
      <Cards
        type='popular'
        title={name}
        urlImage={urlImage}
        price={priceRp}
      />
    </Link>
  );
};

export default PopularProduct;

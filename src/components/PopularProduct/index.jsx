import React from "react";
import { Link } from "react-router-dom";
import Cards from "../Cards";
import { PATH_PRODUCT } from "../../services/path/product";

const PopularProduct = props => {
  const { id, name, urlImage, price } = props;
  const priceRp = price;
  return (
    <Link to={`${PATH_PRODUCT.PRODUCT}/${id} `|| "#"}>
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

import React from "react";
import { Link } from "react-router-dom"
import Cards from "../Cards";
import { PATH_PRODUCT } from "../../services/path/product";

const Product = props => {
  const urlImage = props.urlImage;
  const title = props.name;
  const price = props.price;
  const id = props.id;
  return (
    <Link to={`${PATH_PRODUCT.PRODUCT}/${id} `|| "#"}>
        <Cards
          urlImage={urlImage}
          title={title}
          price={price}
          playButton={props.videoUrl} />
      </Link>
  );
};



export default Product;

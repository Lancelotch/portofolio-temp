import React from "react";
import currencyRupiah from "../../library/currency";
import { Link } from "react-router-dom"
import { pageUrlProductDetail } from "../../library/url";
import Cards from "../Cards";

const Product = props => {
  const urlImage = props.urlImage;
  const title = props.name;
  const price = currencyRupiah(props.price);
  const id = props.id;
  return (
      <Link to={pageUrlProductDetail + id || "#"}>
        <Cards
          urlImage={urlImage}
          title={title}
          price={price}
          playButton={props.videoUrl} />
      </Link>
  );
};



export default Product;

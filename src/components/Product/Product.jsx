import React from "react";

import { Card, Row, Col } from "antd";
import CurrencyRp from "../Typography/CurrencyRp";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import Skeleton from "../Skeleton/Skeleton";
import SkeletonImg from "../Skeleton/SkeletonImg";

const { Meta } = Card;

function Product(props) {
  const { classes } = props;
  return (
    <div>
      <Card
        cover={
          <Link to={props.productId || "#"}>
            {props.productPic ? (
              <LazyLoad height={180}>
                <img
                  src={props.productPic}
                  style={{
                    width: "100%",
                    height: "180px",
                    display: "block"
                  }}
                />
              </LazyLoad>
            ) : (
              <SkeletonImg heightSkeleton="180px" widthSkeleton="100%" />
            )}
          </Link>
        }
      >
        {/* <Link to={props.productId || "#"}>
          {props.productPic ? (
            <LazyLoad height={180}>
             <img
                src={props.productPic}
                style={{
                  width: "100%",
                  height: "180px",
                  display: "block"
                }}
              />
            </LazyLoad>
          ) : (
            <SkeletonImg heightSkeleton="180px" widthSkeleton="100%" />
          )} */}

        <p>
          {props.productName !== undefined && props.productName.length > 30
            ? props.productName.trim().substring(0, 30) + "..."
            : props.productName || <Skeleton count={2} />}
        </p>
        <div>
          <span>
            {props.prices.length < 1 ? (
              <Skeleton />
            ) : (
              props.prices.map(price => {
                if (price.price.code === "IDR")
                  return (
                    <CurrencyRp
                      key={price.price.code}
                      price={price.price.value}
                    />
                  );
              })
            )}
          </span>
        </div>
        {/* </Link> */}
      </Card>
    </div>
  );
}

Product.propTypes = {
  productName: PropTypes.string
};

export default Product;

import React from "react";
import { Card as CardAnt, Progress, Rate } from "antd";
import ButtonPlay from "../ButtonPlay";
import classNames from "classnames";
import style from "./style.sass";
import PropTypes from "prop-types";
import currencyRupiah from "../../library/currency";

export default function Cards(props) {
  const classNamesStyle = classNames.bind(style);

  const cssClassesWrapper = classNamesStyle({
    "mp-card-default": props.type === "default",
    "mp-card-best-seller": props.type === "best-seller",
    "mp-card-large": props.type === "large",
    "mp-card-small": props.type === "small"
  });

  const cardTitle = classNamesStyle({
    "mp-card-default__title": props.type === "default",
    "mp-card-best-seller__title": props.type === "best-seller",
    "mp-card-large__title": props.type === "large",
    "mp-card-small__title": props.type === "small"
  });

  const cardPrice = classNamesStyle({
    "mp-card-default__price": props.type === "default",
    "mp-card-best-seller__price": props.type === "best-seller",
    "mp-card-large__description": props.type === "large",
    "mp-card-small__description": props.type === "small"
  });

  const boxImage = classNamesStyle({
    "mp-card-default__box-image": props.type === "default",
    "mp-card-best-seller__box-image": props.type === "best-seller",
    "mp-card-large__box-image": props.type === "large",
    "mp-card-small__box-image": props.type === "small"
  });

  const cardImage = classNamesStyle({
    "mp-card-default__image": props.type === "default",
    "mp-card-best-seller__image": props.type === "best-seller",
    "mp-card-large__image": props.type === "large",
    "mp-card-small__image": props.type === "small"
  });

  return (
    <div>
      <CardAnt
        bordered={false}
        className={cssClassesWrapper}
        bodyStyle={{ padding: "8px 16px" }}
        cover={
          <div className={boxImage}>
            {props.discount && (
              <div className="mp-card-badge">{props.discount}</div>
            )}
            <img alt="example" src={props.urlImage} className={cardImage} />
            {props.showPlayButton && <ButtonPlay type="thumbnail" />}
          </div>
        }
      >
        <div className="mp-card-info">
          <div>
            {props.rateValue && (
              <div className="mp-card-stars">
                <Rate allowHalf value={props.rateValue} disabled />
                <span>({props.totalVote})</span>
              </div>
            )}
            <span className={cardTitle}>{props.title}</span>
            {props.discountPrice ? (
              <div className="card-discount">
                <span className={cardPrice}>{currencyRupiah(props.price)}</span>
                <span className="card-discount-price">
                  {currencyRupiah(props.discountPrice)}
                </span>
              </div>
            ) : (
              <span className={cardPrice}>{currencyRupiah(props.price)}</span>
            )}
          </div>
          {props.totalSold && (
            <div className="mp-card-bar">
              <div className="mp-card-bar__info">
                <span>Terjual {props.totalSold}</span>
              </div>
              <Progress
                percent={props.itemLeft}
                showInfo={false}
                strokeColor="#fb6900"
              />
            </div>
          )}
        </div>
      </CardAnt>
    </div>
  );
}

Cards.propTypes = {
  type: PropTypes.oneOf(["default", "best-seller", "large", "small"]),
  showPlayButton: PropTypes.bool,
  urlImage: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.string,
  discountPrice: PropTypes.number,
  rateValue: PropTypes.number,
  totalVote: PropTypes.number,
  totalSold: PropTypes.number,
  itemLeft: PropTypes.number
};

Cards.defaultProps = {
  type: "default",
  showPlayButton: false
};

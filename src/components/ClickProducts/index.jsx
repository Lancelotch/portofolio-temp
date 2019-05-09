import React, { Component } from "react";
import currencyRupiah from "../../library/currency";
import { Card, Icon, Carousel } from "antd";
import "./style.sass";
import { pageUrlProductDetail } from "../../library/url";
import { Link } from "react-router-dom";

const SampleNextArrow = props => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        zIndex: "1",
        height: "60px",
        width: "60px",
        opacity: "0.5",
        backgroundColor: "#AAAAAA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "145px",
        right: "0px"
      }}
      onClick={onClick}
    >
      <Icon type="right"
        style={{
          fontSize: 50,
          color: "black"
        }} />
    </div>
  );
};

const SamplePrevArrow = props => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        marginRight: "30px",
        zIndex: "1",
        height: "60px",
        width: "60px",
        opacity: "0.5",
        backgroundColor: "#AAAAAA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "25px",
        top: "145px"
      }}
      onClick={onClick}
    >
      <Icon type="left"
        style={{
          fontSize: 50,
          color: "black"
        }} />
    </div>
  );
};

class ClickProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    const products = data.slice(0, 10)
    const settings = {
      dots: true,
      autoplay: 5000,
      arrows: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      swipeToSlide: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      appendDots: dots => (
        <div
          style={{
            borderRadius: 10,
            marginLeft: 10
          }}
        >
          <ul className="dots"> {dots} </ul>
        </div>
      )
    };

    const slides = products.map((product, i) => {
      return (
        <Link to={pageUrlProductDetail + product.id || "#"} key={i}>
          <Card
            className="card__style"
            cover={
              <div className="card__image-cover">
                <img
                  alt="example"
                  src={product.urlImage}
                  className="card__image"
                />
              </div>
            }
          >
            <div className="card__info">
              <p className="card__title">{product.name}</p>
              <p className="card__price">{currencyRupiah(product.price)}</p>
            </div>
          </Card>
        </Link>
      );
    });

    return (
      <div className="sliderClickProducts">
        <Carousel {...settings}>{slides}</Carousel>
      </div>
    );
  }
}

export default ClickProducts;

import React, { Component } from "react";
import currencyRupiah from "../../library/currency";
import { Row, Col, Card, Icon, Carousel } from "antd";
import Slider from "react-slick";
import "./style.sass";

const SampleNextArrow = props => {
  const { className, style, onClick } = props;
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
        marginRight: "40px",
        top: "145px"
      }}
    >
      >
      <Icon
        type="right"
        style={{ color: "white", fontSize: "30px" }}
        onClick={onClick}
      />
    </div>
  );
};

const SamplePrevArrow = props => {
  const { className, style, onClick } = props;
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
    >
      >
      <Icon
        type="left"
        style={{ color: "white", fontSize: "30px" }}
        onClick={onClick}
      />
    </div>
  );
};

class ClickProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products } = this.props;

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
            borderRadius: "10px",
            padding: "10px"
          }}
        >
          <ul className="dots"> {dots} </ul>
        </div>
      )
    };

    const slides = products.map(product => {
      return (
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
            <div>
              <p className="card__title">{product.name}</p>
              <p className="card__price">{currencyRupiah(product.price)}</p>
            </div>
          </Card>
      );
    });

    return (
      <React.Fragment>
        <Carousel {...settings}>{slides}</Carousel>
      </React.Fragment>
    );
  }
}

export default ClickProducts;

import React, { Component } from "react";
import { Row, Col, Card, Icon, Carousel } from "antd";
import Slider from "react-slick";
import "./style.sass";
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../library/url";

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
  const { className,onClick } = props;
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
        marginLeft: "25px"
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
        <Col md={3}>
          <Link to={pageUrlProductDetail + product.id || "#"}>
            <Card
              style={{
                height: "380px",
                width: "220px",
                background: "#fffff",
                borderRadius: "5px",
                marginRight: "20px",
                padding: "80px 20px 0px 20px",
                boxShadow: "0 3px 6px 0 rgba(0,0,0,0.3)"
              }}
              cover={
                <img
                  alt="example"
                  src={product.urlImage}
                  style={{ width: "100%" }}
                />
              }
            >
              <div>
                <p style={{ padding: "70px 0 0 0" }} className="best__title">
                  {product.name}
                </p>
                <p className="best__price">{product.price} </p>
              </div>
            </Card>
          </Link>
        </Col>
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

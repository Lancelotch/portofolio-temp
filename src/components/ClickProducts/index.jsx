import React, { Component } from "react";
import currencyRupiah from "../../library/currency";
import { Card, Icon, Carousel } from "antd";
import "./style.sass";
import { pageUrlProductDetail } from "../../library/url";
import { Link } from "react-router-dom";
import SkeletonCustom from "../Skeleton";

const SampleNextArrow = props => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        zIndex: "1",
        height: "60px",
        width: "60px",
        // opacity: "0.5",
        backgroundColor: "rgb(170, 170, 170, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "145px",
        right: "0px"
      }}
      onClick={onClick}
    >
      <Icon
        type="right"
        style={{ color: "white", fontSize: "30px" }}
      />
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
        // opacity: "0.5",
        backgroundColor: "rgb(170, 170, 170, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "25px",
        top: "145px"
      }}
      onClick={onClick}
    >
      <Icon
        type="left"
        style={{ color: "white", fontSize: "30px" }}
      />
    </div>
  );
};

class ClickProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products
    };
  }

  render() {
    const { data } = this.props;
    const products = data.slice(0, 10);
    let sliderToClickLength = products.length <= 6 ? false : true
    const settings = {
      slidesToShow: 5,
      slidesToScroll: 2,
      dots: true,
      infinite: sliderToClickLength,
      speed: 1000,
      autoplaySpeed: 7000,
      autoplay: true,
      arrows: true,
      swipeToSlide: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      appendDots: dots => (
        <div
          style={{
            borderRadius: 10
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
                  src={product.image.mediumUrl}
                  className="card__image"
                />
              </div>
            }
          >
            <div className="card__info">
              <p style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "1", overflow: "hidden", color: "#000000", fontSize: 16 }}>{product.name}</p>
              <p className="card__price">{currencyRupiah(product.price)}</p>
            </div>
          </Card>
        </Link>
      );
    });


    return (
      <div className="sliderClickProducts">
        {products.length < 1 ? (
          <SkeletonCustom
            count={4}
            height={300}
            leftMargin={13}
            rightMargin={13} />) :
          (<Carousel {...settings}>{slides}</Carousel>)
        }
      </div>
    );
  }
}

export default ClickProducts;

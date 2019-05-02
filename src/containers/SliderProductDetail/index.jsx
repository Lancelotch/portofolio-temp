import React, { Component } from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import ReactImageMagnify from 'react-image-magnify';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

class SliderProductDetailContainer extends Component {
  state = {
    slideIndex: 0,
    updateCount: 0
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isShowNav: false
    };
  }

  componentWillReceiveProps(props) {
    this.slider.slickGoTo(0)
    if (this.props.images.length > 6) {
      this.setState({
        isShowNav: true
      });
    }
  }

  render() {
    const images = [...this.props.thumbnailImage]
    const settings = {
      appendDots: dots => (
        <ul style={{
          margin: "0px",
          height: "auto"
        }}>
          {dots}
        </ul>
      ),
      customPaging: function (indexOfSlider) {
        return (
          <div
            style={{
              border: "1px solid rgba(151,151,151,0.22)",
              padding: 10
            }}>
            <img
              src={images[indexOfSlider].small}
              alt=""
              style={{
                height: 72,
                width: 72
              }}
            />
          </div>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      slickGoTo: false,
      // arrows: this.state.isShowNav,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    const slides = this.props.images.map((productImage, index) => {
      return (
        <img
          key={index}
          alt="example"
          src={productImage.large}
        />
      )
    });

    return (
      <Row>
        <Col md={24} sm={12}>
          <div className="customPagingImage">
            <Slider ref={slider => (this.slider = slider)} {...settings}>
              {slides}
            </Slider>
          </div>
        </Col>
      </Row>
    );
  }
}

SliderProductDetailContainer.propTypes = {
  productImages: PropTypes.arrayOf(Object)
};

export default SliderProductDetailContainer;

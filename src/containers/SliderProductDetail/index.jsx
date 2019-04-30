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

function _defineProperty(obj, key, value) {if (key in obj) 
  {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;
}



class SliderProductDetailContainer extends Component {
  constructor(props) {
    super(props);
    const slides = this.props.images.map(productImage => {
      return (
        <img
          alt="example"
          src={productImage.large}
        />
      )
    });
    this.originalImageWidth = slides
    this.originalImageHeight = slides
    this.state = {
      visible: false,
      isShowNav: false,
      // imageWidth: 0,
      // imageHeight: 0
    };
  }

  // updateImageDimensions = () => {
  //   let { offsetWidth: imageWidth = 0 } = document.getElementById('image-wrapper') || {}
  //   imageWidth -= 26
  //   const imageHeight = imageWidth * this.originalImageHeight / this.originalImageWidth
  //   this.setState({ imageWidth, imageHeight })
  // }


  // componentDidMount() {
  //   this.updateImageDimensions()
  //   window.addEventListener('resize', this.updateImageDimensions)
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateImageDimensions)
  // }

  componentWillReceiveProps(props) {
    if (this.props.images.length > 6) {
      this.setState({
        isShowNav: true
      });
    }
  }




  render() {
    const settings = {
      customPaging: function (i) {
        return (

          <img src={slides} alt="" />

        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      slickGoTo: false,
      // arrows: this.state.isShowNav,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    const slides = this.props.images.map(productImage => {
      return (
        <img
          alt="example"
          src={productImage.large}
        />
      )
    });

    return (
      <Row>
        <Col md={24} sm={12}>
          <Slider {...settings}>

              {slides}          
          </Slider>
        </Col>
      </Row>
    );
  }
}

SliderProductDetailContainer.propTypes = {
  productImages: PropTypes.arrayOf(Object)
};

export default SliderProductDetailContainer;

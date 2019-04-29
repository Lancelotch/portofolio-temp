import React, { Component } from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import ReactImageMagnify from 'react-image-magnify';
import Slider from "react-slick";
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
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isShowNav: false
    };
  }


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
          <a>
            <img src={i + slides} alt="" />
          </a>
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

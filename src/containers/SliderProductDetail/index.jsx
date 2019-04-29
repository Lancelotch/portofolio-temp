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
      // customPaging: function(i) {
      //   return (
      //     <a>
      //       <img src={slides} alt=""/>
      //     </a>
      //   );
      // },
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
            {this.props.images.map((src, index) => (
              <div className="inigambar" style={{ height: 450 }} key={index}>
                {console.log("iniii", src.large)}
                <ReactImageMagnify
                  className="inizoom"
                  {...{
                    smallImage: {
                      alt: 'Wristwatch by Versace',
                      isFluidWidth: true,
                      src: src.medium,
                      sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                    },
                    largeImage: {
                      src: src.large,
                      width: 772,
                      height: 401,

                    },
                    lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                  }}
                  {...{
                    enlargedImageContainerDimensions: { width: '100%', height: '100%' },
                    shouldHideHintAfterFirstActivation: false,
                    enlargedImagePosition: "over",
                    enlargedImageContainerStyle: { Index: 1000 }
                  }}

                />
              </div>
            )
            )}
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

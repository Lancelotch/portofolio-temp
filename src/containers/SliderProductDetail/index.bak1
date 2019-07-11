import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import Magnifier from "react-magnifier";
import "./style.sass";


class SliderProductDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowNav: false,
      startIndex: 0
    };
  }


  componentWillReceiveProps(props) {
    const images = this.props.images;
    let isShowNav = images.length > 4 ? true : false;
    this.setState({
      isShowNav: isShowNav
    });
  
  }

  imageHover(item) {
    return (
      <Magnifier
        zoomImgSrc={item.large}
        src={item.original}
        zoomFactor={0.5}
        mgShape={'square'}
        mgBorderWidth={0}
      />      
    );
  }

  render() {
    const images = [];
    this.props.images.forEach(image => {
      images.push({
        large: image.largeUrl,
        original: image.mediumUrl,
        thumbnail: image.smallUrl
      });
    });
    return (
      <Row>
        <Col md={24} sm={12}>
          <ImageGallery
            startIndex={this.state.startIndex}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={this.state.isShowNav}
            lazyLoad={true}
            renderItem={this.imageHover}
            items={images}
            disableArrowKeys={true}
          />
        </Col>
      </Row>
    );
  }
}

SliderProductDetailContainer.propTypes = {
  images: PropTypes.arrayOf(Object),
  imageVariant: PropTypes.object
};

export default SliderProductDetailContainer;


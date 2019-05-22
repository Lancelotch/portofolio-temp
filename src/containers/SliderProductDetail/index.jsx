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
      images: [],
      isImageVariantExist: false,
      isShowNav: false,
      startIndex: 0,
    };
  }


  componentWillReceiveProps(props) {
    this.slider.slideToIndex(0)
    this.setData(props.images, props.imageVariant);
  }

  setData(imagesProps, imageVariantProps) {
    const images = [...imagesProps];
    // const imageVariant = props.imageVariant;
    let isImageVariantExist = false;
    const imageVariant = { ...imageVariantProps };

    if (imageVariant.large !== undefined) {
      images.unshift(imageVariant);
      isImageVariantExist = true;
    }
    let isShowNav = images.length > 4 ? true : false;
    this.setState({
      images: images,
      isShowNav: isShowNav,
      isImageVariantExist: isImageVariantExist,
      startIndex: 0
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

  removeThumbnailImageVariant = () => {
    const images = this.state.images;
    const thumbnailDom = document.getElementsByClassName("image-gallery-thumbnail");
    const lenImagesWihoutVariant = images.length - 1;
    if (thumbnailDom.length > lenImagesWihoutVariant) {
      thumbnailDom[0].parentNode.removeChild(thumbnailDom[0]);
    }
  }

  changeSlide = (i) => {
    this.setState({
      startIndex: i
    })
  }

  render() {

    this.state.isImageVariantExist &&
      this.removeThumbnailImageVariant();

    const images = [];
    this.state.images.forEach(image => {
      images.push({
        large: image.large,
        original: image.medium,
        thumbnail: image.small
      });
    });

    return (
      <Row>
        <Col md={24} sm={12}>
          <ImageGallery
            ref={slider => (this.slider = slider)}
            startIndex={this.state.startIndex}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={this.state.isShowNav}
            // onSlide={this.changeSlide}
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


import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import ReactImageMagnify from "react-image-magnify";
import Viewer from "react-viewer";
import "react-viewer/dist/index.css";
import "./style.sass";

class SliderProductDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isImageVariantExist: false,
      isShowNav: false
    };
  }
 
  componentWillReceiveProps(props) {
    const images = [...props.images];
    // const imageVariant = props.imageVariant;
    let isImageVariantExist = false;
    const imageVariant = {
      small: "ssss",
      large: "ssss",
      medium: "ssss"
    }

    if(imageVariant.large !== undefined) {
      images.unshift(imageVariant);
      isImageVariantExist = true;
    }

    let isShowNav = images.length > 6 ? true : false;
    this.setState({
      images: images,
      isShowNav: isShowNav,
      isImageVariantExist: isImageVariantExist
    });
  }  

  imageHover(item) {
    return (
      <ReactImageMagnify
        {...{
          smallImage: {
            isFluidWidth: true,
            src: item.thumbnail,
          },
          largeImage: {
            width: 800,
            height: 800,
            src: item.original
          },
          lensStyle: { backgroundColor: "rgba(0,0,0,.6)" }
        }}
        {...{
          isHintEnabled: false,
          enlargedImageContainerDimensions: {width: '100%', height: '100%'},
          // shouldHideHintAfterFirstActivation: true,
          enlargedImagePosition: "over",
          enlargedImageContainerStyle: { Index: 1000 }
        }}
      />
    );
  }

  removeThumbnailImageVariant = () => {
    const thumbnailDom = document.getElementsByClassName("image-gallery-thumbnail");
    if(thumbnailDom.length > 0) {
      thumbnailDom[0].parentNode.removeChild(thumbnailDom[0]);
    }
  }

  render() {
    if(this.state.isImageVariantExist) {
      this.removeThumbnailImageVariant();
    }

    const images = [];
    this.state.images.forEach(image => {
      images.push({
        original: image.medium,
        thumbnail: image.small
      });
    });

    return (
      <Row>
        <Col md={24} sm={12}>
          <ImageGallery
            key={this.state.index}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={this.state.isShowNav}
            // startIndex={this.state.index}
            // renderItem={this.imageHover}
            items={images}
            disableArrowKeys={true}
          />
        </Col>
      </Row>
    );
  }
}

SliderProductDetailContainer.propTypes = {
  productImages: PropTypes.arrayOf(Object)
};

export default SliderProductDetailContainer;

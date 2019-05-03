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
      isShowNav: false,
      startIndex: 0
    };
  }

  componentWillReceiveProps(props) {   
    this.setData(props.images, props.imageVariant);
  }  

  setData(imagesProps, imageVariantProps) {
    const images = [...imagesProps];
    // const imageVariant = props.imageVariant;
    let isImageVariantExist = false;
    const imageVariant = {...imageVariantProps};

    if(imageVariant.large !== undefined) {
      images.unshift(imageVariant);
      isImageVariantExist = true;
    }

    let isShowNav = images.length > 6 ? true : false;
    this.setState({
      images: images,
      isShowNav: isShowNav,
      isImageVariantExist: isImageVariantExist,
      startIndex: 0
    });
    console.log(images);
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
    const images = this.state.images;
    const thumbnailDom = document.getElementsByClassName("image-gallery-thumbnail");
    const lenImagesWihoutVariant = images.length-1;
    if(thumbnailDom.length > lenImagesWihoutVariant) {
      thumbnailDom[0].parentNode.removeChild(thumbnailDom[0]);
    }
  }

  changeSlide = (i) => {
    this.setState({
      startIndex: i
    })
  }

  render() {
    if(this.state.isImageVariantExist) {
      // this.removeThumbnailImageVariant();
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
            startIndex={this.state.startIndex}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={this.state.isShowNav}
            onSlide={this.changeSlide}
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
  images: PropTypes.arrayOf(Object),
  imageVariant: PropTypes.object
};

export default SliderProductDetailContainer;

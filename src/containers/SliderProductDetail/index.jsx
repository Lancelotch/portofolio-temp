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
      imagesToShow: [],      
      imagesWithDefault: [],
      isImageVariantExist: false,
      isShowNav: false,
      startIndex: 0
    }
  }

  componentDidMount() {
    let imageDefault = this.props.imageDefault;
    let imagesProps = this.props.images;
    let imagesWithDefault = [];
    imagesProps.forEach( image => {
      if(image.isDefault !== true) {
        imagesWithDefault.unshift(image);
      }
    });
    imagesWithDefault.unshift(imageDefault);

    this.setState({
      imagesWithDefault: [...imagesWithDefault],
      imagesToShow: [...imagesWithDefault]
    })
  }
  
  componentWillReceiveProps(props) {
    if(props.isUpdateImageVariant) {
      this.showImages(props.imageVariant);
    }
  }


  // showImages(imagesProps, imageVariantProps) {
  //   const images = [...imagesProps];
  //   let isImageVariantExist = false;
  //   const imageVariant = { ...imageVariantProps };
  //   if (imageVariant.largeUrl !== undefined) {
  //     images.unshift(imageVariant);
  //     isImageVariantExist = true;
  //   } 
  //   let isShowNav = images.length > 4 ? true : false;
  //   this.setState({
  //     images: images,
  //     isShowNav: isShowNav,
  //     isImageVariantExist: isImageVariantExist,
  //     startIndex: 0
  //   });
  // }

  showImages(imageVariantProps = "") {
    let imagesToShow = [...this.state.imagesWithDefault];
      let isImageVariantExist = false;
      const imageVariant = { ...imageVariantProps };
      if (imageVariant.largeUrl !== undefined) {
        this.slider.slideToIndex(0)
        imagesToShow.unshift(imageVariant);
        isImageVariantExist = true;
      }
      let isShowNav = imagesToShow.length > 4 ? true : false;
      this.setState({
        imagesToShow: imagesToShow,
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
    const imagesToShow = this.state.imagesToShow;
    const thumbnailDom = document.getElementsByClassName("image-gallery-thumbnail");
    const lenImagesToShowWihoutVariant = imagesToShow.length - 1;
    console.log("inii ", thumbnailDom.length, " ", lenImagesToShowWihoutVariant);
    if (thumbnailDom.length > lenImagesToShowWihoutVariant) {
      thumbnailDom[0].parentNode.removeChild(thumbnailDom[0]);
    }
  }

  changeSlide = (i) => {
    this.setState({
      startIndex: i
    })
  }

  render() {
    this.state.isImageVariantExist && this.removeThumbnailImageVariant();
    const imagesToShow = [];
    this.state.imagesToShow.forEach(image => {
      imagesToShow.push({
        large: image.largeUrl,
        original: image.mediumUrl,
        thumbnail: image.smallUrl
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
            items={imagesToShow}
            disableArrowKeys={true}
          />
        </Col>
      </Row>
    );
  }
}

SliderProductDetailContainer.propTypes = {
  images: PropTypes.arrayOf(Object),
  imageVariant: PropTypes.object,
  imageDefault: PropTypes.object
};

export default SliderProductDetailContainer;


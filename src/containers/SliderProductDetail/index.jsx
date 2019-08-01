import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import { Row, Col, Modal, Button } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Magnifier from "react-magnifier";
import "./style.sass";

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

class SliderProductDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesToShow: [],
      imagesWithDefault: [],
      isImageVariantExist: false,
      startIndex: 0,
      showGalleryVideo: false
    }
    this.images = [
      {
        thumbnail: `${PREFIX_URL}4v.jpg`,
        original: `${PREFIX_URL}4v.jpg`,
        embedUrl: 'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
        description: 'Render custom slides within the gallery',
        renderItem: this._renderVideo
      }
    ].concat(this.renderImage)
  }

  componentDidMount() {
    let imageDefault = this.props.imageDefault;
    let imagesProps = this.props.images;
    let imagesWithDefault = [];
    imagesProps.forEach(image => {
      if (image.isDefault !== true) {
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
    if (props.isUpdateImageVariant) {
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
    this.setState({
      imagesToShow: imagesToShow,
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
    if (thumbnailDom.length > lenImagesToShowWihoutVariant) {
      thumbnailDom[0].parentNode.removeChild(thumbnailDom[0]);
    }
  }

  changeSlide = (i) => {
    this.setState({
      startIndex: i
    })
  }

  showHideVideo = () => {
    this.setState({
      showGalleryVideo: true
    })
  }

  hideVideo = () => {
    this.setState({
      showGalleryVideo: false
    })
  }


  _renderVideo = (item) => {
    return (

      <div className='image-gallery-image'>
        {
          this.state.showGalleryVideo === true ?
            <div className='video-wrapper'>

              <a
                className='close-video'
                onClick={() => this.showHideVideo()}
              >
              </a>
              <iframe
                title="asad"
                width='560'
                height='315'
                src={item.embedUrl}
                frameBorder='0'
                allowFullScreen
              >
              </iframe>
            </div>
            :
            <span onClick={() => this.showHideVideo()}>
              <div style={{ backgroundColor: "red" }} className='play-button'></div>
              <img src={item.original} alt="" />

              {
                item.description &&
                <span
                  className='image-gallery-description'
                  style={{ right: '0', left: 'initial' }}
                >
                  {item.description}
                </span>
              }
            </span>
        }
      </div>

    );
  }

  renderImage = () => {
    let imagesToShow = [];
    this.state.imagesToShow.forEach(image => {
      console.log(this.state.imagesToShow);
      imagesToShow.push({
        original: image.mediumUrl,
        thumbnail: image.smallUrl
      });
    });
    return imagesToShow;
  }

  render() {
    this.state.isImageVariantExist && this.removeThumbnailImageVariant();
    let isShowNav = this.props.images.length > 4 ? true : false
    return (
      <Row>
        <Col md={24} sm={12}>
          <ImageGallery
            ref={slider => (this.slider = slider)}
            startIndex={this.state.startIndex}
            showFullscreenButton={false}
            showPlayButton={false}
            //renderItem={this.imageHover}
            showNav={isShowNav}
            onSlide={this.changeSlide}
            lazyLoad={true}
            items={this.images}
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


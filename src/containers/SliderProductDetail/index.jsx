import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import { Row, Col, Modal } from "antd";
import PropTypes from "prop-types";
import Magnifier from "react-magnifier";
import "./style.sass";

const PREFIX_URL = `https://raw.githubusercontent.com/putrairawan992/assets-monggopesen/master/ic_button_play.png`;

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

  showImages(imageVariantProps = "") {
    let imagesToShow = [...this.state.imagesWithDefault];
    let isImageVariantExist = false;
    const imageVariant = { ...imageVariantProps };
    if (imageVariant.largeUrl !== undefined) {
      this.slider.slideToIndex(1)
      imagesToShow.unshift(imageVariant);
      isImageVariantExist = true;
    }
    this.setState({
      imagesToShow: imagesToShow,
      isImageVariantExist: isImageVariantExist,
      startIndex: 0
    });
  }

  removeThumbnailImageVariant = () => {
    const imagesToShow = this.state.imagesToShow;
    const thumbnailDom = document.getElementsByClassName("image-gallery-thumbnail");
    const lenImagesToShowWihoutVariant = imagesToShow.length - 1;
    if (thumbnailDom.length > lenImagesToShowWihoutVariant) {
      thumbnailDom[0].parentNode.removeChild(thumbnailDom[0]);
    }
  }

  pauseVideo = () => {
    this.setState({ showGalleryVideo: false });
  }

  changeSlide = (i) => {
    this.pauseVideo();
    this.setState({
      startIndex: i
    })
  }

  showHideVideo = () => {
    this.setState({
      showGalleryVideo: !this.state.showGalleryVideo
    })
  }

  itemVideo = (item) => {
    return (
      <div className='image-gallery-image'>
        {this.state.showGalleryVideo === true ?
          <Modal
          wrapClassName="modal-video-slider"
          title=" "
          visible={this.state.showGalleryVideo}
          onCancel={this.showHideVideo}
          centered
        >
          <div className='video-wrapper'>
         
              <iframe
                title="video"
                src={item.embedUrl}
                frameBorder='0'
                allowFullScreen
                allow='autoplay; encrypted-media'
              >
              </iframe>
      
          </div>
          </Modal>
          :
          <span onClick={() => this.showHideVideo()}>
              <div className='play-button' />
              <img src={item.original} alt="" className="video-image" />
            {/*item.description &&
              <span
                className='image-gallery-description'
                style={{ right: '0', left: 'initial' }}
              >
                {item.description}
            </span>*/}
          </span>}
      </div>
    )
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

  imageSlide = () => {
    let imagesToShow = [];
    this.state.imagesToShow.forEach(image => {
      imagesToShow.push({
        original: image.mediumUrl,
        thumbnail: image.smallUrl
      })
    })
    return imagesToShow
  }

  imagesandVideoToShow = () => {
    let imagesandVideoToShow = []
    const images = this.props.images
    let originalSlider = images.find(image => image).mediumUrl
    imagesandVideoToShow.push({
      thumbnail: PREFIX_URL,
      original: originalSlider,
      embedUrl: 'https://www.youtube.com/embed/PBXszycQmlU?autoplay=1&showinfo=0',
      description: 'Render custom slides within the gallery',
      renderItem: this.itemVideo
    })
    return imagesandVideoToShow.concat(this.imageSlide())
  }

  render() {
    this.state.isImageVariantExist && this.removeThumbnailImageVariant();
    let isShowNav = this.props.images.length > 4 ? true : false
    return (
      <Row>
        <Col md={24}>
          <ImageGallery
            ref={slider => (this.slider = slider)}
            items={this.imagesandVideoToShow()}
            renderItem={this.imageHover}
            onSlide={this.changeSlide}
            startIndex={this.state.startIndex}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={isShowNav}
            lazyLoad={true}
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


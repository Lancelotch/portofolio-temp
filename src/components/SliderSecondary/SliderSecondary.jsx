import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import ReactImageMagnify from "react-image-magnify";
import Viewer from "react-viewer";
import "react-viewer/dist/index.css";

class sliderProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      original: ""
    };
  }
  imageHover(item) {
    return (
      <ReactImageMagnify
        {...{
          smallImage: {
            isFluidWidth: true,
            src: item.thumbnail
          },
          largeImage: {
            src: item.original,
            width: 1500,
            height: 1000
          },
          lensStyle: { backgroundColor: "rgba(0,0,0,.6)" }
        }}
        {...{
          isHintEnabled: true,
          shouldHideHintAfterFirstActivation: false,
          enlargedImagePosition: "over",
          enlargedImageContainerStyle: { Index: 1000 }
        }}
      />
    );
  }

  imageViewer() {
    const images = [{ src: this.state.original }];
    this.props.productImages.map(productImage => {
      images.push({
        src: productImage.big
      });
    });
    return (
      <Viewer
        activeIndex={this.props.index}
        onMaskClick={e => void { clicked: true }}
        visible={this.state.visible}
        startIndex={0}
        zIndex={2000}
        drag={false}
        zoomable={true}
        attribute={true}
        title={true}
        rotatable={true}
        scalable={false}
        onClose={() => this.setState({ visible: false })}
        images={images}
      />
    );
  }

  render() {
    const images = [];
    this.props.productImages.map(productImage => {
      images.push({
        original: productImage.big,
        thumbnail: productImage.small
      });
    });

    return (
      <div className="container">
        <Row>
          <Col md={24} sm={12}>
            <ImageGallery
              showFullscreenButton={false}
              showPlayButton={false}
              startIndex={0}
              onClick={e =>
                this.setState({
                  visible: true,
                  original: e.target.firstChild.currentSrc
                })
              }
              renderItem={this.imageHover}
              items={images}
            />
            {this.imageViewer()}
          </Col>
        </Row>
      </div>
    );
  }
}

sliderProductDetail.propTypes = {
  productImages: PropTypes.arrayOf(Object)
};

export default sliderProductDetail;

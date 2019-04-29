import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import ReactImageMagnify from "react-image-magnify";
import Viewer from "react-viewer";
import "react-viewer/dist/index.css";

class SliderProductDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      original: "",
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

  

  imageHover(item) {
    console.log("====",item)
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
          isHintEnabled: true,
          enlargedImageContainerDimensions: {width: '100%', height: '100%'},
          // shouldHideHintAfterFirstActivation: true,
          enlargedImagePosition: "over",
          enlargedImageContainerStyle: { Index: 1000 }
        }}
      />
    );
  }

  imageViewer() {
    const images = [{ src: this.state.original }];  
    this.props.images.map(productImage => {
      return images.push({
        src: productImage.large
      });
    });
    return (
      <Viewer
        onMaskClick={e => void { clicked: true }}
        visible={this.state.visible}
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
    this.props.images.map(productImage => {
      return images.push({
        original: productImage.large,
        thumbnail: productImage.medium
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
            onClick={e =>
              this.setState({
                visible: true,
                original: e.target.firstChild.currentSrc
              })
            }
            renderItem={this.imageHover}
            items={images}
          />
          {/* {this.imageViewer()} */}
        </Col>
      </Row>
    );
  }
}

SliderProductDetailContainer.propTypes = {
  productImages: PropTypes.arrayOf(Object)
};

export default SliderProductDetailContainer;

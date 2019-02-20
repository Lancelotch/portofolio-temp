import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import ReactImageMagnify from "react-image-magnify";
import Viewer from "react-viewer";
import "react-viewer/dist/index.css";

class SliderProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      original: "",
      index:0
    };
  }
  componentDidMount(){
    this.setState({index:this.props.index})
  }
  componentWillReceiveProps(props){
    this.setState({index:props.index})
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
        src: productImage.large
      });
    });
    return (
      <Viewer
        activeIndex={this.state.index}
        onMaskClick={e => void { clicked: true }}
        visible={this.state.visible}
        startIndex={this.state.index}
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
        original: productImage.large,
        thumbnail: productImage.small
      });
    });

    return (
        <Row>
          <Col md={24} sm={12}>
            <ImageGallery
              key={this.state.index}
              showFullscreenButton={false}
              showPlayButton={false}
              startIndex={this.state.index}
              onClick={e =>
                this.setState({
                  visible: true,
                  original: e.target.firstChild.currentSrc
                })
              }
              // onSlide={this.props.slideChange}
              renderItem={this.imageHover}
              items={images}
            />
            {this.imageViewer()}
          </Col>
        </Row>
    );
  }
}

SliderProductDetail.propTypes = {
  productImages: PropTypes.arrayOf(Object)
};

export default SliderProductDetail;

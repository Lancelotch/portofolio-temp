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
      thumbnail: "",
      index:0,
      isShowNav : false
    };
  }
  componentDidMount(){
    this.setState({index:this.props.index})
  }
  componentWillReceiveProps(props){
    if(this.props.images.length > 6){
      this.setState({
        isShowNav : true
      })
     }  
    this.setState({index:props.index})
  } 
  imageHover(item) {
    return (
      <ReactImageMagnify
        {...{
          smallImage: {
            isFluidWidth: true,
            src: item.thumbnail,
            width: 1000,
            height: 1000
          },
          largeImage: {
            src: item.thumbnail,
            width: 1000,
            height: 1000
          },
          lensStyle: { backgroundColor: "rgba(0,0,0,.6)" }
        }}
        {...{
          shouldHideHintAfterFirstActivation: false,
          enlargedImagePosition: "over",
          enlargedImageContainerStyle: { Index: 1000 }
        }}
      />
    );
  }

  imageViewer() {
    const images = [{src: this.state.thumbnail}];
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
        thumbnail: productImage.large
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
              startIndex={this.state.index}
              onClick={e =>
                this.setState({
                  visible: true,
                  thumbnail: e.target.firstChild.currentSrc
                })
              }
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

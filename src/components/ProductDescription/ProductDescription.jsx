import React, { Component } from "react";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDescriptions: this.props.productDescriptions,
      activeImageIndexStart: 0
    };

    this.toggleCollapseLabelText = this.toggleCollapseLabelText.bind(this);
    this.isVisible = this.isVisible.bind(this);
    this.moveActiveImageIndexPointerStartToLast = this.moveActiveImageIndexPointerStartToLast.bind(
      this
    );
  }

  isVisible(index) {
    return this.state.activeImageIndexStart >= index
      ? { display: "" }
      : { display: "none" };
  }

  moveActiveImageIndexPointerStartToLast() {
    if (
      this.state.activeImageIndexStart === this.state.productDescriptions.length
    ) {
      this.setState({ activeImageIndexStart: 0 });
    }

    if (
      this.state.activeImageIndexStart < this.state.productDescriptions.length
    ) {
      this.setState({
        activeImageIndexStart: this.state.productDescriptions.length
      });
    }
  }

  toggleCollapseLabelText() {
    return this.state.activeImageIndexStart <
      this.state.productDescriptions.length
      ? "Show More"
      : "Hide More";
  }

  render() {
    const imageproduct = this.state.productDescriptions.map((item, index) => {
      const imageUrl = item.replace("_.webp", "");
      return (
        <div key={index} className="image-product-details">
          <img
            src={imageUrl}
            alt=""
            style={this.isVisible(index)}
            className="img-responsive"
          />
        </div>
      );
    }),
      toggleCollapseLabelText = this.toggleCollapseLabelText();

    return (
      <div>
        {imageproduct}
        <button
          onClick={this.moveActiveImageIndexPointerStartToLast}
          type="button"
          className="button-product-details"
        >
          {toggleCollapseLabelText}
        </button>
      </div>
    );
  }
}

export default ProductDescription;

import React, { Component, Fragment } from "react";
import composedWithFetchData from "../../hoc/withFetchData";
import { PATH_PRODUCT } from "../../api/path";

class ExamplePage extends Component {
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <Fragment>
        <p>Example</p>
      </Fragment>
    );
  }
}

export default composedWithFetchData(ExamplePage, PATH_PRODUCT.PRODUCT);

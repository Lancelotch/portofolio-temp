import React, { Component } from "react";
import Product from "../Product";
import product from "../../api/services/product";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row, Col } from "antd";

class Products extends Component {
  state = {
    products: [],
    limit: 0,
    hasMore: true,
    page: 0
  };

  getProductList = async () => {
    const { products, page } = this.state;
    try {
      const nextProduct = await product.listProductCategory(page);
      this.setState({
        products: products.concat(nextProduct.data),
        page: page + 1,
        limit: nextProduct.element
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getProductList();
  }

  fetchMoreData = () => {
    const { products, limit } = this.state;
    if (products.length >= limit) {
      this.setState({ hasMore: false });
      return;
    }
    this.getProductList();
  };

  renderProduct = products => {
    return products.map((product, index) => (
      <React.Fragment>
        <Col span={6}>
          <center>
            <Product
              key={product.id}
              urlImage={product.urlImage}
              name={product.name}
              price={product.price}
            />
          </center>
        </Col>
      </React.Fragment>
    ));
  };

  render() {
    const { products, hasMore } = this.state;
    return (
      <React.Fragment>
        <InfiniteScroll
          dataLength={products.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "right" }}>
              <b>Back To Top?</b>
            </p>
          }
        >
          <Row>{this.renderProduct(products)}</Row>
        </InfiniteScroll>
      </React.Fragment>
    );
  }
}

export default Products;

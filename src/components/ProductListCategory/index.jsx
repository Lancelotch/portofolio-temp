import React, { Component } from "react";
import Product from "../Product";
import product from "../../api/services/product";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row, Col, BackTop } from "antd";
import strings from "../../localization/localization";

const colStyle = {
  paddingRight: "16px",
  paddingBottom: "16px"
};

class ProductListCategory extends Component {
  state = {
    products: [],
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
  const { products, limit /*hasMore*/ } = this.state;
    if (products.length >= limit) {
      this.setState({ hasMore: false });
      return;
    }else{
      this.getProductList();
    }
  };

  renderProduct = products => {
    return products.map((product, index) => (
      <Col key={index} span={6} style={colStyle}>
        <Product
          id={product.id}
          urlImage={product.urlImage}
          name={product.name}
          price={product.price}
        />
      </Col>
    ));
  };

  render() {
    const { products, hasMore, limit=0 } = this.state;
    
    const categoryTextResult = strings.formatString(strings.category_text_result, limit, "sepatu");
    
    return (
      <React.Fragment>
        <p>{categoryTextResult}</p>
        <InfiniteScroll
          dataLength={products.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <div>
              <BackTop />
            </div>
          }
        >
          {this.renderProduct(products)}
        </InfiniteScroll>
      </React.Fragment>
    );
  }
}

export default ProductListCategory;

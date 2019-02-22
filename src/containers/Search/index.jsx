import React, { Component } from "react";
import { Row, Col, BackTop, Spin } from "antd";
import { connect } from "react-redux";
import Header from "components/Header";
import "sass/style.sass";
import Products from "../../components/Products";
import strings from "../../localization/localization";
import InfiniteScroll from "react-infinite-scroll-component";
import product from "../../api/services/product";
import "./style.sass";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      hasMore: true,
      page: 0,
      quote: this.props.match.params.quote,
      isProductAvailable: false
    };
  }

  getProductList = async () => {
    const { productList, page, quote } = this.state;
    const request = {
      page: page,
      quote: quote
    };
    try {
      const nextProduct = await product.listProductSearch(request);
      console.log(nextProduct);

      this.setState({
        productList: productList.concat(nextProduct.data),
        page: page + 1,
        limit: nextProduct.element,
        isProductAvailable: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getProductList();
  }

  fetchMoreData = () => {
    const { productList, limit, hasMore } = this.state;
    console.log(productList.length, hasMore, limit);

    if (productList.length >= limit) {
      this.setState({ hasMore: false });
      return;
    } else {
      this.getProductList();
    }
  };

  infiniteScroll = () => {
    const { productList, hasMore } = this.state;
    return (
      <InfiniteScroll
        dataLength={productList.length}
        next={this.fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="spin">
            <Spin size="large"/>
          </div>
        }
        endMessage={
          <div>
            <BackTop />
          </div>
        }
      >
        <Products productList={productList} />
      </InfiniteScroll>
    );
  };

  render() {
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      "limit",
      "sepatu"
    );
    return (
      <React.Fragment>
        <div className="container">
          <div className="container__first-item">
            <Row>
              <Col>
                <Header />
                <p>{categoryTextResult}</p>
                {this.state.isProductAvailable && this.infiniteScroll()}
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(SearchPage);
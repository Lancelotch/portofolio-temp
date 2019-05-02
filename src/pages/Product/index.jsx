import React, { Component, Suspense, Fragment } from "react";
import { Row, Col, BackTop } from "antd";
import { connect } from "react-redux";
import "sass/style.sass";
import strings from "../../localization/localization";
import InfiniteScroll from "react-infinite-scroll-component";
import product from "../../api/services/product";
import "./style.sass";
import SkeletonProduct from "../SkeletonProduct/SkeletonProduct";
import Spinner from "../../components/Spinner";
import SortListProduct from "../../components/SortListProduct/";

const Products = React.lazy(() => import("../../components/Products"));

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      hasMore: true,
      page: 0,
      isProductAvailable: false,
      loadingSkeleton: true,
      isQueryAvailable: true,
      limit: 20,
      direction: "desc",
      sortBy: "createdDate",
      element: 0
    };
  }

  componentDidMount() {
    this.getProductList();
  }

  getProductList = async () => {
    const {
      productList,
      page,
      limit
    } = this.state;
    const request = {
      page: page,
      limit: limit
    };
    try {
      const nextProduct = await product.products(request);
      this.setState({
        productList: productList.concat(nextProduct.data),
        page: page + 1,
        element: nextProduct.element,
        isProductAvailable: true
      });
    } catch (error) {
        console.log(error);
    }
  };

  fetchMoreData = () => {
    const { productList, element } = this.state;
    // , hasMore
    console.log("element", element);

    if (productList.length >= element) {
      this.setState({ hasMore: false });
      return;
    } else {
      this.getProductList();
    }
  };

  onChangeSort = sortValue => {
    const arraySort = sortValue.split("|");
    const sortBy = arraySort[0];
    const direction = arraySort[1];
    console.log(sortBy);
    this.setState(
      {
        productList: [],
        page: 0,
        sortBy: sortBy,
        direction: direction,
        hasMore: true
      },
      () => this.getProductList()
    );
  };

  infiniteScroll = () => {
    const { productList, hasMore, query, element } = this.state;
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      element,
      <b>{query}</b>
    );
    return (
      <Fragment>
        <SortListProduct onChange={this.onChangeSort} />
        <InfiniteScroll
          dataLength={productList.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={<Spinner size="large" />}
          endMessage={
            <div>
              <BackTop />
            </div>
          }
        >
          <Suspense fallback={<SkeletonProduct count={20} />}>
            <Products productList={productList} />
          </Suspense>
        </InfiniteScroll>
      </Fragment>
    );
  };

  renderProducts = () => {
    return this.state.isProductAvailable ? (
      this.infiniteScroll()
    ) : (
      <SkeletonProduct count={20} />
    );
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <div className="container">
                {this.renderProducts()}
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(ProductPage);

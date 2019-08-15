import React, { Component, Suspense } from "react";
import { Row, Col, BackTop } from "antd";
import { connect } from "react-redux";
import "sass/style.sass";
import InfiniteScroll from "react-infinite-scroll-component";
import product from "../../api/services/product";
import SkeletonCustom from "../../components/Skeleton";
import Spinner from "../../components/Spinner";
import SortListProduct from "../../components/SortListProduct";

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
    window.scrollTo(0, 0);
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
    const { productList, hasMore } = this.state;
    // const categoryTextResult = strings.formatString(
    //   strings.category_text_result,
    //   element,
    //   <b>{query}</b>
    // );
    return (
      <div style={{ marginTop: 35 }}>
        <div style={{
          display: "flex",
          justifyContent: "flex-end"
        }}>
          <SortListProduct
            defaultValue={"createdDate|desc"}
            onChange={this.onChangeSort}
            valueLow={"price.idr|asc"}
            valueHigh={"price.idr|desc"} />
        </div>
        <InfiniteScroll
          dataLength={productList.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={productList.length < 20 ? false : <Spinner size="large" />}
          endMessage={
            <div>
              <BackTop />
            </div>
          }
        >
          <div style={{ marginTop: 35, marginLeft: 8 }}>
            <Suspense fallback={
              <SkeletonCustom
                count={20}
                height={300}
                leftMargin={13}
                topMargin={15}
                rightMargin={13} />}>
              {productList.map((product, index) =>
                <Products
                  key={index}
                  id={product.id}
                  defaultImage={product.image.mediumUrl}
                  information={product.name}
                  price={product.price}
                  videoUrl={product.videoUrl}
                />
              )}
            </Suspense>
          </div>
        </InfiniteScroll>
      </div>
    );
  };

  renderProducts = () => {
    return this.state.isProductAvailable ? (
      this.infiniteScroll()
    ) : (
        <SkeletonCustom
          count={20}
          height={300}
          leftMargin={13}
          topMargin={15}
          rightMargin={13} />
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

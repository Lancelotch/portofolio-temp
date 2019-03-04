import React, { Component, Suspense, Fragment } from "react";
import { Row, Col, BackTop, Spin, Card } from "antd";
import { connect } from "react-redux";
import Header from "components/Header";
import "sass/style.sass";

//import Products from "../../components/Products";
import strings from "../../localization/localization";
import InfiniteScroll from "react-infinite-scroll-component";
import product from "../../api/services/product";
import "./style.sass";
import SkeletonProduct from "../SkeletonProduct/SkeletonProduct";
import Spinner from "../../components/Spinner";
import getParamUrl from "../../library/getParamUrl";

const Products = React.lazy(() => import("../../components/Products"));

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      hasMore: true,
      page: 0,
      isProductAvailable: false,
      loadingSkeleton: true,
      query: "",
      isQueryAvailable : true,
      limit: 20,
      direction: "asc",
      sortBy: ""
    };
  }

  componentDidMount() {
    this.getProductList();
  }

  getProductList = async () => {
    const { productList, page, limit, sortBy, direction } = this.state;
    const { location } = this.props;
    const { query } = getParamUrl(location);
    this.setState({
      query: query
    });
    const request = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      direction: direction,
      query: query
    };
    try {
      const nextProduct = await product.listProductSearch(request);
      this.setState({
        productList: productList.concat(nextProduct.data),
        page: page + 1,
        limit: nextProduct.element,
        isProductAvailable: true
      });
    } catch (error) {
      console.log(error);
      if(error.status === 404){
        this.setState({
          isQueryAvailable : false
        })
      }
    }
  };

  fetchMoreData = () => {
    const { productList, limit, hasMore } = this.state;
    if (productList.length >= limit) {
      this.setState({ hasMore: false });
      return;
    } else {
      this.getProductList();
    }
  };

  infiniteScroll = () => {
    const { productList, hasMore, query, limit } = this.state;
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      limit,
      <b>{query}</b>
    );
    return (
      <Fragment>
        <p>{categoryTextResult}</p>
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

  renderNotFound = () => {
    const {query} = this.state;
    return (
      <p>Oooopppss... <b>"{query}"</b> tidak ditemukan</p>
    )
  }

  showResultSearch = (isQueryAvailable) => (
    isQueryAvailable === true ? this.renderProducts() : this.renderNotFound()
  )

  render() {
    const {match} = this.props;
    const {isQueryAvailable} = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="container__first-item">
            <Row>
              <Col>
                <Header match={match}/>
                  {this.showResultSearch(isQueryAvailable)}
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

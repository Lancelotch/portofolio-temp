import React, { Component, Suspense } from "react";
import { BackTop} from "antd";
import { connect } from "react-redux";
import "sass/style.sass";
import strings from "../../localization/localization";
import InfiniteScroll from "react-infinite-scroll-component";
import product from "../../api/services/product";
import "./style.sass";
import SkeletonProduct from "../SkeletonProduct/SkeletonProduct";
import Spinner from "../../components/Spinner";
import getParamUrl from "../../library/getParamUrl";
import SortListProduct from "../../components/SortListProduct/";
import Search from "./";

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
        element: nextProduct.element,
        isProductAvailable: true
      });
    } catch (error) {
      if (error.status === 404) {
        this.setState({
          isQueryAvailable: false
        });
      }
    }
  };

  fetchMoreData = () => {
    const { productList, element } = this.state;
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
    const { productList, hasMore, query, element } = this.state;
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      <b style={{ fontStyle: "oblique", fontWeight: 600 }}>"{element}"</b>,
      <b style={{ color: "#FF416C" }}>{query}</b>
    );
    return (
      <div style={{ marginTop: 15 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="categoryTextResult">{categoryTextResult}</span>
          <span>Urutkan &nbsp;&nbsp;&nbsp;
            <SortListProduct onChange={this.onChangeSort} /></span>
        </div>
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
          <div style={{ marginTop: 35 }}>
            <Suspense fallback={<SkeletonProduct count={20} />}>
              <Products productList={productList} />
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
        <SkeletonProduct count={20} />
      );
  };

  renderNotFound = () => {
    const { query } = this.state;
    return (
      <p>
        Oooopppss... <b>"{query}"</b> tidak ditemukan
      </p>
    );
  };

  showResultSearch = isQueryAvailable =>
    isQueryAvailable === true ? this.renderProducts() : this.renderNotFound();

  render() {
    const { match } = this.props;
    const { isQueryAvailable } = this.state;
    return (
      <Search match={match}>
        {this.showResultSearch(isQueryAvailable)}
      </Search>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(SearchPage);

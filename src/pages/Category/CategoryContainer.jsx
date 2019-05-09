import React, { Component, Suspense, Fragment } from "react";
import {BackTop } from "antd";
import { connect } from "react-redux";
// import Header from "components/Header";
import "sass/style.sass";
import strings from "../../localization/localization";
import InfiniteScroll from "react-infinite-scroll-component";
import product from "../../api/services/product";
import "./style.sass";
import SkeletonProduct from "../SkeletonProduct/SkeletonProduct";
import Spinner from "../../components/Spinner";
import SortListProduct from "../../components/SortListProduct/";
import Category from "./";
const Products = React.lazy(() => import("../../components/Products"));

class CategoryPage extends Component {
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
      element: 0,
      categoryId: ""
    };
  }

  componentDidMount() {
    const params = this.props.match.params;
    this.getCategoryId(params);
  }

  componentWillReceiveProps(props) {
    const params = props.match.params;
    this.getCategoryId(params);
  }

  getCategoryId = (params) => {
    // console.log("tess");
    const categoryId = params[Object.keys(params)[Object.keys(params).length - 1]];
    this.setState({
      categoryId: categoryId,
      isProductAvailable: false,
      productList: [],
      page: 0,
      hasMore: true
    }, () => this.getProductList());
  }

  getProductList = async () => {
    const {
      productList,
      page,
      limit,
      sortBy,
      direction,
      categoryId
    } = this.state;
    const request = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      direction: direction,
      categoryId: categoryId
    };
    try {
      const nextProduct = await product.listProductCategory(request);
      this.setState({
        productList: productList.concat(nextProduct.data),
        page: page + 1,
        element: nextProduct.element,
        isProductAvailable: true
      });
    } catch (error) {
      this.handleCategoryNotFound(error)
    }
  };

  handleCategoryNotFound = (error) => {
    console.log("okesip", error);
    if (error.status !== 200) {
      this.props.history.push('/products');
      this.setState({
        isQueryAvailable: false
      });
    }
  }

  fetchMoreData = () => {
    const { productList, element} = this.state;
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
    const { productList, hasMore, categoryId, element } = this.state;
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      <b style={{ fontStyle: "oblique", fontWeight: 600 }}>"{element}"</b>,
      <b style={{ color: "#FF416C" }}>{categoryId}</b>
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
          endMessage={<BackTop />}
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

  render() {
    const { match } = this.props;
    return (
      <Category match={match}>
        {this.renderProducts()}
      </Category>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(CategoryPage);

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
      query: this.props.match.params.categoryId,
      isQueryAvailable: true,
      limit: 20,
      direction: "desc",
      sortBy: "createdDate",
      element: 0,
      categoryId: this.props.match.params.categoryId
    };
  }

  componentDidMount() {
    this.getProductList();
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

  handleCategoryNotFound = (error)=> {
    if (error.status === 500) {
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
    const { productList, hasMore, query, element } = this.state;
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      element,
      <b>{query}</b>
    );
    return (
      <Fragment>
        <p>{categoryTextResult} </p>
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
      <Category match = {match}>
        {this.renderProducts()}
      </Category>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(CategoryPage);

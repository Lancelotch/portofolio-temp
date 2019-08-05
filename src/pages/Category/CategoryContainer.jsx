import React, { Component, Suspense } from "react";
import { BackTop } from "antd";
import { connect } from "react-redux";
import strings from "../../localization/localization";
import InfiniteScroll from "react-infinite-scroll-component";
import product from "../../api/services/product";
import SkeletonCustom from "../../components/Skeleton";
import Spinner from "../../components/Spinner";
import SortListProduct from "../../components/SortListProduct";
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
      sortBy: "price.amount",
      element: 0,
      categoryId: "",
      categoryIdName:""
    };
  }

  componentDidMount() {
    const params = this.props.match.params;
    this.getCategoryId(params);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(props) {
    const params = props.match.params;
    this.getCategoryId(params);
  }

  getCategoryId = (params) => {
    const categoryIdName = params[Object.keys(params)[Object.keys(params).length - 1]];
    const categoryId = Object.entries(params).map(([key, val]) => `${val}`).join('/')
    this.setState({
      categoryIdName: categoryIdName,
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
    if (error.status !== 200) {
      this.props.history.push('/products');
      this.setState({
        isQueryAvailable: false
      });
    }
  }

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
    console.log(arraySort);
    
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
    const { productList, hasMore, element,categoryIdName } = this.state;
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      <b style={{ fontStyle: "oblique", fontWeight: 600 }}>"{element}"</b>,
      <b style={{ color: "#FF416C" }}>{categoryIdName}</b>
    );
    return (
      <div style={{ marginTop: 35, marginLeft: 8 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
          <span className="categoryTextResult">{categoryTextResult}</span>
          <span>Urutkan &nbsp;&nbsp;&nbsp;
            <SortListProduct
              defaultValue={"createdDate|desc"}
              onChange={this.onChangeSort}
              valueLow={"price.amount|asc"}
              valueHigh={"price.amount|desc"} /></span>
        </div>
        <InfiniteScroll
          dataLength={productList.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={productList.length < 20 ? "" : <Spinner size="large" />}
          endMessage={<BackTop />}>
          <div style={{ marginTop: 35 }}>
            <Suspense fallback={
              <SkeletonCustom
                count={20}
                height={300}
                leftMargin={13}
                rightMargin={13}
                topMargin={15} />}>
              {productList.map((product, index) =>
                <Products
                  key={index}
                  id={product.id}
                  defaultImage={product.image.mediumUrl}
                  information={product.name}
                  price={product.price}
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
          rightMargin={13}
        />
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

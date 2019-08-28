import React, { Suspense, useState, useEffect } from "react";
import { Row, Col, BackTop } from "antd";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import product from "../../api/services/product";
import SkeletonCustom from "../../components/Skeleton";
import Spinner from "../../components/Spinner";
import SortListProduct from "../../components/SortListProduct";

const Products = React.lazy(() => import("../../components/Products"));

function ProductPage(props) {
  const [productList, setProductList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [isProductAvailable, setIsProductAvailable] = useState(false)
  const [loadingSkeleton, setLoadingSkeleton] = useState(true)
  const [isQueryAvailable, setIsQueryAvailable] = useState(true)
  const [limit, setLimit] = useState(20)
  const [direction, setDirection] = useState("desc")
  const [sortBy, setSortBy] = useState("createdDate")
  const [element, setElement] = useState(0)

  useEffect(()=> {
    getProductList();
    window.scrollTo(0, 0);
  },[])

  async function getProductList() {
    const request = {
      page: page,
      limit: limit
    };
      const nextProduct = await product.products(request);
      if(nextProduct.code === "200"){
        setProductList(productList.concat(nextProduct.data))
        setPage(page + 1)
        setElement(nextProduct.element)
        setIsProductAvailable(true)
      }
  };

  function fetchMoreData() {
    // , hasMore
    if (productList.length >= element) {
      setHasMore(false)
      return;
    } else {
      getProductList();
    }
  };

  function onChangeSort(sortValue) {
    const arraySort = sortValue.split("|");
    const sortBy = arraySort[0];
    const direction = arraySort[1];
    setProductList([])
    setPage(0)
    setSortBy(sortBy)
    setDirection(direction)
    setHasMore(true)
    getProductList()
    // this.setState(
    //   {
    //     productList: [],
    //     page: 0,
    //     sortBy: sortBy,
    //     direction: direction,
    //     hasMore: true
    //   },
    //   () => this.getProductList()
    // );
  };

  function infiniteScroll() {
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
            onChange={onChangeSort}
            valueLow={"price.idr|asc"}
            valueHigh={"price.idr|desc"} />
        </div>
        <InfiniteScroll
          dataLength={productList.length}
          next={fetchMoreData}
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

  function renderProducts() {
    return isProductAvailable ? (
      infiniteScroll()
    ) : (
        <SkeletonCustom
          count={20}
          height={300}
          leftMargin={13}
          topMargin={15}
          rightMargin={13} />
      );
  };

    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <div className="container">
              {renderProducts()}
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(ProductPage);

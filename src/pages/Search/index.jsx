import React, { Suspense, useState, useEffect } from "react";
import { BackTop, Row, Col } from "antd";
import strings from "../../localization/localization";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonCustom from "../../components/Skeleton";
import Spinner from "../../components/Spinner";
import getParamUrl from "../../library/getParamUrl";
import NoResultSearch from "../../components/NoResultSearch";
import SortListProduct from "../../components/SortListProduct";
import Product from "../../repository/Product";

const Products = React.lazy(() => import("../../containers/Products"));

export default function Search(props) {
  const [productList, setProductList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isProductAvailable, setIsProductAvailable] = useState(false);
  const [query, setQuery] = useState("");
  const [isQueryAvailable, setIsQueryAvailable] = useState(true);
  const [direction, setDirection] = useState("desc");
  const [sortBy, setSortBy] = useState("");
  const [totalData, setTotalData] = useState(0);
  const limit = 20;

  useEffect(() => {
    onRefresh();
    getProductList();
  }, [direction, sortBy, props.location.search]);

  function onRefresh() {
    setProductList([]);
    setPage(0);
  }

  async function getProductList() {
    const { location } = props;
    const { query } = getParamUrl(location);
    setQuery(query);
    const request = {
      keyword: query,
      page: page,
      limit: limit,
      sortBy: sortBy,
      direction: direction
    };
    const nextProduct = await Product.getByKeyword({ request });
    if (nextProduct.status === 200) {
      setProductList(productList.concat(nextProduct.products));
      setPage(page + 1);
      setTotalData(nextProduct.totalData);
      setIsProductAvailable(true);
      setIsQueryAvailable(true);
    } else {
      setIsQueryAvailable(false);
    }
  }

  function fetchMoreData() {
    if (productList.length >= totalData) {
      setHasMore(false);
      return;
    } else {
      getProductList();
    }
  }

  function onChangeSort(sortValue) {
    const arraySort = sortValue.split("|");
    const sortBy = arraySort[0];
    const direction = arraySort[1];
    setProductList([]);
    setPage(0);
    setSortBy(sortBy);
    setDirection(direction);
    setHasMore(true);
  }

  function infiniteScroll() {
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      <b style={{ fontStyle: "oblique", fontWeight: 600 }}>"{totalData}"</b>,
      <b style={{ color: "#FF416C" }}>{query}</b>
    );
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "24px 24px 0"
          }}
        >
          <span className="categoryTextResult">{categoryTextResult}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Urutkan &nbsp;&nbsp;&nbsp;</span>
            <SortListProduct
              defaultValue={"|desc"}
              onChange={onChangeSort}
              valueOld={"|asc"}
              valueLow={"price.amount|asc"}
              valueHigh={"price.amount|desc"}
            />
          </div>
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
          <div style={{ marginTop: 24 }}>
            <Suspense
              fallback={
                <SkeletonCustom
                  count={20}
                  height={300}
                  leftMargin={13}
                  rightMargin={13}
                />
              }
            >
              <Products products={productList} />
            </Suspense>
          </div>
        </InfiniteScroll>
      </div>
    );
  }

  function renderProducts() {
    return isProductAvailable ? (
      infiniteScroll()
    ) : (
      <SkeletonCustom
        count={20}
        height={300}
        leftMargin={13}
        topMargin={15}
        rightMargin={13}
      />
    );
  }

  function renderNotFound() {
    return <NoResultSearch query={query} />;
  }

  function showResultSearch(showRender) {
    return showRender === true ? renderProducts() : renderNotFound();
  }

  return (
    <Row>
      <Col>
        <div className="container">{showResultSearch(isQueryAvailable)}</div>
      </Col>
    </Row>
  );
}

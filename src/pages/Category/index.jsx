import React, { Suspense, useEffect, useState } from "react";
import { BackTop, Row, Col, Divider } from "antd";
import strings from "../../localization/localization";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonCustom from "../../components/Skeleton";
import Spinner from "../../components/Spinner";
import SortListProduct from "../../components/SortListProduct";
import Breadcrumbs from "../../components/Breadcrumbs/index.js";
import { escapeRegExp } from "../../library/regex";
import Product from "../../repository/Product";

const Products = React.lazy(() => import("../../containers/Products"));

export default function Category(props) {
  const [productList, setProductList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isProductAvailable, setIsProductAvailable] = useState(false);
  const [direction, setDirection] = useState("desc");
  const [sortBy, setSortBy] = useState("");
  const [element, setElement] = useState(0);
  const limit = 20

  const params = props.match.params;

  useEffect(() => {
    getProductList();
  }, [params, direction, sortBy]);

  async function getProductList() {
    const categoryId = Object.entries(params)
      .map(([key, val]) => `${val}`)
      .join("/");
    const objparams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      direction: direction
    };
    const nextProduct = await Product.getByCategory({
      categoryId,
      objparams
    });
    if (nextProduct.status === 200) {
      setProductList(nextProduct.data.data);
      setPage(page);
      setElement(nextProduct.data.element);
      setIsProductAvailable(true);
    } else {
      handleCategoryNotFound(nextProduct);
    }
  }

  function handleCategoryNotFound(error) {
    if (error.status !== 200) {
      props.history.push("/products");
    }
  }

  function fetchMoreData() {
    if (productList.length >= element) {
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
    const categoryIdName =
      params[Object.keys(params)[Object.keys(params).length - 1]];
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      <b style={{ fontStyle: "oblique", fontWeight: 600 }}>"{element}"</b>,
      <b style={{ color: "#FF416C" }}>{escapeRegExp(categoryIdName)}</b>
    );
    return (
      <div style={{ marginTop: 24 }}>
        <div style={{margin: "0 24px"}}>
          <Breadcrumbs />
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 24px"
          }}
        >
          <div>{categoryTextResult}</div>
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
          loader={productList.length < 20 ? "" : <Spinner size="large" />}
          endMessage={<BackTop />}
        >
          <div>
            <Suspense
              fallback={
                <SkeletonCustom
                  count={20}
                  height={300}
                  leftMargin={13}
                  rightMargin={13}
                  topMargin={15}
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

  return (
    <React.Fragment>
      <Row>
        <Col xs={24} md={24}>
          {renderProducts()}
        </Col>
      </Row>
    </React.Fragment>
  );
}

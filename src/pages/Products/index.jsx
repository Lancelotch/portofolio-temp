import React, { Suspense, useState, useEffect } from "react";
import { Row, Col, BackTop } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonCustom from "../../components/Skeleton";
import Spinner from "../../components/Spinner";
import SortListProduct from "../../components/SortListProduct";
import ProductRepo from "../../repository/Product";

const ProductsContainer = React.lazy(() => import("../../containers/Products"));

export default function Products() {
  const [productList, setProductList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isProductAvailable, setIsProductAvailable] = useState(false);
  const [direction, setDirection] = useState("desc");
  const [sortBy, setSortBy] = useState("");
  const [element, setElement] = useState(0);
  const limit = 20

  useEffect(() => {
    getProductList();
  }, [direction, sortBy]);

  async function getProductList() {
    const request = {
      limit: limit,
      sortBy: sortBy,
      direction: direction
    };
    const nextProduct = await ProductRepo.getAll({ page, request });
    if (nextProduct.status === 200) {
      setProductList(productList.concat(nextProduct.data.data));
      setElement(nextProduct.data.element);
      setIsProductAvailable(true);
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
    return (
      <div style={{ marginTop: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "0 24px"
          }}
        >
          <SortListProduct
            defaultValue={"|desc"}
            onChange={onChangeSort}
            valueOld={"|asc"}
            valueLow={"price.amount|asc"}
            valueHigh={"price.amount|desc"}
          />
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
                  topMargin={15}
                  rightMargin={13}
                />
              }
            >
              <ProductsContainer products={productList} />
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
          <div className="container">{renderProducts()}</div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

import React, { Suspense, useEffect, useState, useRef } from "react";
import { BackTop } from "antd";
import strings from "../../localization/localization";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonCustom from "../../components/Skeleton";
import Spinner from "../../components/Spinner";
import SortListProduct from "../../components/SortListProduct";
import Category from "./";
import Breadcrumbs from "../../components/Breadcrumbs/index.js";
import { escapeRegExp } from "../../library/regex";
import Product from "../../repository/Product";

const Products = React.lazy(() => import("../../components/Products"));

export default function CategoryPage(props) {
  const [productList, setProductList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isProductAvailable, setIsProductAvailable] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [query, setQuery] = useState("");
  const [isQueryAvailable, setIsQueryAvailable] = useState(true);
  const [limit, setLimit] = useState(20);
  const [direction, setDirection] = useState("desc");
  const [sortBy, setSortBy] = useState("price.amount");
  const [element, setElement] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryIdName, setCategoryIdName] = useState(0);
  const params = props.match.params;

  useEffect(() => {
    getProductList();
  }, [params, sortBy, direction]);

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
      setPage(page + 1);
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
    console.log(arraySort);
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
      <div style={{ marginTop: 35, marginLeft: 8 }}>
        <div style={{ marginBottom: 30 }}>
          <Breadcrumbs />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <span className="categoryTextResult">{categoryTextResult}</span>
          <span>
            Urutkan &nbsp;&nbsp;&nbsp;
            <SortListProduct
              defaultValue={"createdDate|desc"}
              onChange={onChangeSort}
              valueLow={"price.amount|asc"}
              valueHigh={"price.amount|desc"}
            />
          </span>
        </div>
        <InfiniteScroll
          dataLength={productList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={productList.length < 20 ? "" : <Spinner size="large" />}
          endMessage={<BackTop />}
        >
          <div style={{ marginTop: 35 }}>
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
              {productList.map((product, index) => (
                <Products
                  key={index}
                  id={product.id}
                  defaultImage={product.image.mediumUrl}
                  information={product.name}
                  price={product.price}
                  videoUrl={product.videoUrl}
                />
              ))}
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

  const { match } = props;
  return <Category match={match}>{renderProducts()}</Category>;
}

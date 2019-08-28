import React, { useState, useEffect } from "react";
import Product from "../Product";
import product from "../../repository/Product";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row, Col, BackTop } from "antd";
import strings from "../../localization/localization";

const colStyle = {
  paddingRight: "16px",
  paddingBottom: "16px"
};

export default function ProductListCategory() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    limit: "",
    page: page,
    sortBy: "",
    direction: ""
  });

  async function getProductList() {
    const nextProduct = await product.getByCategory({
      params: params,
      loading: setLoading
    });
    if (nextProduct.status === 200) {
      setProducts(products.concat(nextProduct.data.data));
      setPage(page + 1);
    }
  }

  useEffect(() => {
    getProductList();
  }, []);

  // fetchMoreData = () => {
  //   if (products.length >= limit) {
  //     setHasMore(false)
  //     return;
  //   }else{
  //     this.getProductList();
  //   }
  // };

  function renderProduct(products) {
    return products.map((product, index) => (
      <Col key={index} span={6} style={colStyle}>
        <Product
          id={product.id}
          urlImage={product.urlImage}
          name={product.name}
          price={product.price}
        />
      </Col>
    ));
  };

  const { products, hasMore, limit = 0 } = this.state;

  const categoryTextResult = strings.formatString(
    strings.category_text_result,
    limit,
    "sepatu"
  );

  return (
    <React.Fragment>
      <p>{categoryTextResult}</p>
      <InfiniteScroll
        dataLength={products.length}
        next={()=>fetchMoreData()}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <div>
            <BackTop />
          </div>
        }
      >
        {renderProduct(products)}
      </InfiniteScroll>
    </React.Fragment>
  );
}

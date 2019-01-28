import React, { Component } from "react";
import serviceProduct from "../../api/services/ServiceProduct";
import Header from "components/Header/Header";
import { Row, Col } from "antd";
import Products from "components/Product/Products";
import Footer from "components/Footer/Footer";


class CategoryProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      keyword: "",
      isDataLoaded: false
    };
  }

  componentWillMount() {
    var products = [];
    serviceProduct
      .apiProductByCategory(this.props.match.params.categoryId)
      .then(response => {
        response.data.map(product => {
          const productDecode = JSON.parse(
            decodeURIComponent(product.homePageDetails)
          );
          productDecode.productId = product.productId;
          products.push(productDecode);
        });

        this.setState({
          products: products,
          isDataLoaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
          <Header keyword={this.state.keyword} />
          <Row>
            <Col md={24}>
              <div>
                <p>Pakaian</p>
                {/* <img
                  src={require("assets/img/gambar-detail-product.png")}
                /> */}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Products
                products={this.state.products}
                maxProductCount={100}
              />
              <p>
                <button>Load more...</button>
              </p>
            </Col>
          </Row>
        <Footer />
      </React.Fragment>
    );
  }
}

export default CategoryProduct;

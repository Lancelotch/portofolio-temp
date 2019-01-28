import React, { Component } from "react"
import ApiMainService from "../../api/ApiMainService";
import Axios from "axios";
import Header from "components/Header/Header";
import Products from "components/Product/Products";
import { Row, Col } from "antd";
import Footer from "../../components/Footer/Footer";
import ProductNotExist from "components/ProductNotExist/ProductNotExist";


class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      keyword: ""
    };
  }

  async componentWillMount() {
    this.setState({ isLoading: true });
    const params = new URLSearchParams(this.props.location.search);
    const keyword = params.get("q");
    this.setState({ keyword: keyword });

    var productsTemp = [];
    try {
      const res = await Axios.get(ApiMainService.productSearch + keyword);
      const resJson = res.data.data;
      resJson.map(data => {
        const dataDecode = JSON.parse(decodeURIComponent(data.homePageDetails));
        productsTemp.push(dataDecode);
      });
      var isProductAvailable = false;
      productsTemp.length < 1
        ? (isProductAvailable = false)
        : (isProductAvailable = true);
      this.setState({
        products: productsTemp,
        isProductAvailable: isProductAvailable
      });
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
        <div
          className={
            this.state.products.length < 1 ? "" : "container"
          }
        >
         <Header keyword={this.state.keyword} />
            <Row>
              <Col md={12} sm={12} lg={12} className="contentSearch">
                {this.state.isProductAvailable !== false ? (
                  <Products
                    products={this.state.products}
                    maxProductCount={100}
                  />
                ) : (
                  <ProductNotExist />
                )}
              </Col>
            </Row>
        {this.state.products.length > 0 && <Footer />}
        </div>
    );
  }
}

export default ProductSearch;

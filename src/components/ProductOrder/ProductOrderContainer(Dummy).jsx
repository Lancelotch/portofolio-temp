import React, { Component } from "react";
import shipping from "../../api/services/shipping";
import ProductOrder from ".";
import dummyProductOrder from "../../dummy/dummyProductOrder";

class ProductOrderContainer extends Component {
  constructor(props) {
    super(props);
    const res =  dummyProductOrder;
    this.state = {
       productorder:[],
       productName: res.data.productName
    };
  }

 componentDidMount() {
    this.productOrder();
    console.log("selected shipping", this.state)
  }


  productOrder = async () => {
    try {
      const res = await dummyProductOrder;
      const itemProductOrder = {
        productName: res.data.productName,  
        productorder: res.data
      };
      this.setState({
        ...itemProductOrder
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
       
        <div>
        <ProductOrder
        productorder={this.state.productorder}
        />
        </div>
    );
  }
}

export default ProductOrderContainer;

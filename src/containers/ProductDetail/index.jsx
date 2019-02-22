import React, { Component } from "react"
import Header from "../../components/Header"
import SliderProductDetail from "components/SliderSecondary"
import { Col, Row} from "antd"
import Variants from "../../components/Variant/Variants"
import "./style.sass"
import ButtonQuantity from "../../components/ButtonQuantity"
import dummyProductDetail from "../../api/dummyProductDetail"
import strings from "../../localization/localization"


class DummyProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      variants: [],
      variant: [],
      productId: "",
      productImages: [],
      productSalePrice: 0,
      productTitle: "",
      index: 0,
      price_changed: -1,
      size: 0,
      changed: 0,
      sku:[]
    };
  }

   componentDidMount() {
     this.productDetail();
  }

  productDetail = () => {
  const res = dummyProductDetail;
      const productDetail = {
        productId: res.data.productId,
        sku: res.data.sku,
        variants: res.data.variants,
        productTitle: res.data.name,
        details: res.data.details,
        size: 0 ,
        productImages: res.data.images,
        productSalePrice: res.data.price,
        productPrice: res.data.price,
        productDescriptions: res.data.description
      };
      this.setState({
       ...productDetail
  })
  console.log(this.state)
}


onChangeVariant = selected => {
  this.setState({
    changed: 0
  })
  if(selected.index===1){
    this.setState({
      productPrice: this.state.productSalePrice,
      size:0,
      changed: 0
     });
     for(let i=1;i<this.state.sku.length;i++){
     if(selected.value.id===this.state.sku[i].id){
       if(this.state.price_changed !==-1) { 
        this.setState({
          productPrice:this.state.sku[i].price,
          size: i     
        })
       }
     }   
   }
  } 
  else if(selected.index===0){
    this.setState({
      changed: 1,
      price_changed: 1,
     });
    for(let i=0;i<this.state.sku.length;i++){
      if(selected.value.id===this.state.sku[i].id){
         this.setState({
           productPrice:this.state.sku[i].price,
           size: i  
         })
      }
     else if(selected.value.id==i){ 
        this.setState({
          index:i
        })       
      }
    }
  }
};

  onChangeQuantity = qyt => {
    let quantity = this.state.quantity;
    quantity = qyt;
    if(this.state.sku[this.state.size].stock < quantity) {
      this.setState({
        stockAlert : "Current Stock: " + 
       this.state.sku[this.state.size].stock 
        + ". Please Reduce amount of Products."
      });
    }
    else {
      this.setState({
        stockAlert : ""
      });
    }
    this.setState({
      quantity: quantity
    });
  };

  
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={24}>
            <Header />
            <div className="container productDetail">
              <Row>
                <Col md={15}>
                  <h2>{this.state.productTitle}</h2>   
                  <SliderProductDetail
                    productImages={this.state.productImages}
                    index={this.state.index}
                  />
                </Col>
                <Col md={9}>
                    <p className="productDetail__price">{this.state.productPrice}</p>
                      {this.state.variants.map((variant,index) => {
                        return (
                          <Variants
                            key={variant.id}
                            index={index}
                            name={variant.name}
                            values={variant.values}
                            id={variant.id}
                            changed={this.state.changed}
                            onChangeVariant={this.onChangeVariant}
                          />
                        );
                      })}
                    <ButtonQuantity
                      title="Jumlah"
                      quantity={1}
                      onChange={this.onChangeQuantity}
                    />
                      <p className="productDetail__stock">
                        {this.state.stockAlert}
                      </p>
                      <button className="productDetail__addCart">
                        {strings.add_to_cart}
                      </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}


export default DummyProductDetail;

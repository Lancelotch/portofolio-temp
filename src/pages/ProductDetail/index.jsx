import React, { Component } from 'react';
// import SliderProductDetailContainer from '../../containers/SliderProductDetail';
import productDetail from "../../api/services/productDetail";
import SliderProductDetailContainer from '../../containers/SliderProductDetail';
import SkuContainer from '../../containers/Sku';
import dummyProductDetail from '../../dummy/dummyProductDetail';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            isProductAvailable: false,
            sliderIndex: 0,
        }
        this.data = {
            qty: 0,
            sku: {}
        };
    }

    componentDidMount() {
        this.getProductDetail();
    }

    actionUpdateSku = (sku) =>{   
        this.data.sku = sku;
        this.actionSubmitToCheckout();
    }

    actionSubmitToCheckout() {
        console.log(this.data);
    }

    getProductDetail = async () => {
        const productId = this.props.match.params.productId;
        try {
            const response = await productDetail.getProductDetail(productId);
            // const response = dummyProductDetail;
            const product = response.data
            this.setState({
                product: product,
                isProductAvailable: true
            });
        } catch(error) {
            console.log(error);
        }
    }
    
    render() {
        console.log(this.state.product);  
        var objek1 = {
            a : 1,
            s: 2
        }

        var objek2 = {...objek1};
        objek2.s = 3;

        console.log("objek1",objek1.s);
        console.log("objek2",objek2.s);
          
        return (
            <React.Fragment>
                {this.state.isProductAvailable &&
                    <React.Fragment>
                        {/* <SliderProductDetailContainer images={this.state.product.images} index={this.sliderIndex} /> */}
                        <SkuContainer product={this.state.product} actionUpdateSku={this.actionUpdateSku} />
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default ProductDetail;
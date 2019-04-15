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
            data : {
                qty: 0,
                sku: {}
            }
        }
    }

    componentDidMount() {
        this.getProductDetail();
    }
    

    // shouldComponentUpdate(nextProp, nextState){
    //     // if(nextState.data !== this.state.data){
    //     //     return false;
    //     // }else{
    //     //     return true;
    //     // }
    // }

    actionUpdateSku = (sku) =>{
        const data = {...this.state.data, sku};
        this.setState({data}, this.actionSubmitToCheckout);
        // this.actionSubmitToCheckout();
    }

    actionSubmitToCheckout = () => {
        console.log(this.state.data);
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
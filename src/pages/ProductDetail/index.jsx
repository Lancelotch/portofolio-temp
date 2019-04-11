import React, { Component } from 'react';
// import SliderProductDetailContainer from '../../containers/SliderProductDetail';
import productDetail from "../../api/services/productDetail";
import SliderProductDetailContainer from '../../containers/SliderProductDetail';
import VariantsContainer from '../../containers/Variants';
import Variant from "../../components/Variant"

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            sliderIndex: 0,
        }
    }
    componentDidMount() {
        this.getProductDetail();
    }

    actionSelectVariant = (variantId, valueId) =>{
        

        console.log("ini id variant", variantId)
        console.log("ini id value", valueId)
    }

    checkSmallestPrice = (product) => {
    }

    getProductDetail = async () => {
        const productId = this.props.match.params.productId;
        try {
            const response = await productDetail.getProductDetail(productId);
            console.log({product: response});
            const product = response.data
            this.checkSmallestPrice(product)
            this.setState({
                product: product
            });
        } catch(error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div>
                {/* {this.state.product.images &&
                    <SliderProductDetailContainer images={this.state.product.images} index={this.sliderIndex} />
                } */}
                {this.state.product.variants &&
                // <VariantsContainer variants={this.state.product.variants} />
                    this.state.product.variants.map((variant,index) => (
                        <Variant {...variant} index={index} onClick={this.actionSelectVariant}/>
                    ))
                }

            </div>
        );
    }
}

export default ProductDetail;
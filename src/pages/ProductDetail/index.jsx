import React, { Component } from 'react';
// import SliderProductDetailContainer from '../../containers/SliderProductDetail';
import productDetail from "../../api/services/productDetail";
import SliderProductDetailContainer from '../../containers/SliderProductDetail';
import VariantsContainer from '../../containers/Variants';
import Variant from "../../components/Variant"
import dummyProductDetail from '../../dummy/dummyProductDetail';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            isProductAvailable: false,
            sliderIndex: 0,
        }
    }

    componentDidMount() {
        this.getProductDetail();
    }

    actionSelectVariants = (variants) =>{        
        console.log(variants);
    }

    getProductDetail = async () => {
        const productId = this.props.match.params.productId;
        try {
            //const response = await productDetail.getProductDetail(productId);
            const response = dummyProductDetail;
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
        return (
            <div>
                {this.state.isProductAvailable &&
                    <React.Fragment>
                        {/* <SliderProductDetailContainer images={this.state.product.images} index={this.sliderIndex} /> */}
                        <VariantsContainer product={this.state.product} actionSelectVariants={this.actionSelectVariants} />
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default ProductDetail;
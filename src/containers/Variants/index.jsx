import React, { Component, Fragment } from 'react';
import Variant from '../../components/Variant';

class VariantsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    checkSmallestPrice = (product) =>{
         const listSku = product.sku;
         const smallestPrice = listSku.reduce(this.skuSmallestPrice, listSku[0]);
        //  console.log("pasti", smallestPrice);
         return smallestPrice;
    }

    skuSmallestPrice = (smallest, sku)=>{
        return (sku.price < smallest.price && sku.stock !== 0) ? sku : smallest
    }


    checkStock = (product) => {
        
    }

    componentDidMount(){
        this.checkSmallestPrice(this.props.product)
    }


    render() {
        const listSku = this.props.product.sku
        return (
            <Fragment>
                {this.props.product.variants.map((variant,index) => (
                    <Variant {...variant} key={variant.id} index={index} sku={listSku} onClick={this.props.actionSelectVariants} />
                ))}
            </Fragment>
        );
    }
}

export default VariantsContainer;
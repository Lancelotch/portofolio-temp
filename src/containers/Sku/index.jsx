import React, { Component, Fragment } from 'react';
import Variant from '../../components/Variant';

class SkuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sku: {
                price: 0,
                stock: 0,
                variants: []
            }
        }
    }
    
    componentDidMount(){
        this.getSkuSmallestPrice(this.props.product)
    }

    getSkuSmallestPrice = (product) =>{
         const listSku = product.sku;
         const skuSmallestPrice = listSku.reduce(this.compareSkuSmallestPrice, listSku[0]);
         this.initSku(skuSmallestPrice);
    }

    compareSkuSmallestPrice = (smallest, sku)=>{
        return (sku.price < smallest.price && sku.stock !== 0) ? sku : smallest
    }


    initSku(skuSmallestPrice) {
        const skuId = skuSmallestPrice.id;
        const lenPerVariant = 5;
        const manyVariants = skuId.length / lenPerVariant;

        let sku = {
            price: skuSmallestPrice.price,
            variants: [],
            stock: skuSmallestPrice.stock            
        };

        for(let curVariant = 0; curVariant < manyVariants; curVariant++) {
            const offset = curVariant * lenPerVariant;
            const limit = (curVariant+1) * lenPerVariant;
            const variantData = skuId.substring(offset, limit);
            const variantId = variantData.substring(0, 3);
            const valueId = variantData.substring(3, 5);
            const variantFromProduct = this.props.product.variants.find(variant => variant.id === variantId);
            console.log("variantFromProduct", variantFromProduct);
            
            const variantValueFromProduct = variantFromProduct.values.find(value => value.id === valueId);
            const variantName = variantFromProduct.name;
            const valueName = variantValueFromProduct.name;

            const variant = {
                variantId: variantId,
                // valueId: valueId,
                variantName: variantName,
                // valueName: valueName
                value: variantValueFromProduct
            }
            sku.variants.push(variant);
        }
        this.setState({
            sku: sku
        }, this.updateSku);
    }

    updateSku = () => {
        this.props.actionUpdateSku(this.state.sku);
        console.log("tes");
        
    }

    updateVariant = (variantId, value) => {
        let skuId = "";
        this.state.sku.variants.map(variant => {
            if(variantId === variant.variantId) {
                variant.value = value
            }
            skuId += variant.variantId + variant.value.id;            
        });

        this.props.product.sku.map(sku => {
            if(skuId === sku.id) {
                const skuTmp = {...this.state.sku};
                skuTmp.price = sku.price;
                skuTmp.stock = sku.stock;
                this.setState({
                    sku: skuTmp
                }, this.updateSku);
            }
        });
    }

    convertSkuId = (variantId, valueId) => {
        return variantId + valueId
    }

    render() {
        return (
            <Fragment>
                {this.props.product.variants.map((variant,index) => (
                    <Variant 
                    {...variant} 
                    key={variant.id} 
                    index={index} 
                    onClick={this.updateVariant} />
                ))}
            </Fragment>
        );
    }
}

export default SkuContainer;
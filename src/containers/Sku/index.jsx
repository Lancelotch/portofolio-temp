import React, { Component, Fragment } from 'react';
import Variant from '../../components/Variant';

class SkuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sku: {
                price: 0,
                stock: 0,
                variants: [],
                selected: [],
                check : false
                
            },
            arr : []
        }
    }

    componentDidMount() {
        this.getSkuSmallestPrice(this.props.product)
    }

    getSkuSmallestPrice = (product) => {
        const listSku = product.sku;
        const skuSmallestPrice = listSku.reduce(this.compareSkuSmallestPrice, listSku[0]);
        console.log("small",skuSmallestPrice)
        this.initSku(skuSmallestPrice);
    }

    compareSkuSmallestPrice = (smallest, sku) => {
        return (sku.price < smallest.price && sku.stock !== 0) ? sku : smallest
    }


    initSku(skuSmallestPrice) {
        const skuId = skuSmallestPrice.id;
        const lenPerVariant = 5;
        const manyVariants = skuId.length / lenPerVariant;

        let sku = {
            id: skuId,
            price: skuSmallestPrice.price,
            variants: [],
            stock: skuSmallestPrice.stock
        };

        for (let curVariant = 0; curVariant < manyVariants; curVariant++) {
            const offset = curVariant * lenPerVariant;
            const limit = (curVariant + 1) * lenPerVariant;
            const variantData = skuId.substring(offset, limit);
            const variantId = variantData.substring(0, 3);
            const valueId = variantData.substring(3, 5);
            const variantFromProduct = this.props.product.variants.find(variant => variant.id === variantId);
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
        // console.log("ini init sku", sku)
    }

    updateSku = () => {
        this.props.actionUpdateSku(this.state.sku);
        console.log("qqqqqq",this.state.sku);
    }

    updateVariant = (variantId, value, name) => {
        let skuId = "";
        let id = ""
        let arr = []
        this.state.sku.variants.map(variant => {
            if (variantId === variant.variantId) {
                variant.value = value
            }
            skuId += variant.variantId + variant.value.id;
            // console.log("ini id", skuId)
            id = variant.variantId + variant.value.id;
            arr.push(id)
        });
        console.log(arr)
        this.props.product.sku.map(sku => {
            if (skuId === sku.id) {
                const skuTmp = { ...this.state.sku };
                skuTmp.price = sku.price;
                skuTmp.stock = sku.stock;
                this.setState({
                    sku: skuTmp,
                    
                }, this.updateSku);
            }
        });
        // let check = {...this.state.selected, value}
        value.variantName = name
        this.setState({selected: arr,value
        })
        // this.setState({check})
        // console.log(this.state.arr)
    }

    updateSize = (variantId, value) => {
        let skuId = "";
        this.state.sku.variants.map(variant => {
            if (variantId === variant.variantId) {
                variant.value = value
            }
            skuId += variant.variantId + variant.value.id;
        });

        this.props.product.sku.map(sku => {
            if (skuId === sku.id) {
                const skuTmp = { ...this.state.sku };
                skuTmp.price = sku.price;
                skuTmp.stock = sku.stock;
                this.setState({
                    sku: skuTmp,
                    
                }, this.updateSku);
            }
        });
        this.setState({selectedSize: value})
    } 

    convertSkuId = (variantId, valueId) => {
        return variantId + valueId
    }

    render() {
        // console.log("xxxx",this.props.product.variants)
        return (
            <Fragment>
                {this.props.product.variants.map((variant, index) => (
                    <Variant
                        {...variant}
                        sku={this.state.sku}
                        key={variant.id}
                        selected={this.state.selected}
                        selectedText={this.state.selectedText} 
                        index={index}
                        onClick={this.updateVariant} 
                        // onClickSize={this.updateSize}  
                        />
                       
                ))}
            </Fragment>
        );
    }
}

export default SkuContainer;
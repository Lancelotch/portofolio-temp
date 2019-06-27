import React, { Component } from 'react';
import Variant from '../../components/Variant';

class Variants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variants: [],
            selected: [],
            arr: [],
            name: ""
        }
    }

    updateVariant = (variantId,value,name) => {
        let id = ""
        let arr = []
        this.state.variants.forEach(variant => {
            if (variantId === variant.variantId) {
                variant.value = value
            }
   
            id = variant.variantId + variant.value.id;
            arr.push(id)
        
        });
        this.setState({
            selected:arr
        })
    }


    render() {
        console.log(this.props.product.variants);

        return (
            <React.Fragment>
            {this.props.product.variants.map((variant, index) => (
                <Variant
                    {...variant}             
                    key={variant.id}
                    selected={this.state.selected.id === variant.id ? true : false}
                    index={index}
                    onClick={this.updateVariant}  
                    />
            ))}
            </React.Fragment>
        );
    }
}

export default Variants;
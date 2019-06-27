import React, { Component } from 'react';
import Variant from '../../components/Variant';

class Variants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            variantSelected:[]
        }
    }

    onChangeVariant = (selected) => {
        console.log(selected)    
        this.setState({
            variantSelected: selected
        })

    }


    render() {
        return (
            <React.Fragment>
                {this.props.product.variants.map((variant, index) => (
                    <Variant
                        {...variant}
                        key={variant.id}
                        selected={this.state.variantSelected.id === variant.id ? true : false}
                        index={index}
                        onClick={this.onChangeVariant}
                    />
                ))}
            </React.Fragment>
        );
    }
}

export default Variants;
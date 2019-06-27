import React, { Component } from 'react';
import Variant from '../../components/Variant';

class Variants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            arr:[]
        }
    }

    updateVariant = (valueId,value,name) => {
        let arr = []
        console.log(value);
        console.log(valueId);
        console.log(name);
        
        arr.push(value)
        this.setState({ 
            selected: arr 
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.product.variants.map((variant, index) => (
                    <Variant
                        {...variant}
                        key={variant.id}
                        selected={this.state.selected}
                        index={index}
                        onClick={this.updateVariant}
                    />
                ))}
            </React.Fragment>
        );
    }
}

export default Variants;
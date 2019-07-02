import React, { Component } from 'react';
import Variant from '../../components/Variant';

class Variants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        }
    }

    updateSku = () => {
        this.props.actionUpdateSku(this.state.selected);
    }

    updateVariant = (valueId, value, name, variantTypeIsImage = false) => {
        if (variantTypeIsImage) {
            this.props.actionUpdateImageVariant(value.image);
        }
        let arr = this.state.selected
        let newVariant = {
            id: valueId,
            name,
            variantItem: value
        }
        if (!arr.length > 0) {
            arr.push(newVariant)
        } else {
            let newArr = arr.map((variant) => {
                if (variant.name === name) {
                    return newVariant
                }
                return variant
            })
            let isOldVariants = newArr.filter(e => { return e.name === name }).length > 0
            if (!isOldVariants) {
                newArr.push(newVariant)
            }
            arr = newArr
        }
        this.setState({
            selected: arr
        },this.updateSku)
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

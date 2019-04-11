import React, { Component, Fragment } from 'react';
import Variant from '../../components/Variant';

class VariantsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variants: [{}]
        }
    }

    render() {
        return (
            <Fragment>
                {this.props.variants.map((variant,index) => (
                    <Variant {...variant} index={index}/>
                ))}
            </Fragment>
        );
    }
}

export default VariantsContainer;
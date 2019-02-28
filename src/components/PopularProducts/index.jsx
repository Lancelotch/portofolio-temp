import React, { Component } from 'react';
import PopularProduct from '../PopularProduct'
import {Col} from 'antd'

class PopularProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const {products, maxNumber} = this.props 
        let counter = 0

        return ( 
            <React.Fragment>
                {products.map((product, index) => {
                    if(maxNumber && counter < maxNumber) {
                        if(maxNumber !== null) {
                            counter +=1
                        }
                        return(
                            <Col md={4} style={{margin:'41px'}}>
                                <PopularProduct 
                                     key={product.id}
                                     product={product}
                                />
                            </Col>
                        )
                    }
                    if(!maxNumber) {
                        return(
                            <Col>
                            <PopularProduct 
                                key={product.id}
                                product={product} 
                            />        
                            </Col>
                        )    
                    }
                })}    
            </React.Fragment>
         );
    }
}
 
export default PopularProducts;
import React, { Component } from 'react';
import {Col} from 'antd'
import BestSeller from '../BestSeller'

class BestSellers extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {products, maxNumber} = this.props 
        let counter = 0
        return ( <React.Fragment>
                {products.map((product, index) => {
                    if(maxNumber && counter < maxNumber) {
                        if(maxNumber !== null) {
                            counter +=1
                        }
                        return(
                            <Col md={4} style={{marginTop:'70px', marginRight:'70px'}}>
                                <BestSeller 
                                     key={product.id}
                                     product={product}
                                />
                            </Col>
                        )
                    }
                    if(!maxNumber) {
                        return(
                            <Col>
                            <BestSeller
                                key={product.id}
                                product={product} 
                            />        
                            </Col>
                        )    
                    }
                })}    

        </React.Fragment> );
    }
}
 
export default BestSellers;
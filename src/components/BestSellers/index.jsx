import React from 'react'
import {Col} from 'antd'
import BestSeller from '../BestSeller'

class BestSellers extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const {data, maxNumber} = this.props 
        let counter = 0
        return ( <React.Fragment>
                {data.map((product, i) => {
                    if(maxNumber && counter < maxNumber) {
                        if(maxNumber !== null) {
                            counter +=1
                        }
                        return(
                            <Col md={4} style={{marginTop:'70px', marginRight:'70px'}} key={i}>
                                <BestSeller 
                                     key={product.id}
                                     product={product}
                                />
                            </Col>
                        )
                    }
                    if(!maxNumber) {
                        return(
                            <Col key={i}>
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

export default BestSellers
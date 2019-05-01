import React from 'react'
import {Col} from 'antd'
import BestSeller from '../BestSeller'

class BestSellers extends React.Component {
    // constructor(props){
    //     super(props)
    // }

    render(){
        const {data} = this.props 
        // let counter = 0
        return ( <React.Fragment>
                {data.map((product, i) => {
                    return(
                        <Col md={4} style={{marginTop:'70px', marginRight:'70px'}} key={i}>
                            <BestSeller 
                                 key={product.id}
                                 product={product}
                            />
                        </Col>
                    )
                })}    

        </React.Fragment> );
        
    }
}

export default BestSellers
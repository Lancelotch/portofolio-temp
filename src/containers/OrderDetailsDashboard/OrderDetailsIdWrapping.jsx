import React, { Component } from 'react';
import OrderDetailsDashboard from '.';

class OrderDetailsIdWrapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
          orderProduct:this.props.orderProduct
        };
      }
    render() {
        return (
            <div>
            {this.state.orderProduct && 
                <React.Fragment>
                {this.state.orderProduct.map(order => {
                    return (
                        <OrderDetailsDashboard orderId={order.OrderId}/>  
                    );

                })}
                </React.Fragment>
            }
            </div>
        );
    }
}

export default OrderDetailsIdWrapping;
import React, { Component } from 'react';
import HomePageContainer from '../../containers/Home'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            benefit: [],
            popularProduct: [],
            bestSellerProduct: [],
            mostClickProduct: []
         }
    }
    render() {
        const {match} = this.props
        return ( 
            <React.Fragment>
                <HomePageContainer
                    match={match}
                />
            </React.Fragment>
         );
    }
}
 
export default HomePage;
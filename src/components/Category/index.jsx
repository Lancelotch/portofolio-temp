import React, { Component } from 'react';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const {id, name} = this.props 
        return ( 
            <div>
                {name}
            </div>
         );
    }
}
 
export default Category;
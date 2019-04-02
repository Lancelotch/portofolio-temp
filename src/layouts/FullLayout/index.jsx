import React, { Component } from 'react'
import "./style.sass";

class FullLayout extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default FullLayout;
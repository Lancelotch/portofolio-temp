import React, { Component } from 'react'
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount"

class FullLayout extends Component {
    render() {
        return (
            <div>
                <ScrollToTopOnMount />
                {this.props.children}
            </div>
        )
    }
}

export default FullLayout;
import React, { Component } from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import "./style.sass";

class MainLayout extends Component {
    render() {
        return (
            <div>
                <Header match={this.props} />
                    {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default MainLayout;
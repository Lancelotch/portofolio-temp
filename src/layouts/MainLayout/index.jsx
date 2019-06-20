import React, { Component } from 'react'
import Header from 'containers/Header'
import Footer from 'components/Footer'
import "./style.sass";

class MainLayout extends Component {
    render() {
        return (
            <div>
                <Header match={this.props} />
                    <div className="container">
                        {this.props.children}
                    </div>
                <Footer />
            </div>
        )
    }
}

export default MainLayout;
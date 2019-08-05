import React, { Component } from 'react'
import Header from 'containers/Header'
import Footer from 'components/Footer'
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount"

class MainLayout extends Component {
    render() {
        return (
            <div>
                <Header match={this.props} />
                <ScrollToTopOnMount />
                <div className="container">
                {console.log(this.props)}
                
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}

export default MainLayout;
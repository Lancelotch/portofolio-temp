import React from 'react'
import Header from 'containers/Header'
import Footer from 'components/Footer'
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount"

export default function MainLayout (props) {
        return (
            <div>
                <Header match={props} />
                <ScrollToTopOnMount />
                <div className="container">
                    {props.children}
                </div>
                <Footer />
            </div>
        )
}

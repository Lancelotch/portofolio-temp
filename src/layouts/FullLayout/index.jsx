import React from 'react'
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount"

export default function FullLayout () {
        return (
            <div>
                <ScrollToTopOnMount />
                {this.props.children}
            </div>
        )
}


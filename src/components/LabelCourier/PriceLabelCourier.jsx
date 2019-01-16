import React, { Component } from 'react'
import "./style.sass"

class PriceLabelCourier extends Component {
    render() {
        return (
            <div className="priceLabelCorier"
                style=
                {{
                    marginTop: "1em",
                    marginBottom: "1em",
                    padding: "0px 10px",
                }}>
                <p>STANDAR PENGIRIMAN</p>
                <span>Dikirim dari luar negeri dengan estimasi 7 - 14 hari</span>
            </div>

        );
    }
}

export default PriceLabelCourier;
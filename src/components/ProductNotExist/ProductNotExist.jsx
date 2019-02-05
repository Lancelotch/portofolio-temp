import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Col, Button } from 'antd';

var buttonCartPesan = {
    border: "1px solid #ACACBA",
    borderRadius: "6px",
    backgroundColor: "#d71149",
    margin: "0 auto",
    display: "block",
    textTransform: "unset",
    marginBottom: "30px"
};

class ProductNotExist extends Component {
    render() {
        return (
            <div style={{ width: "100%" }}>
                <Col md={12}>
                    <img src={require("assets/img/monggopesen_search-icon.png")}
                        className="img-responsive"
                        style={{
                            margin: " 0 auto"
                        }} 
                        alt=""
                        />
                </Col>
                <Col md={12}>
                    <h2 style={{
                        textAlign: "center",
                        fontWeight: "bold"
                    }}>
                        Oops, produk tidak ditemukan :(
                    </h2>
                    <Link to="/">
                        <Button style={buttonCartPesan}>
                            <p style={{
                                color: "#FFFFFF",
                                marginTop: "0px",
                                marginBottom: "0px"
                            }}>
                                Ayo Mulai Belanja
                        </p>
                        </Button>
                    </Link>
                </Col>
                <Footer />
            </div>
        );
    }
}

export default ProductNotExist;
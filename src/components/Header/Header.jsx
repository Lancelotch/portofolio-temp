import React, { Component } from 'react';
import { Row, Col, Button, Icon, Menu } from 'antd';
import Search from 'antd/lib/input/Search';
import Login from "../../components/Login/Login";
import { Link, NavLink } from "react-router-dom";
import { List } from 'antd';
import "./style.sass";
import "sass/style.sass";
import serviceCategory from "../../api/services/ServiceCategory";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            openModalLogin: false,
            categoryFeature: [],
            isDataCategoryFeatureLoaded: false
        };
    }

    componentWillMount() {
        this.getCategoryFeature();

    }

    openModalLogin = () => {
        const openModalLogin = this.state.openModalLogin;
        this.setState({
            openModalLogin: !openModalLogin
        });
    };


    getCategoryFeature = () => {
        serviceCategory
            .CategoryFeature()
            .then(response => {
                const categoryFeature = response.data;
                this.setState({
                    categoryFeature: categoryFeature,
                    isDataCategoryFeatureLoaded: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    };


    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <Row gutter={40}>
                        <Col md={6} >
                            <NavLink tag={Link} to="/">
                                <img
                                    src={require("assets/img/monggopesen_logo.png")}
                                    className="img-navbar"
                                />
                            </NavLink>
                        </Col>
                        <Col md={8}>
                            <Search
                                size="large"
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                            />
                        </Col>
                        <Col md={10}>
                            <div style=
                                {{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}>
                                <Icon type="shopping-cart" style=
                                    {{
                                        marginRight: "22px",
                                        fontSize: "35px",
                                        color: "#ffa122"
                                    }}
                                />
                                {this.props.isAuthenticated !== true ? (
                                    <React.Fragment>
                                        <Button type="primary" onClick={this.openModalLogin}>
                                            Login
                                        </Button>
                                        <Login
                                            visible={this.state.openModalLogin}
                                            onCancel={this.openModalLogin}
                                        />
                                    </React.Fragment>
                                ) : (
                                        <React.Fragment>
                                            <Button type="primary" onClick={this.openModalLogin}>
                                                Profil
                                    </Button>
                                        </React.Fragment>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="container-fluid">
                    <Row>
                        <hr className="line-navigation" />
                        <Col md={12}>
                            <div className="container">
                                {this.state.isDataCategoryFeatureLoaded !== false &&
                                    this.state.categoryFeature[0].subCategory[1].childSubCategory.map(
                                        (category, index) => {
                                            if (index <= 5) {
                                                var link = "/category-product/" + category.id;
                                                return (
                                                    <NavLink key={category.id} to={link}>
                                                        <p> {category.name}</p>
                                                    </NavLink>
                                                );
                                            }
                                        }
                                    )}


                            </div>
                        </Col>
                    </Row>
                    <hr className="line-navigation" />
                </div>
            </React.Fragment>
        );
    }
}

export default Header;
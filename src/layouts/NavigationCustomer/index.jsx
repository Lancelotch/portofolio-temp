import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from 'containers/Header'
import Footer from 'components/Footer'
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';

const { Content, Sider } = Layout;

class NavigationCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: []
        }
    }
    actionChangePage = page => {
        this.setState({ page });
    };


    childrenWithProps = React.cloneElement(this.props.children, {
        actionChangePage: this.actionChangePage
    });

    render() {
        return (
            <Layout>
                <div className="mp-customer-layout">
                    <Header match={this.props} />
                    <ScrollToTopOnMount />
                    <div className="container mp-customer-layout__wrapper">
                        <Layout>
                            <Sider className="mp-customer-layout__children">
                                {this.childrenWithProps}
                            </Sider>
                            <Layout className="mp-customer-layout__content">
                                <Content>
                                    {this.state.page}
                                </Content>
                            </Layout>
                        </Layout>
                    </div>
                    <Footer />
                </div>
            </Layout>
        );
    }
}

export default NavigationCustomer;
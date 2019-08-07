import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from 'containers/Header'
import Footer from 'components/Footer'
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';

const { Content, Sider } = Layout;

class SidebarNavigationCustomer extends Component {
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
                <div className="customerLayout">
                    <Header match={this.props} />
                    <ScrollToTopOnMount />
                    <div className="container">
                        <Layout>
                            <Sider>
                                {this.childrenWithProps}
                            </Sider>
                            <Layout style={{ marginTop: 25,marginLeft:40 }}>
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

export default SidebarNavigationCustomer;
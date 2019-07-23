import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from 'containers/Header'
import Footer from 'components/Footer'

const { Content, Sider } = Layout;

class SidebarNavigationCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: []
        }
    }
    render() {
        const actionChangePage = page => {
            this.setState({ page });
        };

        console.log(this.state.page);


        const childrenWithProps = React.cloneElement(this.props.children, {
            actionChangePage: actionChangePage
        });
        return (
            <Layout>
                <div className="customerLayout">
                    <Header match={this.props} />
                    <div className="container">
                        <Layout>
                            <Sider>
                                {childrenWithProps}
                            </Sider>
                            <Layout>
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
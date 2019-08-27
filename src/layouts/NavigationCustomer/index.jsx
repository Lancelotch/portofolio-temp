import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from 'containers/Header'
import Footer from 'components/Footer'
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';

const { Content, Sider } = Layout;

export default function NavigationCustomer (props) {
    const [page, setPage] = useState([]);

   function actionChangePage(page){
        setPage(page);
    };


   const childrenWithProps = React.cloneElement(props.children, {
        actionChangePage: actionChangePage
    });

        return (
            <Layout>
                <div className="mp-customer-layout">
                    <Header match={props} />
                    <ScrollToTopOnMount />
                    <div className="container mp-customer-layout__wrapper">
                        <Layout>
                            <Sider className="mp-customer-layout__children">
                                {childrenWithProps}
                            </Sider>
                            <Layout className="mp-customer-layout__content">
                                <Content>
                                    {page}
                                </Content>
                            </Layout>
                        </Layout>
                    </div>
                    <Footer />
                </div>
            </Layout>
        );
}


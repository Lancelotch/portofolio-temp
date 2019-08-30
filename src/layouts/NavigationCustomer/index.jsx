import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Header from 'containers/Header'
import Footer from 'containers/Footer'
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import { useRootContext } from "../../hoc/RootContext";

const { Content, Sider } = Layout;

export default function NavigationCustomer (props) {
    const {isAuthenticated, history} = useRootContext();

    useEffect(() => {
      if(props.needAuthenticated && !isAuthenticated){
        history.push('/login');
      }      
    })
  
    if(props.needAuthenticated && !isAuthenticated){
      return null;
    } else {  
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
}


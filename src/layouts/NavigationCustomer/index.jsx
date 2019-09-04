import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Header from 'containers/Header'
import Footer from 'containers/Footer'
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import { useRootContext } from "../../hoc/RootContext";
import { Icon, Menu } from "antd";
import strings from "../../localization/localization";
import ProfileMain from "../../containers/ProfileMain";
import PATH_URL from '../../routers/path'

const { SubMenu } = Menu;

const { Content, Sider } = Layout;

export default function NavigationCustomer (props) {
    const {isAuthenticated, history} = useRootContext();
    const [activeTab, setActiveTab] = useState('')

    useEffect(() => {
      if(props.needAuthenticated && !isAuthenticated){
        history.push('/login');
      }      
    },[])

    useEffect(() => {
        getTabActive()
    },[])

    function getTabActive () {
        const routeTab = props.children.props.location.pathname
        const splitRoute = routeTab.split('/')
        const tabActive = splitRoute[splitRoute.length -1]
        setActiveTab(tabActive)
    }

    if(props.needAuthenticated && !isAuthenticated){
      return null;
    } else {    
        return (
            <Layout>
                <div className="mp-customer-layout">
                    <Header match={props} />
                    <ScrollToTopOnMount />
                    <div className="container mp-customer-layout__wrapper">
                        <Layout>
                            <Sider className="mp-customer-layout__children">
                                <div className="mp-dashboard-user">
                                    <ProfileMain />
                                    <Menu
                                        mode="inline"
                                        defaultOpenKeys={['profile']}
                                        selectedKeys={[activeTab]}
                                    >
                                    <SubMenu
                                        className="mp-dashboard-user__title"
                                        key={'profile'}
                                        title={
                                            <span>
                                                <Icon type="user" style={{ fontSize: 19 }} />
                                                {strings.my_account}
                                            </span>
                                            }
                                    >
                                        <Menu.Item key="profile" onClick={() => history.push(PATH_URL.DASHBOARD_PROFILE)}  >{strings.profile}</Menu.Item>
                                        <Menu.Item key="address" onClick={() => history.push(PATH_URL.DASHBOARD_ADDRESS) } >{strings.change_address}</Menu.Item>
                                        <Menu.Item key="password" onClick={() => history.push(PATH_URL.DASHBOARD_PASSWORD) } >{strings.password}</Menu.Item>
                                    </SubMenu>
                                        <Menu.Item key="order" onClick={() => history.push(PATH_URL.DASHBOARD_ORDER) } className="mp-dashboard-user__title" ><Icon type="rocket" className="iconRocket" />Pesanan Saya</Menu.Item>
                                    </Menu>
                                </div>
                            </Sider>
                            <Layout className="mp-customer-layout__content">
                                <Content>
                                    {props.children}
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


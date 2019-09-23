import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Header from 'containers/Header'
import Footer from 'containers/Footer'
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import { useRootContext } from "../../hoc/RootContext";
import { Menu } from "antd";
import PATH_URL from '../../routers/path'
import "./style.sass"

const { Content, Sider } = Layout;

export default function UserGuideLayout(props) {
    const { history } = useRootContext();
    const [activeTab, setActiveTab] = useState('')

    useEffect(() => {
        getTabActive()
    }, [])

    function getTabActive() {
        const routeTab = window.location.pathname
        const splitRoute = routeTab.split('/')
        const tabActive = splitRoute[splitRoute.length - 1]
        setActiveTab(tabActive)
    }

    const menuUserGuide = [
        {
            key: "cara-belanja",
            link: PATH_URL.USER_GUIDE_HOW_TO_SHOP,
            userGuide: "Cara Belanja"
        },
        {
            key: "lama-pengiriman",
            link: PATH_URL.USER_GUIDE_DELIVERY_TIME,
            userGuide: "Lama Pengiriman"
        },
        {
            key: "cara-bayar",
            link: PATH_URL.USER_GUIDE_HOW_TO_PAY,
            userGuide: "Cara Bayar"
        },
        {
            key: "lacak-pengiriman",
            link: PATH_URL.USER_GUIDE_TRACK_SHIPMENT,
            userGuide: "Lacak Pengiriman"
        },
        {
            key: "kontak-kami",
            link: PATH_URL.USER_GUIDE_CONTACT_US,
            userGuide: "Kontak Kami"
        },
        {
            key: "tentang-kami",
            link: PATH_URL.USER_GUIDE_ABOUT_US,
            userGuide: "Tentang Kami"
        },
        {
            key: "karir",
            link: PATH_URL.USER_GUIDE_CAREER,
            userGuide: "Karir"
        },
        {
            key: "syarat-ketentuan",
            link: PATH_URL.USER_GUIDE_TERMS_CONDITION,
            userGuide: "Syarat dan Ketentuan"
        },
        {
            key: "kebijakan-privasi",
            link: PATH_URL.USER_GUIDE_PRIVACY_POLICY,
            userGuide: "Kebijakan Privasi"
        }
    ]

    return (
        <Layout>
            <div className="mp-user-guide-layout">
                <Header match={props} />
                <ScrollToTopOnMount />
                <div className="container mp-user-guide-layout__wrapper">
                    <Layout>
                        <Sider className="mp-user-guide-layout__children">
                            <div className="mp-dashboard-user-guide-layout">
                                <Menu
                                    mode="inline"
                                    defaultOpenKeys={['cara-belanja']}
                                    selectedKeys={[activeTab]}>
                                    {menuUserGuide.map(user => {
                                        return (
                                            <Menu.Item key={user.key}
                                                onClick={() => history.push(user.link)}>
                                                {user.userGuide}
                                            </Menu.Item>)
                                    })}
                                </Menu>
                            </div>
                        </Sider>
                        <Layout className="mp-user-guide-layout__content">
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


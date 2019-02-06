import React, { Component } from 'react'
import '../../sass/style.sass'
import { Breadcrumb, Col, Row, Tabs, Button } from 'antd'
import DashboardButton from '../Button/DashboardButton/DashboardButton'
import FormDasboard from '../DashboardFormCustomer/FormDashboard/FormDashboard'
import AddrressDashboard from '../DashboardFormCustomer/AddressDashboard.jsx/AddressDashboard'
import AddressDashboard from '../DashboardFormCustomer/AddressDashboard.jsx/AddressDashboard'
import InvoiceCustomers from '../DashboardFormCustomer/InvoiceCustomers/InvoiceCustomers'
import Header from '../Header/Header'
import SidebarProfile from '../DashboardFormCustomer/InvoiceCustomerDetail/InvoiceCustomerDetail'

const TabPane = Tabs.TabPane

class SidebarCustomer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 'left',
      Invoices: [],
      isLogout: false,
      isShowInvoiceDetail: false
    }
  }

  showInvoiceDetail = () => {
    const { isShowInvoiceDetail } = this.state
    this.setState({
      isShowInvoiceDetail: !isShowInvoiceDetail
    })
  }

  invoiceDetailById = id => {
    this.showInvoiceDetail()
    this.setState({
      invoiceId: id
    })
  }

  handleModeChange = e => {
    const mode = e.target.value
    this.setState({ mode })
  }

  render () {
    const { mode } = this.state
    return (
        <Row style={{ marginTop: "18rem" }}>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href=''>Monggo Pesen</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href=''>Transaksi</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Detail Transaksi</Breadcrumb.Item>
            </Breadcrumb>
            <b>Dashboard</b>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Tabs
              defaultActiveKey='1'
              tabPosition={mode}
              style={{ height: 400 }}
            >
              <TabPane
                style={{ margin: '0' }}
                tab={<DashboardButton ButtonName='Account' />}
                key='1'
              >
                <FormDasboard />
              </TabPane>
              <TabPane key='2' tab={<DashboardButton ButtonName='Adress' />}>
                <AddressDashboard />
              </TabPane>
              <TabPane key='3' tab={ <DashboardButton ButtonName='Invoice'/>}>
                
                  <InvoiceCustomers/>
          
              </TabPane>
              <TabPane key='4' tab={<DashboardButton ButtonName='Logout' />}>
                Content of tab 4
              </TabPane>
            </Tabs>
          </Col>
        </Row>
    );
  }
}

export default SidebarCustomer

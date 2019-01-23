import React, { Component } from 'react'
import SidebarCustomer from '../../components/SidebarCustomer/SidebarCustomer'
import { Row, Col } from 'antd'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import '../../sass/style.sass'

class DashboardCustomer extends Component {
  render () {
    // let activeTab =
    //   this.props.match.params.tab == undefined
    //     ? 1
    //     : this.props.match.params.tab;

    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <Header />
            <div style={{ marginTop: '120px' }} className='container'>
              <SidebarCustomer />
            </div>
          </Col>
        </Row>
        <Footer />
      </React.Fragment>
    )
  }
}

export default DashboardCustomer

import React, { Component } from 'react'
import { Row, Col, Icon, Menu, Dropdown, Button, Avatar } from 'antd'
import Search from 'antd/lib/input/Search'
import Login from 'components/Login'
import TopHeader from 'components/TopHeader'
import Categories from 'components/Categories'
import { connect } from 'react-redux'
import strings from '../../localization/localization'
import './style.sass'
import 'sass/style.sass'
import { logout } from '../../store/actions/authentication'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      openModalLogin: false,
      isDataCategoryFeatureLoaded: false,
      sumProduct: 0,
      keyword: this.props.keyword
    }
  }

  openModalLogin = () => {
    const openModalLogin = this.state.openModalLogin
    this.setState({
      openModalLogin: !openModalLogin
    })
  }

  handleInputSearchChange = e => {
    this.setState({
      keyword: e.target.value
    })
  }

  handleLogout = () => {
    this.props.logout()
  }

  render () {
    const greeting = (
      <div className='header__greeting'>
        {isAuthenticated !== true ? (
          <h3>{strings.header_greeting}!</h3>
        ) : (
          <h3>{strings.header_greeting_auth}</h3>
        )}
      </div>
    )

    const LoginMenu = (
      <React.Fragment>
        {this.props.isAuthenticated !== true ? (
          <React.Fragment>
            <h4
              onClick={this.openModalLogin}
            >
              {strings.log_in}
            </h4>
            <Login
              visible={this.state.openModalLogin}
              onCancel={this.openModalLogin}
            />
          </React.Fragment>
        ) : (
          <React.Fragment><h4>{name}</h4></React.Fragment>
        )}
      </React.Fragment>
    )

    const userMenu = (
      <Menu className='header__user-menu'>
        <Menu.Item key='0'>
          <a> {strings.header_my_order}</a>
        </Menu.Item>
        <Menu.Item key='0'>
          <a> {strings.header_check_order}</a>
        </Menu.Item>
        {isAuthenticated !== true ? (
          <Menu.Item key='1' disabled>
            {' '}
            <Button
              disabled
              className='header__user-menu__button'
            >
              {strings.log_out}
            </Button>
          </Menu.Item>
        ) : (
          <Menu.Item key='2'>
            <a onClick={this.handleLogout} style={{ color: 'red' }}>
              <Button className='header__user-menu__button'> {strings.log_out} </Button>{' '}
            </a>
          </Menu.Item>
        )}
      </Menu>
    )
    
    const {keyword, name} = this.state
    const { isAuthenticated } = this.props

    return (
      <div>
        <Row>
          <Col md={24}>
            <div className='topHeader'>
              <TopHeader />
            </div>
          </Col>
          <div className='header'>
            <Col md={5}>
              <a href='/'>
                <img
                  src={require('assets/img/monggopesen_logo.png')}
                  className='header__logo'
                />
              </a>
            </Col>
            <Col md={13} className='header__search-box'>
              <form action='/search'>
                <Search
                  placeholder={strings.search_place_holder}
                  id='filter'
                  name='q'
                  value={keyword}
                  onChange={this.handleInputSearchChange.bind(this)}
                  className='header__search'
                />
              </form>
            </Col>
            <Col md={6}>
              <img
                src={require('assets/img/icon_header.png')}
                alt='header_icon'
                className='header__icon'
              />
            </Col>
            <Col md={18}>
              <div className='header__categories'>
                <Categories />
              </div>
            </Col>
            <Col md={4}>
              <React.Fragment>{greeting}</React.Fragment>
            </Col>
            <Col md={2}>
              <div className='header__user-box'>
                <Icon
                  type='user'
                  onClick={this.openModalLogin}
                  className='header__user-icon'
                />
                <React.Fragment>{LoginMenu}</React.Fragment>
                <Dropdown
                  overlay={userMenu}
                  trigger={['click']}
                >
                  <a className='ant-dropdown-link' href='#'>
                    <Icon
                      className='header__arrow'
                      type='down'
                    />
                  </a>
                </Dropdown>
              </div>
            </Col>
          </div>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
})

export default connect(
  mapStateToProps,
  { logout }
)(Header)

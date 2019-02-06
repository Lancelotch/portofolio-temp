import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'

class Facebook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: ''
    }
  }
  render () {
    let fbContent
    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: '400px',
            margin: 'auto',
            background: '#f4f4f4',
            padding: '20px'
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>
      )
    } else {
      fbContent = (
        <FacebookLogin
          appId='189486938370592'
          autoLoad
          fields='name,email,picture'
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      )
    }

    return <div> {fbContent} </div>
  }
}

export default Facebook

import React,{Component} from 'react'
import {OldSocialLogin as SocialLogin} from 'react-social-login'
import { GoogleLoginButton as GoogleButton} from "react-social-login-buttons";
const REACT_APP_GOOGLE_APP_ID = process.env.REACT_APP_GOOGLE_APP_ID

class ButtonGoogle extends Component{
  handleSocialResponse = (user, err) => {
    if(user) {
      const token = user._token.idToken;
      const request = {
        token : token
      }
      this.props.onSubmit(request);
    }
  }

  render(){
    const {onSubmit} = this.props
    return(
      <div className={`${this.props.className}`}>
        <SocialLogin
          provider='google'
          appId={REACT_APP_GOOGLE_APP_ID}
          callback={this.handleSocialResponse}
        >
          <GoogleButton onClick={onSubmit} style={{margin:"0 8px 0 0"}} size={"48px"} align={"center"}>
            {this.props.children}
          </GoogleButton>
        </SocialLogin>
      </div>
    )
  }
}

export default ButtonGoogle;
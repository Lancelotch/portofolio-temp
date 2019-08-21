import React,{Component} from 'react'
import {OldSocialLogin as SocialLogin} from 'react-social-login'
import { FacebookLoginButton as FacebookButton} from "react-social-login-buttons";
const REACT_APP_FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;

class ButtonFacebook extends Component{
  handleSocialResponse = (user, err) => {
    const profile = user._profile;
    //const provider = user._provider;
    const token = user._token.accessToken
    const request = {
      token : token,
      id: profile.id
    }
    this.props.onSubmit(request);
  }

  render(){
    return(
      <div className={`${this.props.className}`}>
        <SocialLogin
        provider='facebook'
        appId={REACT_APP_FACEBOOK_APP_ID}
        callback={this.handleSocialResponse}
        >
          <FacebookButton style={{margin:"0 0 0 8px"}} size={"48px"} align={"center"}>
            {this.props.children}
          </FacebookButton>
        </SocialLogin>
      </div>
    )
  }
}

export default ButtonFacebook;
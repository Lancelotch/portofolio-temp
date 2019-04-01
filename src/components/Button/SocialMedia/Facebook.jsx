import React,{Component} from 'react'
import {OldSocialLogin as SocialLogin} from 'react-social-login'
import { FacebookLoginButton as FacebookButton} from "react-social-login-buttons";

class ButtonFacebook extends Component{
  handleSocialResponse = (user, err) => {
    console.log({facebook : user});

    const profile = user._profile;
    // const token = user._token;
    const provider = user._provider;
    const request = {
      email: profile.email,
      name: profile.name,
      password: "",
      platformId: profile.id,
      platform: provider
    }
    this.props.onSubmit(request);
  }

  render(){
    return(
      <div className={`${this.props.className}`}>
        <SocialLogin
        provider='facebook'
        appId='1254904154668703'
        callback={this.handleSocialResponse}
        >
          <FacebookButton iconSize={"2rem"} size={"4rem"} align={"center"}>
            {this.props.children}
          </FacebookButton>
        </SocialLogin>
      </div>
    )
  }
}

export default ButtonFacebook;
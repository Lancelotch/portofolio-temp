import React,{Component} from 'react'
import {OldSocialLogin as SocialLogin} from 'react-social-login'
import { GoogleLoginButton as GoogleButton} from "react-social-login-buttons";

class ButtonGoogle extends Component{
  constructor(props){
    super(props);
  }

  handleSocialResponse = (user, err) => {
    console.log({google : user});

    const profile = user._profile;
    const token = user._token;
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
          provider='google'
          appId='395205780758-1e4e7gm2hi6p6of87j82ar6petjf1u6t.apps.googleusercontent.com'
          callback={this.handleSocialResponse}
        >
          <GoogleButton iconSize={"2rem"} size={"4rem"} align={"center"}>
            {this.props.children}
          </GoogleButton>
        </SocialLogin>
      </div>
    )
  }
}

export default ButtonGoogle;
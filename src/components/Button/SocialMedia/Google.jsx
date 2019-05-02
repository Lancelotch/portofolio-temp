import React,{Component} from 'react'
import {OldSocialLogin as SocialLogin} from 'react-social-login'
import { GoogleLoginButton as GoogleButton} from "react-social-login-buttons";
const GOOGLE_APP_ID = process.env.REACT_APP_GOOGLE_APP_ID;

class ButtonGoogle extends Component{
  handleSocialResponse = (user, err) => {
    const token = user._token.idToken;
    const request = {
      token : token
    }
    this.props.onSubmit(request);
    // console.log("apa ini wosi")
  }

  render(){
    const {onSubmit} = this.props
    return(
      <div className={`${this.props.className}`}>
        <SocialLogin
          provider='google'
          appId={GOOGLE_APP_ID}
          callback={() =>this.handleSocialResponse}
        >
          <GoogleButton onClick={onSubmit} className='button-socmed' iconSize={"2rem"} size={"4rem"} align={"center"}>
            {this.props.children}
          </GoogleButton>
        </SocialLogin>
      </div>
    )
  }
}

export default ButtonGoogle;
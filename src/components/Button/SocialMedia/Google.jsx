import React,{Component} from 'react'
import {OldSocialLogin as SocialLogin} from 'react-social-login'
import { GoogleLoginButton as GoogleButton} from "react-social-login-buttons";
// const GOOGLE_APP_ID = process.env.REACT_APP_GOOGLE_APP_ID
const GOOGLE_APP_ID = "395205780758-1e4e7gm2hi6p6of87j82ar6petjf1u6t.apps.googleusercontent.com"

class ButtonGoogle extends Component{
  handleSocialResponse = (user, err) => {
    const token = user._token.idToken;
    const request = {
      token : token
    }
    // console.log("ini token",token)
    this.props.onSubmit(request);
    // console.log("apa ini wosi")
    console.log(user)
    console.log("ini token dari button",request)
  }

  render(){
    const {onSubmit} = this.props
    console.log("ini id",GOOGLE_APP_ID)
    return(
      <div className={`${this.props.className}`}>
        <SocialLogin
          provider='google'
          appId={GOOGLE_APP_ID}
          callback={this.handleSocialResponse}
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
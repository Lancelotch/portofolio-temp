import React from 'react'
import {OldSocialLogin as SocialLogin} from 'react-social-login'
import { GoogleLoginButton } from "react-social-login-buttons";

const handleSocialLogin = (user, err) => {
  console.log({user : user})
  console.log(err)
}
 
const ButtonGoogle = ({className, children, ...props}) =>(
  <div className={`${className}`} >
    <SocialLogin
      provider='google'
      appId='615585105258-0bokifsov91evfhuhjst3qnlc3ab1gvl.apps.googleusercontent.com'
      callback={handleSocialLogin}
    >
      <GoogleLoginButton iconSize={"2rem"} size={"4rem"} align={"center"}>
        {children}
      </GoogleLoginButton>
    </SocialLogin>
  </div>
)

export default ButtonGoogle;
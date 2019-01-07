import React from 'react'
import {OldSocialLogin as SocialLogin} from 'react-social-login'
import { FacebookLoginButton } from "react-social-login-buttons";

const handleSocialLogin = (user, err) => {
  console.log({user : user})
  console.log(err)
}
 
const ButtonFacebook = ({className, children, ...props}) =>(
  <div className={`${className}`}>
    <SocialLogin
      provider='facebook'
      appId='315428089178708'
      callback={handleSocialLogin}
    >
      <FacebookLoginButton iconSize={"2rem"} size={"4rem"} align={"center"}>
        {children}
      </FacebookLoginButton>
    </SocialLogin>
  </div>
)

export default ButtonFacebook;
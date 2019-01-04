import React from 'react'
import SocialLogin from 'react-social-login'
import { FacebookLoginButton } from "react-social-login-buttons";

const ButtonFacebook = ({ children, triggerLogin, ...props }) => (
  <FacebookLoginButton onClick={triggerLogin} {...props}>
    { children }
  </FacebookLoginButton>
)
 
export default SocialLogin(ButtonFacebook)
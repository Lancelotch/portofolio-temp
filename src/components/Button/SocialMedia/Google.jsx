import React from 'react'
import SocialLogin from 'react-social-login'
import { GoogleLoginButton } from "react-social-login-buttons";
 
const ButtonGoogle = ({ children, triggerLogin, ...props }) => (
  <GoogleLoginButton onClick={triggerLogin} {...props}>
    { children }
  </GoogleLoginButton>
)
 
export default SocialLogin(ButtonGoogle)
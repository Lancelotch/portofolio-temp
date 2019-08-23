import React from 'react'
import {OldSocialLogin as SocialLogin} from 'react-social-login'
import { GoogleLoginButton as GoogleButton} from "react-social-login-buttons"
import PropTypes from "prop-types"
const REACT_APP_GOOGLE_APP_ID = process.env.REACT_APP_GOOGLE_APP_ID

export default function ButtonGoogle(props){
 function handleSocialResponse (user, err) {
    if(user) {
      const token = user._token.idToken;
      const request = {
        token : token
      }
      this.props.onSubmit(request);
    }
  }

    const {onSubmit} = props
    return(
      <div className={`${props.className}`}>
        <SocialLogin
          provider='google'
          appId={REACT_APP_GOOGLE_APP_ID}
          callback={handleSocialResponse}
        >
          <GoogleButton onClick={onSubmit} style={{margin:"0 8px 0 0"}} size={"48px"} align={"center"}>
            {props.children}
          </GoogleButton>
        </SocialLogin>
      </div>
    )
  } 
  
  ButtonGoogle.propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func, 
  };

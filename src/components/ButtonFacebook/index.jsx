import React from 'react'
import {OldSocialLogin as SocialLogin} from 'react-social-login'
import { FacebookLoginButton as FacebookButton} from "react-social-login-buttons";
import PropTypes from "prop-types";

const REACT_APP_FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;

const ButtonFacebook = props => {

  function handleSocialResponse (user, err)  {
    const profile = user._profile;
    //const provider = user._provider;
    const token = user._token.accessToken
    const request = {
      token : token,
      id: profile.id
    }
    props.onSubmit(request);
  }

    return(
      <div className={`${props.className}`}>
        <SocialLogin
        provider='facebook'
        appId={REACT_APP_FACEBOOK_APP_ID}
        callback={handleSocialResponse}
        >
          <FacebookButton style={{margin:"0 0 0 8px"}} size={"48px"} align={"center"}>
            {props.children}
          </FacebookButton>
        </SocialLogin>
      </div>
    )
  }

  ButtonFacebook.propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func, 
  };

export default ButtonFacebook;
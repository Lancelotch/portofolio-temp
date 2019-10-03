import React, { useEffect } from "react";
import "./style.sass";
import { useRootContext } from "../../hoc/RootContext";
import FormLoginContainer from "../../containers/FormLogin/FormLoginContainer";
import monggopesen_logo from "../../assets/img/logo_monggopesen/logo_monggopesen_orange_large.png";
import { Link } from "react-router-dom";
import PATH_URL from "../../routers/path.js"
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { useTranslation } from "react-i18next";

export default function Login(props) {
  const { isAuthenticated, history, showAlert } = useRootContext()
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      const nextPage = props.location.state &&
        props.location.state.nextPage ? props.location.state.nextPage : PATH_URL.HOME
      history.push(nextPage);
    }
  })

  useEffect(() => {
    if (props.location.state) {
      const reset = props.location.state.reset
      if (reset) {
        showAlert({
          title: 'Password sudah berhasil diubah',
          description: "Silahkan login kembali dengan password kamu yang baru",
          showIcon: true,
          animation: 'fall'
        })
      }
      history.replace('/login', { reset: false })
    }
  }, [])

  return (
    <div className="mp-login-container-page">
      <div className="mp-login-container-page__image">
        <Link to={PATH_URL.HOME}>
          <img src={monggopesen_logo} alt="" />
        </Link>
      </div>
      <p className="mp-login-container-page__title">
        {t('login:title')}
      </p>
      <BackgroundWrapper>
        <FormLoginContainer />
      </BackgroundWrapper>
    </div>
  );
}

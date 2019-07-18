import {serviceWithToken, serviceWithoutToken } from './httpClient';
import {PATH_PUBLIC} from '../path'

const loginWithGoogle = request => {
    const url = PATH_PUBLIC.PUBLIC_OAUTH_SOSIAL_MEDIA_GOOGLE;
    // const url = "http://28b2c0da.ngrok.io"
    // const data = request;
    //mainRequestPost(url, data);
    return new Promise((resolve, reject) => {
      serviceWithoutToken()
        .request({
          method: 'POST',
          url: url,
          data: request
        })
        .then(response => {
          //console.log("ini respon",response)
          resolve(response.data);
        })
        .catch(error => {
          //console.log("ini di services",error)
          reject(error.response);
        });
    });
};

const loginWithFacebook = request => {
  const url = PATH_PUBLIC.PUBLIC_OAUTH_SOSIAL_MEDIA_FACEBOOK
  return new Promise((resolve, reject) => {
    serviceWithoutToken()
      .request({
        method: 'POST',
        url: url,
        data: request
      })
      .then(response => {
        //console.log("ini respon",response)
        resolve(response.data);
      })
      .catch(error => {
        //console.log("ini di services",error)
        reject(error.response);
      });
  });
}

const loginWithProductDetail = request => {
  return new Promise((resolve, reject) => {
    serviceWithoutToken()
      .request({
        method: "POST",
        url: PATH_PUBLIC.PUBLIC_USER_LOGIN,
        data: request
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

const loginWithForm = request => {
  return new Promise((resolve, reject) => {
    serviceWithoutToken()
      .request({
        method: "POST",
        url: PATH_PUBLIC.PUBLIC_USER_LOGIN,
        data: request
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

const registerWithForm = request => {
  return new Promise((resolve,reject)=>{
   serviceWithoutToken()
    .request({
     method: "POST",
     url: PATH_PUBLIC.PUBLIC_USER_REGISTER,
     data: request
    })
    .then(response=> {
      resolve(response.data);
    })
    .catch(error=>{
      reject(error.response);
    });
  });
};


const activatingUser = request =>{
  return new Promise((resolve, reject) => {
    serviceWithToken()
      .request({
        method: "GET",
        url: PATH_PUBLIC.PUBLIC_USER_ACTIVED + request
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
}

const forgotPassword = async({email}) => {
  return await serviceWithoutToken()
    .request({
      method: "GET",
      url: `${PATH_PUBLIC.PUBLIC_FORGOT_PASSWORD}?email=${email}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response;
    });
  }

const authentication = {
  loginWithProductDetail : loginWithProductDetail,
  loginWithForm: loginWithForm,
  registerWithForm: registerWithForm,
  loginWithGoogle:  loginWithGoogle,
  activatingUser: activatingUser,
  loginWithFacebook: loginWithFacebook,
  forgotPassword: forgotPassword
}

export default authentication;
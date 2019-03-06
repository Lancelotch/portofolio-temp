import { mainService, dummyService, dummyServiceLogin } from './httpClient';
import {PATH_PUBLIC} from '../path'

const loginWithGoogle = request => {
    const url = PATH_PUBLIC.PUBLIC_OAUTH_SOSIAL_MEDIA_GOOGLE;
    const data = request;
    //mainRequestPost(url, data);
    return new Promise((resolve, reject) => {
      dummyService
        .request({
          method: 'GET',
          url: 'login'
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
    dummyServiceLogin
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
    dummyServiceLogin
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
    dummyService
      .request({
        method: "GET",
        url: "activation/"+ request
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });

  });
}

const authentication = {
  loginWithForm: loginWithForm,
  registerWithForm: registerWithForm,
  loginWithGoogle:  loginWithGoogle,
  activatingUser: activatingUser
}

export default authentication;
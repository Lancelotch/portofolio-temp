import urls from "../urls";
import httpClient from "../../config/httpClient";
import urlsDummy from "../urlsDummy";

const login = request => {
  return new Promise((resolve, reject) => {
    httpClient.mainService
      .request({
        method: "POST",
        url: urls.login,
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

const register = request => {
  return new Promise((resolve, reject) => {
    httpClient.mainService
      .request({
        method: "POST",
        url: urls.register,
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

const loginSosialMedia = request => {
  return new Promise((resolve, reject) => {
    httpClient.mainService
      .request({
        method: "POST",
        url: urls.loginSocialMedia,
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

const apiGetDetailUser = () => {
  return new Promise((resolve, reject) => {
    // httpClient.httpClientMainService
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.DetailUser
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};


const registerSosialMedia = request => {
  return new Promise((resolve, reject) => {
    // httpClient.mainService
    //   .request({
    //     method: "POST",
    //     url: urls.registerSocialMedia,
    //     data: request
    //   })
    //   .then(response => {
    //     resolve(response.data);
    //   })
    //   .catch(error => {
    //     reject(error.response);
    //   });
    httpClient.dummyService
      .request({
        method: "GET",
        url: urlsDummy.activation+ request
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

const activatingCustomer = request =>{
  return new Promise((resolve, reject) => {
    // httpClient.mainService
    //   .request({
    //     method: "GET",
    //     url: urls.activatingCustomer+ request
    //   })
    //   .then(response => {
    //     resolve(response.data);
    //   })
    //   .catch(error => {
    //     reject(error.response);
    //   });
    httpClient.dummyService
      .request({
        method: "GET",
        url: urlsDummy.activation+ request
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
  apiGetDetailUser: apiGetDetailUser,
  login: login,
  register: register,
  loginSosialMedia: loginSosialMedia,
  registerSosialMedia: registerSosialMedia,
  activatingCustomer: activatingCustomer
}

export default authentication;

import URLS from "../urls";
import httpClients from "./httpClients";
import urlsDummy from "../urlsDummy";

const login = request => {
  return new Promise((resolve, reject) => {
    httpClients.mainService
      .request({
        method: "POST",
        url: URLS.CUSTOMER_LOGIN,
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
    httpClients.mainService
      .request({
        method: "POST",
        url: URLS.CUSTOMER_REGISTER,
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
    httpClients.mainService
      .request({
        method: "POST",
        url: URLS.CUSTOMER_LOGIN_SOSMED,
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
    httpClients.mainService
      .request({
        method: "GET",
        url: URLS.CUSTOMER_DETAIL
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
    httpClients.dummyService
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
    httpClients.dummyService
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

import urls from "../urls";
import httpClient from "../../config/httpClient";

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

const authentication = {
    login : login,
    loginSosialMedia : loginSosialMedia
}

export default authentication;
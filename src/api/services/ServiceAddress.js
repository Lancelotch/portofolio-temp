<<<<<<< HEAD
import urls from "../urls";
import httpClient  from "config/httpClient";
=======
import httpClient from "../../config/httpClient"
import urls from "../urls"
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037


export const apiGetAddressDefault = () => {
  return new Promise((resolve, reject) => {
    httpClient.mainService
      .request({
        method: "GET",
<<<<<<< HEAD
        url: urls.CustomerAddressDefault
=======
        url: urls.urlCustomerAddressDefault
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {        
        reject(error.response.data);
      });
  });
};

export const apiGetAddress = () => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.CustomerAddress
=======
    httpClient.httpClientMainService
      .request({
        method: "GET",
        url: urls.urlCustomerAddress
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {        
        reject(error.response);
      });
  });
};

export const apiChangeAddressDefault = (request) => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    httpClient.mainService
      .request({
        method: "PATCH",
        url: urls.ChangeAddressDefault,
=======
    httpClient.httpClientMainService
      .request({
        method: "PATCH",
        url: urls.urlChangeAddressDefault,
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
        data : request
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {        
        reject(error.response);
      });
  });
};


export const apiAddUserAddress = (request) => {
  return new Promise((resolve,reject)=>{
<<<<<<< HEAD
    httpClient.mainService
      .request({
        method: "POST",
        url: urls.AddUserAddress,
=======
    httpClient.httpClientMainService
      .request({
        method: "POST",
        url: urls.urlAddUserAddress,
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
        data : request
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  })
}


export const apiGetProvince = () => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.GetProvince
=======
    httpClient.httpClientMainService
      .request({
        method: "GET",
        url: urls.urlGetProvince
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const apiGetCity = (request) => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.GetCity+"?province="+request
=======
    httpClient.httpClientMainService
      .request({
        method: "GET",
        url: urls.urlGetCity+"?province="+request
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const apiDeleteAddress = (request) => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    httpClient.mainService
      .request({
        method: "DELETE",
        url: urls.DeleteAddress + request
=======
    httpClient.cartServices
      .request({
        method: "DELETE",
        url: urls.urlDeleteAddress + request
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const apiAddressInfo = (request) => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.DeleteAddress + request
=======
    httpClient.httpClientMainService
      .request({
        method: "GET",
        url: urls.urlDeleteAddress + request
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const apiAddressEdit = (id,newData) => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    httpClient.mainService
      .request({
        method: "PUT",
        url: urls.DeleteAddress,
=======
    httpClient.httpClientMainService
      .request({
        method: "PUT",
        url: urls.urlDeleteAddress,
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
        data: newData
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};
import httpClient from "../config/httpClient";
import urls from "../urls";


export const apiGetAddressDefault = () => {
  return new Promise((resolve, reject) => {
    httpClient.httpClientMainService
      .request({
        method: "GET",
        url: urls.urlCustomerAddressDefault
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
    httpClient.httpClientMainService
      .request({
        method: "GET",
        url: urls.urlCustomerAddress
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
    httpClient.httpClientMainService
      .request({
        method: "PATCH",
        url: urls.urlChangeAddressDefault,
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
    httpClient.httpClientMainService
      .request({
        method: "POST",
        url: urls.urlAddUserAddress,
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
    httpClient.httpClientMainService
      .request({
        method: "GET",
        url: urls.urlGetProvince
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
    httpClient.httpClientMainService
      .request({
        method: "GET",
        url: urls.urlGetCity+"?province="+request
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
    httpClient.httpClientMainService
      .request({
        method: "DELETE",
        url: urls.urlDeleteAddress + request
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
    httpClient.httpClientMainService
      .request({
        method: "GET",
        url: urls.urlDeleteAddress + request
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
    httpClient.httpClientMainService
      .request({
        method: "PUT",
        url: urls.urlDeleteAddress,
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
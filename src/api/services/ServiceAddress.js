import urls from "../urls";
import httpClient  from "../config/httpClient"


export const apiGetAddressDefault = () => {
  return new Promise((resolve, reject) => {
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.CustomerAddressDefault
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
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.CustomerAddress
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
    httpClient.mainService
      .request({
        method: "PATCH",
        url: urls.ChangeAddressDefault,
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
    httpClient.mainService
      .request({
        method: "POST",
        url: urls.AddUserAddress,
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
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.GetProvince
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
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.GetCity+"?province="+request
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
    httpClient.mainService
      .request({
        method: "DELETE",
        url: urls.DeleteAddress + request
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
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.DeleteAddress + request
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
    httpClient.mainService
      .request({
        method: "PUT",
        url: urls.DeleteAddress,
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
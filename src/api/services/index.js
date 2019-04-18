import { dummyService } from "./httpClient";

const service = dummyService;

export const getMethod = pathService => {
  return new Promise((resolve, reject) => {
    service
      .request({
        method: "GET",
        url: `${pathService}`
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const fetchDataService = request => {
  return new Promise((resolve, reject) => {
    service
      .request({ ...request })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const getService = url => {
  return new Promise((resolve, reject) => {
    service
      .request({
        method: "GET",
        url: `${url}`
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const postService = (url, request) => {
  return new Promise((resolve, reject) => {
    service
      .request({
        method: "POST",
        url: url,
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

export const patchService = (url, request) => {
  return new Promise((resolve, reject) => {
    service
      .request({
        method: "PATCH",
        url: url,
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

export const deleteService = url => {
  return new Promise((resolve, reject) => {
    service
      .request({
        method: "DELETE",
        url: url
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

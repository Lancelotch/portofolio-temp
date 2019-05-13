import {
  dummyService,
  serviceDummyWithToken,
  serviceDummyWithoutToken
} from "./httpClient";

const service = dummyService;
const serviceWithToken = serviceDummyWithToken;
const serviceWithoutToken = serviceDummyWithoutToken;

/** Service With Token */
export const apiGetWithToken = (url, params) => {
  return serviceWithToken().get(url, {
    params: params
  });
};

export const apiPostWithToken = (url, params) => {
  return serviceWithToken().post(url, params);
};

export const apiPatchWithToken = (url, params) => {
  return serviceWithToken().patch(url, params);
};

export const apiPutWithToken = (url, params) => {
  return serviceWithToken().put(url, params);
};

export const apiDeleteWithToken = url => {
  return serviceWithToken().delete(url);
};

/** Service Without Token */
export const apiGetWithoutToken = (url, params = null) => {
  return serviceWithoutToken().get(url);
};

export const apiPostWithoutToken = (url, params) => {
  return serviceWithoutToken().post(url, params);
};

export const apiPatchWithoutToken = (url, params) => {
  return serviceWithoutToken().patch(url, params);
};

export const apiPutWithoutToken = (url, params) => {
  return serviceWithoutToken().put(url, params);
};

export const apiDeleteWithoutToken = url => {
  return serviceWithoutToken().delete(url);
};

export const getMethod = pathService => {
  return new Promise((resolve, reject) => {
    serviceWithoutToken
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

export const putService = (url, request) => {
  return new Promise((resolve, reject) => {
    service
      .request({
        method: "PUT",
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

import { dummyService } from "./httpClient";


export  const getMethod = ({pathService, limit, page, sortBy, direction}) => {
    return new Promise((resolve, reject) => {
      dummyService
        .request({
          method: "GET",
          url: `${pathService}?limit=${limit}&page=${page}&sortBy=${sortBy}&direction=${direction}`
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data);
        });
    });
  };

  export  const getMethodWithoutParam = ({pathService}) => {
    return new Promise((resolve, reject) => {
      dummyService
        .request({
          method: "GET",
          url: `${pathService}`
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data);
        });
    });
  };
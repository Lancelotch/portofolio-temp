import urls from "../urls";
import httpClients from "./httpClients";

const categoryFeature = () => {
    return new Promise((resolve, reject) => {
      httpClients.mainService
        .request({
          method: "GET",
          url: urls.GetCategoryFeature
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

const promoFeature = ()=> {
  return new Promise((resolve, reject) => {
    httpClients.httpClientMainService
      .request({
        method: "GET",
        url: urls.GetPromoFeature
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
}

const sliderHome = () => {
  return new Promise((resolve, reject) => {
    httpClients.mainService
      .request({
        method: "GET",
        url: urls.GetSliderHome
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
}

const serviceCategory = {
  categoryFeature : categoryFeature,
  promoFeature : promoFeature,
  sliderHome : sliderHome
}

export default serviceCategory;

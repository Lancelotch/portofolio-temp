
//Root Service
const mainServices = "https://api.monggopesen.com/main-services/";

//Authentication Page
const login = "api/v1/public/user/login";
const loginSocialMedia = "api/v1/public/user/login-sosmed";
const registerSocialMedia = "api/v1/public/user/register-sosmed";

//Product
const GetProductById = "api/v1/product/";
const GetProductByCategory = "api/v1/product/category/";


//Product Category
const GetCategoryFeature = "api/v1/category/feature";
const urlGetSliderHome = "api/v1/home/slider/";

const urls = {
    mainServices : mainServices,
    login : login,
    GetProductById: GetProductById,
    GetProductByCategory: GetProductByCategory,
    GetCategoryFeature : GetCategoryFeature,
    urlGetSliderHome : urlGetSliderHome,
    loginSocialMedia : loginSocialMedia,
    registerSocialMedia : registerSocialMedia

}

export default urls

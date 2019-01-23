
//Root Service
const mainServices = "https://api.monggopesen.com/main-services/";
const cartServices = "https://api.monggopesen.com/cart-services/";

const cart = "cart-services/v1/cart/user";

//User
const detailUser = "api/v1/customer/";

//Authentication Page
const login = "api/v1/public/user/login";
const loginSocialMedia = "api/v1/public/user/login-sosmed";
const registerSocialMedia = "api/v1/public/user/register-sosmed";

//Product
const GetProductById = "api/v1/product/";
const GetProductByCategory = "api/v1/product/category/";

//Address
const CustomerAddressDefault = "api/v1/customer/address/default/";
const CustomerAddress = "api/v1/customer/address/";
const ChangeAddressDefault = "api/v1/customer/address/default/";
const GetProvince = "api/v1/customer/address/province";
const GetCity = "api/v1/customer/address/city";
const NgrokGetProvince = "api/v1/customer/address/province";
const NgrokGetCity = "api/v1/customer/address/city";
const AddUserAddress = "api/v1/customer/address";
const DeleteAddress = "/api/v1/customer/address/";

//Invoice
const GetInvoice = "api/v1/invoice/";

//Product Category
const GetCategoryFeature = "api/v1/category/feature";
const urlGetSliderHome = "api/v1/home/slider/";

const urls = {
    mainServices : mainServices,
    cartServices: cartServices,
    cart : cart,
    detailUser : detailUser,
    login : login,
    GetProductById: GetProductById,
    GetProductByCategory: GetProductByCategory,
    GetCategoryFeature : GetCategoryFeature,
    urlGetSliderHome : urlGetSliderHome,
    loginSocialMedia : loginSocialMedia,
    registerSocialMedia : registerSocialMedia,
    CustomerAddressDefault : CustomerAddressDefault,
    CustomerAddress : CustomerAddress,
    ChangeAddressDefault : ChangeAddressDefault,
    GetProvince : GetProvince,
    GetCity : GetCity,
    NgrokGetProvince : NgrokGetProvince,
    NgrokGetCity : NgrokGetCity,
    AddUserAddress : AddUserAddress,
    DeleteAddress : DeleteAddress,
    GetInvoice: GetInvoice

}

export default urls;
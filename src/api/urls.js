//Root Service
const mainServices = "https://api.monggopesen.com/main-services/";
const cartServices = "https://api.monggopesen.com/cart-services/";
const cart = "v1/cart/user";
<<<<<<< HEAD

//User
const detailUser = "api/v1/customer/";
=======
>>>>>>> 6dc9075a8b15681a00ed927e675f5e7352c891d4

//Authentication Page
const login = "api/v1/public/user/login";
const register = "api/v1/public/user/register";
const loginSocialMedia = "api/v1/public/user/login-sosmed";
const registerSocialMedia = "api/v1/public/user/register-sosmed";

//User
<<<<<<< HEAD
const urlDetailUser = "api/v1/customer/";
=======
const DetailUser = "api/v1/customer/";
>>>>>>> 6dc9075a8b15681a00ed927e675f5e7352c891d4

//Product
const GetProductById = "api/v1/product/";
const GetProductByCategory = "api/v1/product/category/";

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 6dc9075a8b15681a00ed927e675f5e7352c891d4
//Cart
const addToCart = "v1/cart/user/";
const getProductsFromCart = "v1/cart/user/";
const updateProductFromCart = "v1/cart/user/";
const deleteProductFromCart = "v1/cart/user/";

//Courier
<<<<<<< HEAD
const urlGetCourier = "api/v1/courier/cost";

//Generate Order Id
const urlGenerateOrderId = "api/v1/order/generate/";

//Address
const urlCustomerAddressDefault = "api/v1/customer/address/default/";
const urlCustomerAddress = "api/v1/customer/address/";
const urlChangeAddressDefault = "api/v1/customer/address/default/";
const urlGetProvince = "api/v1/customer/address/province";
const urlGetCity = "api/v1/customer/address/city";
const ngrokUrlGetProvince = "api/v1/customer/address/province";
const ngrokUrlGetCity = "api/v1/customer/address/city";
const urlAddUserAddress = "api/v1/customer/address";
const urlDeleteAddress = "/api/v1/customer/address/";

//Order
const urlAddOrder = "api/v1/order";

//Payment
const urlCreatePayment = "api/v1/payment";
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
=======
const GetCourier = "api/v1/courier/cost";

//Generate Order Id
const GenerateOrderId = "api/v1/order/generate/";

//Address
const CustomerAddressDefault = "api/v1/customer/address/default/";
const CustomerAddress = "api/v1/customer/address/";
const ChangeAddressDefault = "api/v1/customer/address/default/";
const GetProvince = "api/v1/customer/address/province";
const GetCity = "api/v1/customer/address/city";
const ngrokUrlGetProvince = "api/v1/customer/address/province";
const ngrokUrlGetCity = "api/v1/customer/address/city";
const AddUserAddress = "api/v1/customer/address";
const DeleteAddress = "/api/v1/customer/address/";

//Order
const AddOrder = "api/v1/order";

//Payment
const CreatePayment = "api/v1/payment";
>>>>>>> 6dc9075a8b15681a00ed927e675f5e7352c891d4

//Product Category
const GetCategoryFeature = "api/v1/category/feature";
const urlGetSliderHome = "api/v1/home/slider/";

const urls = {
<<<<<<< HEAD
<<<<<<< HEAD
    mainServices : mainServices,
    cartServices: cartServices,
    cart : cart,
    detailUser : detailUser,
    login : login,
=======
    urlDetailUser : urlDetailUser,
    addToCart: addToCart,
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
    GetProductById: GetProductById,
    updateProductFromCart : updateProductFromCart,
    GetProductByCategory: GetProductByCategory,
<<<<<<< HEAD
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
=======
=======
    DetailUser : DetailUser,
    addToCart: addToCart,
    GetProductById: GetProductById,
    updateProductFromCart : updateProductFromCart,
    GetProductByCategory: GetProductByCategory,
>>>>>>> 6dc9075a8b15681a00ed927e675f5e7352c891d4
    mainServices: mainServices,
    cartServices: cartServices,
    cart: cart,
    login: login,
    register: register,
    GetCategoryFeature: GetCategoryFeature,
    urlGetSliderHome: urlGetSliderHome,
    loginSocialMedia: loginSocialMedia,
    registerSocialMedia: registerSocialMedia,
    getProductsFromCart: getProductsFromCart,
<<<<<<< HEAD
    urlCustomerAddressDefault : urlCustomerAddressDefault,
    urlCustomerAddress : urlCustomerAddress,
    urlChangeAddressDefault : urlChangeAddressDefault,
    urlGetProvince : urlGetProvince,
    urlDeleteAddress : urlDeleteAddress,
    urlGetCity : urlGetCity,
    urlGetCourier : urlGetCourier,
    urlGenerateOrderId : urlGenerateOrderId,
    urlAddUserAddress : urlAddUserAddress,
    urlAddOrder : urlAddOrder,
    urlCreatePayment : urlCreatePayment,
=======
    CustomerAddressDefault : CustomerAddressDefault,
    CustomerAddress : CustomerAddress,
    ChangeAddressDefault : ChangeAddressDefault,
    GetProvince : GetProvince,
    DeleteAddress : DeleteAddress,
    GetCity : GetCity,
    GetCourier : GetCourier,
    GenerateOrderId : GenerateOrderId,
    AddUserAddress : AddUserAddress,
    AddOrder : AddOrder,
    CreatePayment : CreatePayment,
>>>>>>> 6dc9075a8b15681a00ed927e675f5e7352c891d4
    deleteProductFromCart : deleteProductFromCart,
    ngrokUrlGetProvince : ngrokUrlGetProvince,
    ngrokUrlGetCity : ngrokUrlGetCity
}

<<<<<<< HEAD
export default urls
>>>>>>> 7df78d5111c18e198c3a12f0e5813b41cdf7b037
=======
export default urls
>>>>>>> 6dc9075a8b15681a00ed927e675f5e7352c891d4

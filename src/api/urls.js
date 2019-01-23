//Root Service
const mainServices = "https://api.monggopesen.com/main-services/";
const cartServices = "https://api.monggopesen.com/cart-services/";
const cart = "v1/cart/user";

//Authentication Page
const login = "api/v1/public/user/login";
const register = "api/v1/public/user/register";
const loginSocialMedia = "api/v1/public/user/login-sosmed";
const registerSocialMedia = "api/v1/public/user/register-sosmed";

//User
const DetailUser = "api/v1/customer/";

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

//Cart
const addToCart = "v1/cart/user/";
const getProductsFromCart = "v1/cart/user/";
const updateProductFromCart = "v1/cart/user/";
const deleteProductFromCart = "v1/cart/user/";

//Courier
const GetCourier = "api/v1/courier/cost";

//Generate Order Id
const GenerateOrderId = "api/v1/order/generate/";


//Order
const AddOrder = "api/v1/order";

//Payment
const CreatePayment = "api/v1/payment";


//Product Category
const GetCategoryFeature = "api/v1/category/feature";
const urlGetSliderHome = "api/v1/home/slider/";

const urls = {
    mainServices : mainServices,
    cartServices: cartServices,
    cart : cart,
    DetailUser : DetailUser,
    login : login,
    addToCart: addToCart,
    GetProductById: GetProductById,
    updateProductFromCart : updateProductFromCart,
    GetProductByCategory: GetProductByCategory,
    DetailUser : DetailUser,
    addToCart: addToCart,
    GetProductById: GetProductById,
    updateProductFromCart : updateProductFromCart,
    GetProductByCategory: GetProductByCategory,
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
    deleteProductFromCart : deleteProductFromCart,
    NgrokGetProvince : NgrokGetProvince,
    NgrokGetCity : NgrokGetCity,
    GetInvoice: GetInvoice
}


export default urls
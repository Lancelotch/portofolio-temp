//PUBLIC
const PUBLIC_USER_LOGIN = "public/user/login";
const PUBLIC_USER_REGISTER = "public/user/register";
const PUBLIC_USER_ACTIVED = "public/user/actived/";
const PUBLIC_FORGOT_PASSWORD = "password/forgot";
const PUBLIC_CHANGE_PASSWORD = "password/change";
const PUBLIC_RESET_PASSWORD = "password/reset";
const PUBLIC_OAUTH_SOSIAL_MEDIA_GOOGLE = "public/oauth/sosial-media/google";
const PUBLIC_OAUTH_SOSIAL_MEDIA_FACEBOOK = "public/oauth/sosial-media/facebook";
export const PATH_PUBLIC = {
    PUBLIC_USER_LOGIN: PUBLIC_USER_LOGIN,
    PUBLIC_USER_REGISTER: PUBLIC_USER_REGISTER,
    PUBLIC_USER_ACTIVED: PUBLIC_USER_ACTIVED,
    PUBLIC_FORGOT_PASSWORD: PUBLIC_FORGOT_PASSWORD,
    PUBLIC_CHANGE_PASSWORD: PUBLIC_CHANGE_PASSWORD,
    PUBLIC_RESET_PASSWORD: PUBLIC_RESET_PASSWORD,
    PUBLIC_OAUTH_SOSIAL_MEDIA_GOOGLE: PUBLIC_OAUTH_SOSIAL_MEDIA_GOOGLE,
    PUBLIC_OAUTH_SOSIAL_MEDIA_FACEBOOK: PUBLIC_OAUTH_SOSIAL_MEDIA_FACEBOOK
} 

//CUSTOMER
const CUSTOMER = "customer";
const CUSTOMER_ADDRESS = `${CUSTOMER}/address`;
const CUSTOMER_ADDRESS_DEFAULT = `${CUSTOMER_ADDRESS}/default`;
const CUSTOMER_ADDRESS_PROVINCE = `${CUSTOMER_ADDRESS}/province`;
const CUSTOMER_ADDRESS_CITY = `${CUSTOMER_ADDRESS}/city`;
const CUSTOMER_ADDRESS_SUBDISTRICT = `${CUSTOMER_ADDRESS}/subdistrict`;
const CUSTOMER_ADDRESS_DELETE = `${CUSTOMER_ADDRESS}/`
const CUSTOMER_UPLOAD = 'image/upload'
export const PATH_CUSTOMER = {
    CUSTOMER_ADDRESS_DELETE : CUSTOMER_ADDRESS_DELETE,
    CUSTOMER : CUSTOMER,
    ADDRESS_DEFAULT: CUSTOMER_ADDRESS_DEFAULT,
    ADDRESS: CUSTOMER_ADDRESS,
    ADDRESS_PROVINCE: CUSTOMER_ADDRESS_PROVINCE,
    ADDRESS_CITY: CUSTOMER_ADDRESS_CITY,
    ADDRESS_SUBDISTRICT: CUSTOMER_ADDRESS_SUBDISTRICT,
    CUSTOMER_UPLOAD: CUSTOMER_UPLOAD
}

//PRODUCT
const PRODUCT = "product";
const PRODUCT_BY_ID = 'product/';
const PRODUCT_CATEGORY = "product/category/";
const PRODUCT_ALL_LIMIT = "product?limit=4";
const PRODUCT_SEARCH = "product/search?keyword="
const PRODUCT_BEST_SELLER = "product/best-seller?limit=4";
const PRODUCT_POPULAR = "product/popular-categories?limit=4"
const PRODUCT_RECOMMENDATION = "product/recommendations?limit=10"
export const PATH_PRODUCT = {
    PRODUCT_ALL_LIMIT : PRODUCT_ALL_LIMIT,
    PRODUCT: PRODUCT,
    PRODUCT_BY_ID: PRODUCT_BY_ID,
    PRODUCT_CATEGORY: PRODUCT_CATEGORY,
    PRODUCT_SEARCH: PRODUCT_SEARCH,
    PRODUCT_BEST_SELLER: PRODUCT_BEST_SELLER,
    PRODUCT_POPULAR,
    PRODUCT_RECOMMENDATION
}

//SHIPPING
const SHIPPING = "international-shipping";
const JNE = "courier/fare/jne";
export const PATH_SHIPPING = {
    SHIPPING: SHIPPING,
    JNE: JNE
}

//INVOICE
const INVOICE = "invoice/";
const INVOICE_BY_RECEIVED = `${INVOICE}/received/`;
export const PATH_INVOICE = {
    INVOICE_BY_RECEIVED : INVOICE_BY_RECEIVED,
    INVOICE: INVOICE
}

//CART
const CART_USER = "cart/user/";
export const PATH_CART = {
    CART_USER: CART_USER
}

//COURIER
const COURIER_COST = "courier/cost";
export const PATH_COURIER = {
    COURIER_COST: COURIER_COST
}

//ORDER
const ORDER = "order";
const ORDER_BY_ID = "order/"
const ORDER_PAYMENT_ID = "order/payment-info/"
const ORDER_BY_CANCEL = "order/cancel/"
const ORDER_GENERATE = "order/generate/";
export const PATH_ORDER = {
    ORDER: ORDER,
    ORDER_BY_ID: ORDER_BY_ID,
    ORDER_PAYMENT_ID : ORDER_PAYMENT_ID,
    ORDER_GENERATE: ORDER_GENERATE,
    ORDER_BY_CANCEL : ORDER_BY_CANCEL
}

//DASHBOARD TAB USER
const ORDER_STATUS_TAB_DASHBOARD = "invoice/tab/"
export const PATH_DASHBOARD_TAB = {
    ORDER_STATUS_TAB_DASHBOARD : ORDER_STATUS_TAB_DASHBOARD
}

//PAYMENT
const PAYMENT = "payment";
export const PATH_PAYMENT = {
    PAYMENT: PAYMENT
}

//CATEGORY 
const CATEGORY_FEATURE = "category";
export const PATH_CATEGORY = {
    CATEGORY_FEATURE: CATEGORY_FEATURE,
}

//HOME
const HOME_SLIDER = "home/slider/";
const HOME_BENEFIT = "home/benefit";
const HOME_SUBSCRIPTION = "home/subscription"
export const PATH_HOME = {
    HOME_SLIDER: HOME_SLIDER,
    HOME_BENEFIT: HOME_BENEFIT,
    HOME_SUBSCRIPTION: HOME_SUBSCRIPTION
}


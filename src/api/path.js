//PUBLIC
const PUBLIC_USER_LOGIN = "public/user/login";
const PUBLIC_USER_REGISTER = "public/user/register";
const PUBLIC_USER_ACTIVED = "public/user/actived/";
const PUBLIC_FORGOT_PASSWORD = "public/user/forgot-password";
const PUBLIC_OAUTH_SOSIAL_MEDIA_GOOGLE = "public/oauth/sosial-media/google";
const PUBLIC_OAUTH_SOSIAL_MEDIA_FACEBOOK = "public/oauth/sosial-media/facebook";
export const PATH_PUBLIC = {
    PUBLIC_USER_LOGIN: PUBLIC_USER_LOGIN,
    PUBLIC_USER_REGISTER: PUBLIC_USER_REGISTER,
    PUBLIC_USER_ACTIVED: PUBLIC_USER_ACTIVED,
    PUBLIC_FORGOT_PASSWORD: PUBLIC_FORGOT_PASSWORD,
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
export const PATH_CUSTOMER = {
    CUSTOMER : CUSTOMER,
    ADDRESS_DEFAULT: CUSTOMER_ADDRESS_DEFAULT,
    ADDRESS: CUSTOMER_ADDRESS,
    ADDRESS_PROVINCE: CUSTOMER_ADDRESS_PROVINCE,
    ADDRESS_CITY: CUSTOMER_ADDRESS_CITY,
    ADDRESS_SUBDISTRICT: CUSTOMER_ADDRESS_SUBDISTRICT
}

//PRODUCT
const PRODUCT = "product";
const PRODUCT_BY_ID = 'product/';
const PRODUCT_BY_ID_DRAFT = 'product-draft/'
const PRODUCT_CATEGORY = "product/category/";
const PRODUCT_CATEGORY_DRAFT = "product/category/";
const PRODUCT_SEARCH = "product/search/";
const PRODUCT_ALL_DRAFT = "product-draft"
const PRODUCT_SEARCH_DRAFT = "product-draft/search?keyword="
const PRODUCT_BEST_SELLER = "product/best-seller?limit=4";
const PRODUCT_POPULAR = "product/popular-categories?limit=4"
const PRODUCT_RECOMMENDATION = "product/recommendations?limit=10"
export const PATH_PRODUCT = {
    PRODUCT_ALL_DRAFT : PRODUCT_ALL_DRAFT,
    PRODUCT: PRODUCT,
    PRODUCT_BY_ID: PRODUCT_BY_ID,
    PRODUCT_BY_ID_DRAFT:PRODUCT_BY_ID_DRAFT,
    PRODUCT_CATEGORY: PRODUCT_CATEGORY,
    PRODUCT_CATEGORY_DRAFT : PRODUCT_CATEGORY_DRAFT,
    PRODUCT_SEARCH: PRODUCT_SEARCH,
    PRODUCT_SEARCH_DRAFT:PRODUCT_SEARCH_DRAFT,
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
export const PATH_INVOICE = {
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
const ORDER = "order-draft";
const ORDER_BY_ID = "order/"
const ORDER_PAYMENT_ID = "order/payment-info/"
const ORDER_BY_CANCEL = "order-draft/cancel/"
const ORDER_GENERATE = "order/generate/";
export const PATH_ORDER = {
    ORDER: ORDER,
    ORDER_BY_ID: ORDER_BY_ID,
    ORDER_PAYMENT_ID : ORDER_PAYMENT_ID,
    ORDER_GENERATE: ORDER_GENERATE,
    ORDER_BY_CANCEL : ORDER_BY_CANCEL
}

//DASHBOARD TAB USER
const ORDER_STATUS_TAB_DASHBOARD = "invoice-draft/tab/"
const ORDER_STATUS_IN_DELIVERY = "order/status/3";
const ORDER_STATUS_FINISH = "order/status/4";
const ORDER_STATUS_CANCEL = "order/status/5";
export const PATH_DASHBOARD_TAB = {
    ORDER_STATUS_TAB_DASHBOARD : ORDER_STATUS_TAB_DASHBOARD,
    ORDER_STATUS_IN_DELIVERY : ORDER_STATUS_IN_DELIVERY,
    ORDER_STATUS_FINISH : ORDER_STATUS_FINISH,
    ORDER_STATUS_CANCEL : ORDER_STATUS_CANCEL
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


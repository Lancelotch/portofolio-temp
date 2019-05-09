const HOME = '/';
const CHECKOUT = '/checkout';
const REGISTER = '/register';
const LOGIN = '/login';
const PRODUCT_DETAIL = '/product-detail/:productId';
const CART = '/cart';
const DASHBOARD_CUSTOMER = '/dashboard-customer/:tab';
const SEARCH = '/search';
const CATEGORY_LEVEL_1 = '/category/:categoryLevel1';
const CATEGORY_LEVEL_2 = '/category/:categoryLevel1/:categoryLevel2';
const CATEGORY_LEVEL_3 = '/category/:categoryLevel1/:categoryLevel2/:categoryLevel3';
const CONFIRMATION = '/confirmation/:idConfirmation';
const PRODUCTS = '/products';
const EXAMPLE = '/example';
const ORDER_SUMMARY = '/order-summary'

const PATH_URL = {
    LOGIN: LOGIN,
    HOME: HOME,
    PRODUCT_DETAIL: PRODUCT_DETAIL,
    CHECKOUT: CHECKOUT,
    REGISTER: REGISTER,
    CART: CART,
    DASHBOARD_CUSTOMER: DASHBOARD_CUSTOMER,
    SEARCH: SEARCH,
    CATEGORY_LEVEL_1: CATEGORY_LEVEL_1,
    CATEGORY_LEVEL_2: CATEGORY_LEVEL_2,
    CATEGORY_LEVEL_3: CATEGORY_LEVEL_3,
    CONFIRMATION: CONFIRMATION,
    PRODUCTS: PRODUCTS,
    EXAMPLE: EXAMPLE,
    ORDER_SUMMARY: ORDER_SUMMARY
}

export default PATH_URL;
import PATH_URL from './path';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ProductDetail from '../pages/ProductDetail/productDetailContainer'
import Confirmation from '../pages/Confirmation';
import Category from '../pages/Category';
import Search from '../pages/Search';
import Checkout from '../pages/Checkout';
import Product from '../pages/Product';
import Example from '../pages/Example';
import CategoryContainer from '../pages/Category/CategoryContainer';
import SearchContainer from '../pages/Search/SearchContainer';
import CheckOut from '../pages/Checkout';

const routes = [{
        path: PATH_URL.HOME,
        breadcrumb: 'monggopesen',
        component: Home
    },
    {
        path: PATH_URL.LOGIN,
        component: Login
    },
    {
        path: PATH_URL.CHECKOUT,
        component: CheckOut
    },
    {
        path: PATH_URL.REGISTER,
        breadcrumb: "register",
        component: Register
    },
    {
        path: PATH_URL.CONFIRMATION,
        component: Confirmation
    },
    {
        path: PATH_URL.PRODUCT_DETAIL,
        component: ProductDetail
    },
    {
        path: PATH_URL.CATEGORY,
        component: CategoryContainer
    },
    {
        path: '/category/fashion-pria/:categoryId',
        component: CategoryContainer
    },
    {
        path: '/category/fashion-pria/sepatu/:categoryId',
        component: CategoryContainer
    },
    {
        path: PATH_URL.SEARCH,
        component: SearchContainer
    },
    {
        path: PATH_URL.PRODUCTS,
        component: Product
    },
    {
        path: PATH_URL.EXAMPLE,
        component: Example
    },
]

export default routes;
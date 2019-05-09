import PATH_URL from './path'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ProductDetail from '../pages/ProductDetail'
import Confirmation from '../pages/Confirmation'
import Product from '../pages/Product'
import Example from '../pages/Example'
import CategoryContainer from '../pages/Category/CategoryContainer'
import SearchContainer from '../pages/Search/SearchContainer'
import Checkout from '../pages/Checkout'
import CustomerNavigation from '../pages/CustomerNavigation'
import requiredAuth from '../hoc/requiredAuth';
import notRequiredAuth from "../hoc/notRequiredAuth";
const routes = [{
        path: PATH_URL.HOME,
        breadcrumb: 'monggopesen',
        component: Home
    },
    {
        path: PATH_URL.LOGIN,
        component: notRequiredAuth(Login),
        layoutName: 'fullLayout'
    },
    {
        path: PATH_URL.CHECKOUT,
        component: requiredAuth(Checkout),
        layoutName: 'fullLayout'
    },
    {
        path: PATH_URL.REGISTER,
        breadcrumb: "register",
        component: notRequiredAuth(Register),
        layoutName: 'fullLayout'
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
        path: PATH_URL.CATEGORY_LEVEL_1,
        component: CategoryContainer
    },
    {
        path: PATH_URL.CATEGORY_LEVEL_2,
        component: CategoryContainer
    },
    {
        path: PATH_URL.CATEGORY_LEVEL_3,
        component: CategoryContainer
    },
    // {
    //     path: '/category/fashion-pria/:categoryId',
    //     component: CategoryContainer
    // },
    // {
    //     path: '/category/fashion-pria/sepatu/:categoryId',
    //     component: CategoryContainer    
    // },
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
    {
    path: '/dashboard-customer',
    component: requiredAuth(CustomerNavigation),
    layoutName: 'customerLayout'
}

]

export default routes;

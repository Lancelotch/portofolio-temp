import PATH_URL from './path'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ProductDetail from '../pages/ProductDetail/ProductDetailContainer'
import Confirmation from '../pages/Confirmation'
import Product from '../pages/Product'
import Example from '../pages/Example'
import CategoryContainer from '../pages/Category/CategoryContainer'
import SearchContainer from '../pages/Search/SearchContainer'
import CheckOut from '../pages/Checkout/CheckoutContainer'
import Address from '../pages/Address/Address';

const routes = [{
        path: PATH_URL.HOME,
        breadcrumb: 'monggopesen',
        component: Home,
        layoutName: 'mainLayout'
    },
    {
        path: PATH_URL.LOGIN,
        component: Login,
        layoutName: 'fullLayout'
    },
    {
        path: PATH_URL.CHECKOUT,
        component: CheckOut,
        layoutName: 'mainLayout'
    },
    {
        path: PATH_URL.REGISTER,
        breadcrumb: "register",
        component: Register,
        layoutName: 'fullLayout'
    },
    {
        path: PATH_URL.CONFIRMATION,
        component: Confirmation,
        layoutName: 'mainLayout'
    },
    {
        path: PATH_URL.PRODUCT_DETAIL,
        component: ProductDetail,
        layoutName: 'mainLayout'
    },
    {
        path: PATH_URL.CATEGORY,
        component: CategoryContainer,
        layoutName: 'mainLayout'
    },
    {
        path: '/category/fashion-pria/:categoryId',
        component: CategoryContainer,
        layoutName: 'mainLayout'
    },
    {
        path: '/category/fashion-pria/sepatu/:categoryId',
        component: CategoryContainer,
        layoutName: 'mainLayout'        
    },
    {
        path: PATH_URL.SEARCH,
        component: SearchContainer,
        layoutName: 'mainLayout'        
    },
    {
        path: PATH_URL.PRODUCTS,
        component: Product,
        layoutName: 'mainLayout'        
    },
    {
        path: PATH_URL.EXAMPLE,
        component: Example
    },
    {
        path: '/address',
        component:Address,
        layoutName: 'mainLayout'        
    }
]

export default routes;

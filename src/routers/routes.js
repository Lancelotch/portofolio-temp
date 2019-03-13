import PATH_URL from './path';
import Home from '../containers/Home';
import Register from '../containers/Register';
import ProductDetail from '../containers/ProductDetail'
import Confirmation from '../containers/Confirmation';
import Category from '../containers/Category';
import Search from '../containers/Search';

const routes = [{
        path: PATH_URL.HOME,
        breadcrumb: 'monggopesen',
        component: Home
    },
    {
        path: PATH_URL.REGISTER,
        breadcrumb: "register",
        component: Register
    },
    {
        path: PATH_URL.CONFIRMATION,
        component:Confirmation
    },
    {
        path: PATH_URL.PRODUCT_DETAIL,
        component: ProductDetail
    },
    {
        path: PATH_URL.CATEGORY,
        component:Category
    },
    {
        path: '/category/fashion-pria/:categoryId',
        component:Category
    },
    {
        path: '/category/fashion-pria/sepatu/:categoryId',
        component:Category
    },
    {
        path: PATH_URL.SEARCH,
        component: Search
    }
]

export default routes;
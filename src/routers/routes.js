import PATH_URL from './path';
import Home from '../containers/Home';
import Register from '../containers/Register';
import ProductDetail from '../containers/ProductDetail'
import Confirmation from '../containers/Confirmation';
import Category from '../containers/Category';
import Search from '../containers/Search';
import Product from '../containers/Product';
import Example from '../containers/Example';
import CategoryContainer from '../containers/Category/CategoryContainer';
import SearchContainer from '../containers/Search/SearchContainer';

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
        component:CategoryContainer
    },
    {
        path: '/category/fashion-pria/:categoryId',
        component:CategoryContainer
    },
    {
        path: '/category/fashion-pria/sepatu/:categoryId',
        component:CategoryContainer
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
        component:Example
    },
]

export default routes;

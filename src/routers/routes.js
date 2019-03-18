import PATH_URL from './path';
import HomeContainer from '../pages/Home/HomeContainer.jsx';
import Register from '../pages/Register';
import ProductDetail from '../pages/ProductDetail'
import Confirmation from '../pages/Confirmation';
import Category from '../pages/Category';
import Search from '../pages/Search';


const routes = [{
        path: PATH_URL.HOME,
        breadcrumb: 'monggopesen',
        component: HomeContainer
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

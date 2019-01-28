import HomePage from "../containers/HomePage/HomePage"
import RegisterPage from "../containers/RegisterPage/RegisterPage"
import ProductDetail from "../containers/ProductDetail/ProductDetail"
import Checkout from "../containers/Checkout/Checkout"
import Cart from "../containers/Cart/Cart"
import CategoryProduct from "../containers/CategoryProduct/CategoryProduct";
import ProductSearch from "../containers/ProductSearch/ProductSearch";

const routes = [{
        path: "/",
        breadcrumb: 'Monggopesen',
        component: HomePage
    },
    {
        path: "/register",
        breadcrumb: "Register",
        component: RegisterPage
    },
    {
        path: "/product-detail/:productId",
        component: ProductDetail
    },
    {
        path: "/cart",
        component: Cart
    },
    {
        path:"/checkout",
        component: Checkout
    },
    {
        path:"/category-product/:categoryId",
        component: CategoryProduct
    },
    {
        path:"/search", 
        component:ProductSearch
    }
]


export default routes;
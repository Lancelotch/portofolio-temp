import HomePage from "../containers/HomePage/HomePage";
import RegisterPage from "../containers/RegisterPage/RegisterPage";
import ProductDetail from "../containers/ProductDetail/ProductDetail";
import Cart from "../containers/Cart/Cart";

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
    }
]


export default routes;
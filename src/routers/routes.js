import HomePage from "../containers/HomePage/HomePage";
import RegisterPage from "../containers/RegisterPage/RegisterPage";
import ProductDetail from "../containers/ProductDetail/ProductDetail";

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
    }
]


export default routes;
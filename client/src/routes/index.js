import RegisterPage from "../pages/SignupPage/SignupPage"
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SigninPage from "../pages/SigninPage/SigninPage"
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/signin',
        page: SigninPage,
        isShowHeader: true,
    },
    {
        path: '/register',
        page: RegisterPage,
        isShowHeader: true,
    },
    {
        path: '/orders',
        page: OrdersPage,
        isShowHeader: true,

    },
    {
        path: '/products/:id',
        page: ProductsPage,
        isShowHeader: true,

    },
    {
        path: '*',
        page: NotFound,
    },
]
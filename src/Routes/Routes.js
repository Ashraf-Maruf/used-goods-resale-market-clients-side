import Blog from "../Pages/Blog/Blog";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyer from "../Pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../Pages/Dashboard/AllSeller/AllSeller";
import Buyers from "../Pages/Dashboard/Buyers/Buyers";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout/DashboardLayout";
import MyProduct from "../Pages/Dashboard/MyProduct/MyProduct";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Products from "../Pages/Home/CarCategories/Product/Products";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DisplayError from "../Shared/DisplayError/DisplayError";
import NotFound from "../Shared/NotFound/NotFound";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main");

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:([
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/blog',
                element:<Blog></Blog>
            },
            {
                path:'/products/:id',
                element:<Products></Products>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'*',
                element:<NotFound></NotFound>
            }                         
        ])
    },
    {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        errorElement:<DisplayError></DisplayError>,
        children:[
            {
                path:'/dashboard/myorder',
                element:<Buyers></Buyers>
            },
            {
                path:'/dashboard/productadd',
                element:<SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path:'/dashboard/myproduct',
                element:<SellerRoute><MyProduct></MyProduct></SellerRoute>
            },
            {
                path:'/dashboard/allbuyer',
                element:<AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path:'/dashboard/allseller',
                element:<AdminRoute><AllSeller></AllSeller></AdminRoute>
            },            
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>,
                loader:({params}) => fetch(`https://used-goods-resale-market-server.vercel.app/myorder/${params.id}`)
            },
            {
                path:'*',
                element:<NotFound></NotFound>
            } 

        ]
    }
])

export default router;
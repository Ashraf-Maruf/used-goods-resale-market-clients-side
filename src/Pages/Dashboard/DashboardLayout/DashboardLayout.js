import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useSeller from '../../../Hooks/useSeller';
import Footer from '../../../Shared/Footer/Footer';
import Navbar from '../../../Shared/Navbar/Navbar';
import useAdmin from './../../../Hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="product-dashboard" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="product-dashboard" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-200 text-base-content">
                    <li className=' p-2'><Link to='/dashboard/myorder'>My Orders</Link></li>
                        {
                            isSeller && <>                                
                                <li className=' p-2'><Link to='/dashboard/productadd'>Add Product</Link></li>
                                <li className=' p-2'><Link to='/dashboard/myproduct/'>My Product</Link></li>
                            </>
                        }
                        {
                            isAdmin && <>
                                <li className=' p-2'><Link to='/dashboard/allseller'>All Seller</Link></li>
                                <li className=' p-2'><Link to='/dashboard/allbuyer'>All Buyer</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;
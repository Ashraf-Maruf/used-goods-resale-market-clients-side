import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import {
    HiBars3BottomRight,
    HiOutlineXMark,
} from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import Logo from '../../Assets/car-logo/car-logo.png'
import './Navbar.css'
const Navbar = () => {    
    const { user, UserSignOut } = useContext(AuthContext);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const handleSingOut = () => {
        UserSignOut()
            .then(() => { 
                navigate('/')
            })
            .catch((error) => {
                console.error(error)
            })

    }

    return (
        <div className=' bg-black w-full'>
            <div className="navbar z-20 px-5">
                <div className="navbar-start relative">
                    <div className='text-center ' onClick={() => setOpen(!open)}>
                        {open ?
                            <span className='open-nav'><HiOutlineXMark /></span> 
                            : 
                            <span className='close-nav'><HiBars3BottomRight /></span>
                        }
                    </div>
                    <div className={`absolute duration-700 ease-out ${open ? 'activeOpen' : 'left-[-999px]'}`}>
                        <ul className=" bg-black text-white menu menu-compact dropdown-content justify-center items-center h-[200px] mt-3 p-2  shadow bg-base-100 rounded-t-none rounded-box w-52" onClick={() => setOpen(!open)}>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/blog'>Blog</Link></li>
                            {user?.uid ?
                                <>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                    <li><button onClick={handleSingOut} to='/login'>SignOut</button></li>
                                </>
                                : <li><Link to='/login'>Login</Link></li>
                            }
                            <label htmlFor="product-dashboard" tabIndex="0" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                            {/* <label htmlFor="product-dashboard">Dashboard Details</label> */}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <img src={Logo} className="h-[30px]" alt='logo'></img>
                    <Link to='/' className="btn btn-ghost normal-case text-xl text-white">Used Car Market</Link>
                </div>
                <div className="navbar-end">
                    <div className="w-10 rounded-full" data-tip={user?.displayName}>
                        {user?.photoURL ?

                            <img className='h-{100px}' src={user?.photoURL} alt='' /> : <span className=' text-white'><FaUser></FaUser></span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
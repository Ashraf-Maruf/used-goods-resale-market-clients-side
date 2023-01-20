import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImg from '../../Assets/NotFound-Img/404-page-logo.jpg'
const NotFound = () => {
    return (
        <div>
            <div className='flex justify-center items-center h-[352px] bg-slate-600'>
                <h1 className=' text-white text-7xl font-bold'>404</h1>
            </div>
            <div className='flex justify-center items-center mt-28'>
                <img src={NotFoundImg} alt='' ></img>
            </div>
            <div className='text-center mb-20'>
                <h3 className=' mt-5 text-5xl font-bold mb-3'>Oops...</h3>
                <p>We can't seem to find the page you'r looking for</p>
                <Link to='/'><button className="btn btn-success mt-4">Back to Home</button></Link>
            </div>
        </div>
    );
};

export default NotFound;
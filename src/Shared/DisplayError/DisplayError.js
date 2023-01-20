import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import NotFoundImg from '../../Assets/NotFound-Img/404-page-logo.jpg'
const DisplayError = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    const { UserSignOut } = useContext(AuthContext);
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
        <div>
            <div className='flex justify-center items-center h-[352px] bg-slate-600'>
                <h1 className=' text-white text-7xl font-bold'>404</h1>
                <p><i>{error.statusText || error.message}</i></p>
            </div>
            <div className='flex justify-center items-center mt-28'>
                <img src={NotFoundImg} alt='' ></img>
            </div>
            <div className='text-center mb-20'>
                <h3 className=' mt-5 text-5xl font-bold mb-3'>Oops...</h3>
                <p>We can't seem to find the page you'r looking for</p>
                <button onClick={handleSingOut}  className="btn btn-success mt-4">Back to Home</button>
            </div>
        </div>
    );
};

export default DisplayError;
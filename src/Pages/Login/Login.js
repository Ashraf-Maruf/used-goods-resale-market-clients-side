import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { IoLogoGoogle } from "react-icons/io5";
import toast from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
import './Login.css'
const Login = () => {
    const { UserLoginIn, googleProviderLogin } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const googleRegister = new GoogleAuthProvider()
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const handleGoogleSingIn = () => {
        googleProviderLogin(googleRegister)
            .then(result => {
                const user = result.user;
                navigate(from, { replace: true });
                toast.success('Login is success')
            })
            .catch(error => console.error(error))
    }
    const handleLogin = event => {
        setLoginError('');
        UserLoginIn(event.email, event.password)
            .then(result => {
                const user = result.user;
                navigate(from, { replace: true });
                setLoginUserEmail(event.email);
            })
            .catch(error => {
                console.log(error.message)
            });
    }
    return (
        <div className='loginback'>
            <div className='h-[800px] my-15 flex justify-center items-center mx-5'>
                <div className="card w-[385px] h-auto bg-base-100 shadow-xl">
                    <div className="card-body flex-grow-0">
                        <h3 className='text-center text-2xl font-normal my-5'>Welcome Back</h3>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <button className='btn btn-success w-full' onClick={handleGoogleSingIn}><span className=' text-white text-3xl'><IoLogoGoogle /></span></button>
                            <div className="divider">OR</div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", {
                                required: { required: true }
                            })} type='email' placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p role="alert">{errors.email?.message}</p>}
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", {
                                required: { required: true },
                                minLength: { value: 6, message: "Password must be 6 characters long" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase number and special characters' }
                            })} type='password' placeholder="Your Password" className="input input-bordered w-full max-w-xs" />
                            {errors.password && <p role="alert" className=' bg-red-500'>{errors.password?.message}</p>}
                            <div className=' mt-2'>
                                <label className="label flex justify-start">
                                    <input {...register("radio", {
                                        required: { required: true }
                                    })} type='radio' value="Seller" data-gtm-form-interact-field-id="0" className="radio checked:bg-red-500" />
                                    <span className="label-text ml-6">Seller</span>
                                </label>
                                <label className="label flex justify-start">
                                    <input {...register("radio", {
                                        required: { required: true }
                                    })} type='radio' value="Buyer" data-gtm-form-interact-field-id="0" className="radio checked:bg-red-500" />
                                    <span className="label-text ml-6">Buyer</span>
                                </label>
                                <label className="label flex justify-start">
                                    <input {...register("radio", {
                                        required: { required: true }
                                    })} type='radio' value="Admin" data-gtm-form-interact-field-id="0" className="radio checked:bg-red-500" />
                                    <span className="label-text ml-6">Admin</span>
                                </label>
                            </div>
                            <input type="submit" value='Get Started' className='btn btn-success mt-4 w-full text-white' />
                        </form>
                        <p className='text-center'>Already have an account?<Link to='/signup' className=' text-secondary ml-4'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
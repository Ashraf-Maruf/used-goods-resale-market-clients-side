import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { IoLogoGoogle } from "react-icons/io5";
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../Hooks/useToken';

const SignUp = () => {
    const { createUser, UserProfile, googleProviderLogin } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [registerError, setRegisterError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const googleRegister = new GoogleAuthProvider()
    const navigate = useNavigate();
    const [token] = useToken(createdUserEmail)
    if (token) {
        navigate('/')
    }

    const handleGoogleSingIn = () => {
        googleProviderLogin(googleRegister)
            .then(result => {
                const user = result.user;
                toast.success('Register is success')
                saveAllUsers(user.displayName, user.email)
                setCreatedUserEmail(user.email)
            })
            .catch(error => console.error(error))
    }

    const handleRegister = (e) => {
        setRegisterError('')
        createUser(e.email, e.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('Register is success')
                const Profile = {
                    displayName: e.name,
                }
                UserProfile(Profile)
                    .then(() => {
                        saveAllUsers(e.name, e.email)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            })
            .catch(error => {
                console.error(error)
                setRegisterError(toast.error('Already Register Your Account'))
            })
    }

    const saveAllUsers = (name, email) => {
        const user = { name, email };
        fetch('https://used-goods-resale-market-server.vercel.app/allseller', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
                console.log(data)
            })
    }

    return (
        <div className='loginback'>
            <div className='h-[800px] flex justify-center items-center mx-5'>
                <div className="card w-[385px] h-auto bg-base-100 shadow-xl">
                    <div className="card-body flex-grow-0">
                        <h3 className='text-center text-2xl font-normal my-5'>Welcome Sign Up</h3>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <button className='btn btn-success w-full' onClick={handleGoogleSingIn}><span className=' text-white text-3xl'><IoLogoGoogle /></span></button>
                            <div className="divider">OR</div>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name")} type='name' placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
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
                            {errors.password && <p role="alert">{errors.password?.message}</p>}
                            <input type="submit" value='Get Started' className='btn btn-success mt-4 w-full text-white' />

                        </form>
                        <p className=' text-center text-xs'>By filling in the form above and clicking the “Get Started” button, you
                            accept and agree to Terms of Service and Privacy Policy.</p>
                        <p className='text-center'>Already have an account?<Link to='login' className=' text-secondary ml-4'>Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
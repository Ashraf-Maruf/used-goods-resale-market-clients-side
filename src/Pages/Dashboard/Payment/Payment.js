import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const product = useLoaderData()
    const {companyName,resalePrice,picture} = product;
    return (
        <div className=' my-10'>
            <div className=' w-1/2 mx-auto'>
                <div className=' text-center mb-6'>
                    <h3 className="text-3xl uppercase font-bold">Payment Product</h3>
                    <div className="overflow-x-auto mt-4">
                        <table className="table w-full">
                            <thead className=' text-center'>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Images</th>
                                    <th>Product Resale Price</th>
                                </tr>
                            </thead>
                            <tbody className=' text-center'>
                                <td>{companyName}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-xl">
                                            <img src={picture} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td>{resalePrice}</td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        product={product}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
import { useQuery } from '@tanstack/react-query';
import React, { useContext, } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider';

const ProductCard = ({ product, setProduct }) => {
    const { user } = useContext(AuthContext);
    const { companyName, picture, resalePrice, originalPrice, year, location, post, sellerName, email } = product;
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img className='h-[250px]' src={picture} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title justify-center">Product Name: {companyName}</h2>
                <p>Original Price: <small>${originalPrice}</small></p>
                <p>Resale Price: <small>${resalePrice}</small></p>
                <p>Seller Name: <small>{sellerName}</small></p>
                <p>Seller Post Date: <small>{post}</small></p>
                <p>Location: <small>{location}</small></p>
                <p>Years of use: <small>{year} Year</small></p>
                <p>Years of use: <small>{email}</small></p>
                <div className="card-actions justify-between mt-5">
                    <Link to='/'><button className="btn">Go to Home Page</button></Link>
                    <>
                        {
                            user?.uid ?
                                <label for="productModal" className="btn"
                                    onClick={() => setProduct(product)}
                                >Buy Now</label>
                                :
                                <Link className="btn btn-outline-primary" to='/Login'>Buy Now</Link>

                        }
                    </>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;
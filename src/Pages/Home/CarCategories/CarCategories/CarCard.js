import React from 'react';
import { Link } from 'react-router-dom';
const CarCard = ({ category }) => {
    const {companyName,images} =category;
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img className='h-[250px]' src={images} alt="Shoes" /></figure>
            <div className="card-body">
                <div className="card-actions justify-between items-center">
                    <h2 className="card-title">Product Name: {companyName}</h2>
                    <Link to={`/products/${companyName}`}><button className="btn btn-primary">All Product</button></Link>
                </div>   
            </div>
        </div>
    );
};

export default CarCard;
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../../Shared/Loading/Loading';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const Products = () => {
    const [product, setProduct] = useState(null)
    const { id } = useParams()
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await fetch(`https://used-goods-resale-market-server.vercel.app/products?companyName=${id}`);
            const data = await res.json();
            return data
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-10/12 mx-auto my-28'>
            <div className='grid lg:grid-cols-3 gap-5'>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}
                        setProduct={setProduct}
                    ></ProductCard>)
                }
            </div>
            {   product &&
                <ProductModal
                    product={product}
                    setProduct={setProduct}
                    refetch={refetch}
                ></ProductModal>
            }
        </div>
    );
};

export default Products;
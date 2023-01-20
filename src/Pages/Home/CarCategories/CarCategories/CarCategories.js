import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../../Shared/Loading/Loading';
import CarCard from './CarCard';
const CarCategories = () => {
    const { data: categories = [],refetch, isLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://used-goods-resale-market-server.vercel.app/categories');
            const data = await res.json();
            return data;
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='my-28'>
            <h1 className='text-center my-10 font-bold uppercase text-3xl'>product categories</h1>
            <div className=' grid lg:grid-cols-3 gap-5'>
                {
                    categories.map(category => <CarCard
                        key={category._id}
                        category={category}
                    >
                    </CarCard> )
                }
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default CarCategories;
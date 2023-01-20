import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import DeleteProduct from '../../../Shared/DeleteProduct/DeleteProduct';
import Loading from '../../../Shared/Loading/Loading';

const AllBuyer = () => {
    const [productDelete, setProductDelete] = useState(null)
    const closeModal = () => {
        setProductDelete(null)
    }
    const { data: allbuyer = [], refetch, isLoading } = useQuery({
        queryKey: ['allbuyer'],
        queryFn: async () => {
            const res = await fetch('https://used-goods-resale-market-server.vercel.app/allbuyer');
            const data = await res.json();
            return data
        }
    })
    const handleProductDelete = product => {
        console.log(product)
        fetch(`https://used-goods-resale-market-server.vercel.app/productbuy/${product._id}`, {

            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Buyer ${product.buyerName} delete successfully`)
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-11/12 mx-auto'>
            <div className='my-20'>
                <div className="overflow-x-auto mt-4">
                    <h1 className=' text-center text-5xl uppercase font-bold mb-9'>Welcome To All My order</h1>
                    <table className="table w-full">
                        <thead className=' text-center'>
                            <tr>
                                <th>Name</th>
                                <th>Product Name</th>
                                <th>Product Images</th>
                                <th>User Phone</th>
                                <th>User Location</th>
                                <th>Delete Product</th>
                            </tr>
                        </thead>
                        <tbody className=' text-center'>
                            {
                                allbuyer &&
                                allbuyer.map((buyer, i) => <tr className="hover"
                                    key={buyer._id}
                                >
                                    <th>{i + 1}</th>
                                    <td>{buyer.buyerName}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={buyer.picture} alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{buyer.phone}</td>
                                    <td>{buyer.buyerLocation}</td>
                                    <td>
                                        < label onClick={() => setProductDelete(buyer)} htmlFor="confirmation-modal" className="btn btn-active" >Delete</label >
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                productDelete && <DeleteProduct
                    title={`Are you sure you want to buyer delete?`}
                    message={`if you delete ${productDelete.buyerName}. lt cannot be undone`}
                    closeModal={closeModal}
                    successDelete={handleProductDelete}
                    modalDate={productDelete}
                    successButtonName="Delete"
                ></DeleteProduct>
            }
        </div>
    );
};

export default AllBuyer;

// https://used-goods-resale-market-server.vercel.app/productBuy
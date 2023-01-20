import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../Shared/Loading/Loading';
import SellerDelete from '../../../Shared/SellerDelete/SellerDelete';
const AllSeller = () => {
    const [productDelete, setProductDelete] = useState(null)
    const closeModal = () => {
        setProductDelete(null)
    }    
    const { data: sellers, refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`https://used-goods-resale-market-server.vercel.app/allseller`);
            const data = await res.json();
            return data
        }
    })

    const handleAddVerify = id => {
        fetch(`https://used-goods-resale-market-server.vercel.app/allseller/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successful.')
                    refetch();                    
                }
                console.log('hello data', data)
            })
    }

    const handleAddAdmin = id => {        
        fetch(`https://used-goods-resale-market-server.vercel.app/admin/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successful.')
                    refetch();          
                }
                console.log('hello data', data)
            })
        if(id) {

        }    
    }
    

    const handleProductDelete = seller => {
        console.log(seller)
        fetch(`https://used-goods-resale-market-server.vercel.app/allseller/${seller._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Seller ${seller.UserName} delete successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-11/12 mx-auto'>
            <div className=' my-20'>
                <h1 className=' text-center text-5xl uppercase font-bold mb-9'>Welcome To All Seller</h1>
                <div className="overflow-x-auto mt-4">
                    <table className="table w-full">
                        <thead className=' text-center'>
                            <tr>
                                <th>Number</th>
                                <th>Seller Name</th>
                                <th>Seller Email</th>
                                {/* <th>Admin Option </th> */}
                                <th>Seller Option </th>
                                <th>Seller Delete</th>
                            </tr>
                        </thead>
                        <tbody className=' text-center'>
                            {
                                sellers &&
                                sellers.map((seller, i) => <tr className="hover"
                                    key={seller._id}
                                >
                                    <th>{i + 1}</th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>                                    
                                    {/* <td>
                                        {seller?.rol !== 'admin' &&
                                            <button onClick={() => handleAddAdmin(seller._id)} disabled className='btn btn-active'>admin</button>                                            
                                        }
                                    </td> */}
                                    <td>                                        
                                        {seller?.rol1 !== 'admin' &&
                                        seller?.rol !== 'verify' ?
                                            <button onClick={() => handleAddVerify(seller._id)} className='btn btn-active'>verified</button>
                                            :
                                            <button className='btn btn-primary'>verify</button>
                                        }
                                    </td>
                                    <td>
                                        <label onClick={() => setProductDelete(seller)} htmlFor="confirmation-modal" className="btn btn-active" >Delete</label >
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                {
                    productDelete && <SellerDelete
                        title={`Are you sure you want to delete?`}
                        message={`if you delete ${productDelete.UserName}. lt cannot be undone`}
                        closeModal={closeModal}
                        successDelete={handleProductDelete}
                        modalDate={productDelete}
                        successButtonName="Delete"
                    ></SellerDelete>
                }
            </div>
        </div>
    );
};

export default AllSeller;
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';
import SellerDelete from '../../../Shared/SellerDelete/SellerDelete';
const MyProduct = () => {
    const { user } = useContext(AuthContext)
    const [myProductDelete, setMyProductDelete] = useState(null)
    const closeModal = () => {
        setMyProductDelete(null)
    }
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://used-goods-resale-market-server.vercel.app/addproduct?email=${user?.email}`,{
                headers:{
                    authorization: ` bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        }
    })
    const handleProductDelete = product => {
        console.log(product)
        fetch(`https://used-goods-resale-market-server.vercel.app/addproduct/${product._id}`, {

            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Product ${product.sellerName} delete successfully`)
                }
            })
    }

    if(isLoading){
        <Loading></Loading>
    }
    return (
        <div className='w-11/12 mx-auto'>
            <div className="overflow-x-auto mt-4">
                <table className="table w-full">
                    <thead className=' text-center'>
                        <tr>
                            <th>Name</th>
                            <th>Product Name</th>
                            <th>Product Images</th>
                            <th>Product Original Price</th>
                            <th>Product Resale Price</th>
                            <th>User Phone</th>
                            <th>User Location</th>
                            <th>Delete Product</th>
                        </tr>
                    </thead>
                    <tbody className=' text-center'>
                        {
                            products &&
                            products.map((product, i) => <tr className="hover"
                                key={product._id}
                            >
                                <th>{i + 1}</th>
                                <td>{product.companyName}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-xl">
                                            <img src={product.picture} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td>${product.originalPrice}</td>
                                <td>${product.resalePrice}</td>
                                <td>{product.phone}</td>
                                <td>{product.location}</td>
                                <td>
                                    < label onClick={() => setMyProductDelete(product)} htmlFor="confirmation-modal" className="btn btn-active" >Delete</label >
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                myProductDelete && <SellerDelete
                    title={`Are you sure you want to delete product?`}
                    message={`if you delete ${myProductDelete.sellerName}. lt cannot be undone`}
                    closeModal={closeModal}
                    successDelete={handleProductDelete}
                    modalDate={myProductDelete}
                    successButtonName="Delete"
                ></SellerDelete>
            }
        </div>
    );
};

export default MyProduct;
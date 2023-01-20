import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import DeleteProduct from '../../../Shared/DeleteProduct/DeleteProduct';
import toast from 'react-hot-toast';
import Loading from '../../../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
const Buyers = () => {
    const [productDelete, setProductDelete] = useState(null)

    const closeModal = () => {
        setProductDelete(null)
    }
    const { user } = useContext(AuthContext);
    const { data: products, refetch,isLoading } = useQuery({
        queryKey: ['product', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://used-goods-resale-market-server.vercel.app/myorder?email=${user?.email}`,{
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
        fetch(`https://used-goods-resale-market-server.vercel.app/productbuy/${product._id}`, {

            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Product ${product.UserName} delete successfully`)
                }
            })
    }

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-11/12 mx-auto'>
            <div className="overflow-x-auto mt-4">
            <h1 className=' text-center text-5xl uppercase font-bold mb-9'>Welcome To All My order</h1>
                <table className="table w-full">
                    <thead className=' text-center'>
                        <tr>
                            <th>Item</th>
                            <th>Product Name</th>
                            <th>Product Images</th>
                            <th>Product Resale Price</th>
                            <th>Payment</th>
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
                                <td>${product.resalePrice}</td>
                                <td>
                                    {
                                        product.resalePrice && !product.paid && 
                                       <Link to={`/dashboard/payment/${product._id}`}>
                                         <button className="btn btn-active" >Pay</button>
                                       </Link>
                                    }
                                    {
                                        product.resalePrice && product.paid && 
                                        <button className="btn btn-active" >Paid</button>
                                    }
                                </td>
                                <td>
                                    < label onClick={() => setProductDelete(product)} htmlFor="confirmation-modal" className="btn btn-active" >Delete</label >
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                productDelete && 
                <DeleteProduct
                    title={`Are you sure you want to delete product?`}
                    message={`if you delete ${productDelete.UserName}. lt cannot be undone`}
                    closeModal={closeModal}
                    successDelete={handleProductDelete}
                    modalDate={productDelete}
                    successButtonName="Delete"
                ></DeleteProduct>
            }
        </div>
    );
};

export default Buyers;
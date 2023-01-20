import React, { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
const ProductModal = ({ product,refetch,setProduct }) => {
    const { companyName, resalePrice, originalPrice,picture} = product;
    const { user } = useContext(AuthContext);
    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;        
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const location = form.location.value;
        console.log(location,name,phone,email)

        const product = {
            originalPrice: originalPrice,
            resalePrice: resalePrice,
            buyerName: name,
            buyerLocation:location,
            companyName:companyName,
            picture:picture,
            phone,
            email,
        }        

        fetch('https://used-goods-resale-market-server.vercel.app/productbuy',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data =>{
                if(data.acknowledged){
                    toast.success('Your product buy success')                    
                    setProduct(null)
                    refetch()
                }
                else{
                    toast.error('Oops! Sorry Your product already buy success')  
                }
            })  
    }
    return (
        <div>
            <input type="checkbox" id="productModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <h3 className=' text-center text-3xl uppercase font-bold mb-3'>Product Buy</h3>
                    <label htmlFor="productModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking} className=' grid grid-cols-1 lg:grid-cols-1 gap-5'>
                        <label className="label"><span className="label-text">Product Name</span></label>
                        <input name='itemName' type="text" disabled defaultValue={companyName} placeholder="Email" className="input input-bordered input-md w-full" readOnly />
                        <label className="label"><span className="label-text">Product Original Price</span></label>
                        <input name='price' type="text" disabled defaultValue={originalPrice} placeholder="Email" className="input input-bordered input-md w-full" readOnly />
                        <label className="label"><span className="label-text">Product Resale Price</span></label>
                        <input name='price' type="text" disabled defaultValue={resalePrice} placeholder="Email" className="input input-bordered input-md w-full" readOnly />
                        <label className="label"><span className="label-text">User Name*</span></label>
                        <input name='name' type="text" disabled defaultValue={user?.displayName} placeholder="Email" className="input input-bordered input-md w-full" readOnly />
                        <label className="label"><span className="label-text">User Phone Number*</span></label>
                        <input name='phone' type="text"  placeholder="Phone Number" className="input input-bordered input-md w-full" required />
                        <label className="label"><span className="label-text">User Email*</span></label>
                        <input name='email' type="text" disabled defaultValue={user?.email} placeholder="Email" className="input input-bordered input-md w-full" required />
                        <label className="label"><span className="label-text">User Location</span></label>
                        <input name='location' type="text" placeholder="Your Location" className="input input-bordered input-md w-full" required />
                        <input type="submit" value='Submit' className="btn btn-primary text-white w-full" />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default ProductModal;
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate()
    const handleAddProduct = add => {
        console.log(add.category)
        const image = add.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData) {
                    const product = {
                        sellerName: add.name,
                        companyName: add.category,
                        originalPrice: add.originalPrice,
                        resalePrice: add.resaleprice,
                        picture: imgData.data.url,
                        phone: add.phone,
                        post: add.postdete,
                        location: add.location,
                        year: add.year,
                        email: add.email
                    }
                    fetch('https://used-goods-resale-market-server.vercel.app/addproduct', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Your product buy success')
                                navigate('/dashboard/myproduct')
                            }
                        })
                }
            })
    }
    return (
        <div className='w-10/12 mx-auto flex justify-center'>
            <div className=' h-[900px] mx-5 mt-12 mb-52'>
                <h2 className=' text-center text-5xl uppercase font-bold mb-9'>Welcome to product add</h2>
                <div className=' flex justify-center'>
                    <div className="card mb-20 w-[400px] h-auto bg-base-100 shadow-xl">
                        <div className="card-body flex-grow-0">
                            <h3 className='text-center text-2xl font-normal'>Product Add</h3>
                            <form onSubmit={handleSubmit(handleAddProduct)}>
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input {...register("name")}
                                    type='text'
                                    placeholder="Product Name"
                                    className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                    <span className="label-text">Your Email</span>
                                </label>
                                <input {...register("email", {
                                    required: { required: true }

                                })} type='email' placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input {...register("phone", {
                                    minLength: { value: 11, message: "Phone number must be 11 characters " },
                                })} type='text' placeholder="Your Phone Number" className="input input-bordered w-full max-w-xs" />
                                {errors.email && <p role="alert">{errors.email?.message}</p>}
                                <label className="label">
                                    <span className="label-text">Product Categories</span>
                                </label>
                                <select className="select select-bordered w-full" {...register("category")}>
                                    <option value="Toyota">Toyota</option>
                                    <option value="Honda">Honda</option>
                                    <option value="Nissan">Nissan</option>
                                </select>
                                <label className="label">
                                    <span className="label-text">Original Price</span>
                                </label>
                                <input {...register("originalPrice", {
                                    required: "Email Address is required"
                                })} type='text' placeholder="Original Price" className="input input-bordered w-full max-w-xs" />
                                {errors.email && <p role="alert">{errors.email?.message}</p>}
                                <label className="label">
                                    <span className="label-text">Resale Price</span>
                                </label>
                                <input {...register("resaleprice")}
                                    type='text'
                                    placeholder="Resale Price"
                                    className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                    <span className="label-text">Post Date</span>
                                </label>
                                <input {...register("postdete")}
                                    type='date'
                                    placeholder="Resale Price"
                                    className="input input-bordered w-full max-w-xs" />
                                <div className="form-control w-full max-w-xs mb-3">
                                    <label className="label"> <span className="label-text">Photo</span></label>
                                    <input type="file" {...register("image", {
                                        required: "Photo is Required"
                                    })} className="input input-bordered w-full max-w-xs" />
                                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                                </div>                                
                                <label className="label">
                                    <span className="label-text">Used of year</span>
                                </label>
                                <input {...register("year")}
                                    type='text'
                                    placeholder="Year"
                                    className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input {...register("location")}
                                    type='text'
                                    placeholder="location"
                                    className="input input-bordered w-full max-w-xs mb-4" />
                                <input type="submit" value='Add' className='btn btn-primary w-full text-white' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
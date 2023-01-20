import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlickSlider.css'
import { HiChevronRight,HiChevronLeft } from "react-icons/hi2";
import banner from './Banner';
const SlickSlider = () => {
    const PreviousBtn = (props) => {
        // console.log(props);
        const { className, onClick} = props;
        return (

            <div className={className} onClick={onClick}>                
                <span className='hidden md:hidden xl:block lg:block text-white text-3xl'><HiChevronLeft /></span>
            </div>

        );
    };
    const NextBtn = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <span className='hidden md:hidden xl:block lg:block text-white text-3xl'><HiChevronRight /></span>
            </div>
        );
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />
    };
    return (
        <div className=' overflow-hidden'>
            <Slider {...settings}>
                {
                    banner.map(item => <div key={item.id}>
                         <div className='relative z-10'>
                            <img className='relative w-full h-auto lg:h-[700px]' src={item.Img} alt=''></img>
                            <div className='absolute top-0 left-0 w-[100%] h-[100%] flex justify-center items-center'>
                                <div className='text-center'>
                                    <h1 className=' mb-6 text-1xl lg:text-5xl xl:text-5xl text-white uppercase font-black'>{item.title}</h1>
                                    <h4 className=' hidden md:block lg:block mb-6 tracking-widest text-white text-sm font-bold'>{item.para1}<br/>{item.para2}</h4>
                                    <button className='btn btn-primary text-lg text-sm'>Start Now</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
                
            </Slider>
        </div>
    );
};

export default SlickSlider;
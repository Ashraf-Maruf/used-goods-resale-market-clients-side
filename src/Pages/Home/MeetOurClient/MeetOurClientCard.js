import React from 'react';
import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io5";
const MeetOurClientCard = ({ OurClient }) => {
    const { name, img, productbuy, location } = OurClient;
    const openInNewTab = url => {
        window.open(url, '_blank');
    };
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={img} className="w-full h-[300px]" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Buyer Name:- {name}</h2>
                    <p>Product Buy:- {productbuy}</p>
                    <p>Location:- {location}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => openInNewTab('https://www.google.com')}>
                            <div className="badge badge-outline"><span><IoLogoFacebook /></span></div>
                        </button>
                        <button onClick={() => openInNewTab('https://www.google.com')}>
                            <div className="badge badge-outline"><span><IoLogoTwitter /></span></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetOurClientCard;
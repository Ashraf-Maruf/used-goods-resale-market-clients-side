import React from 'react';
import Img1 from '../../../Assets/Our-client/client-img1.png'
import Img2 from '../../../Assets/Our-client/client-img2.jpg'
import Img3 from '../../../Assets/Our-client/client-img3.jpg'
import MeetOurClientCard from './MeetOurClientCard';
const MeetOurClient = () => {
    const OurClientData = [
        {
            id: 1,
            name: "Rafi",
            img: Img1,
            productbuy:"Honda",
            location:"Mymensingh"
        },
        {
            id: 2,
            name: "Sharif",
            img: Img2,
            productbuy:"Nissan",  
            location:"Barishal"
            
        },
        {
            id: 3,
            name: "Farhad",
            img: Img3,
            productbuy:"Toyota",
            location:"Rajshahi",
        }
    ]
    return (
        <div className=' my-28'>
            <h1 className=' text-center my-10 font-bold uppercase text-3xl'>Meet Our Client</h1>
            <div className=' grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                {
                    OurClientData.map(OurClient => <MeetOurClientCard
                        key={OurClient.id}
                        OurClient={OurClient}
                    ></MeetOurClientCard>)
                }
            </div>
        </div>
    );
};

export default MeetOurClient;
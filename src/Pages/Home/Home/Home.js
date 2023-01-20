import React from 'react';
import CarCategories from '../CarCategories/CarCategories/CarCategories';
import MeetOurClient from '../MeetOurClient/MeetOurClient';
import SlickSlider from '../SlickSlider/SlickSlider';

const Home = () => {
    return (
        <div>
            <SlickSlider></SlickSlider>
            <div className='w-10/12 mx-auto'>
                <CarCategories></CarCategories>
                <MeetOurClient></MeetOurClient>
            </div>
        </div>
    );
};

export default Home;
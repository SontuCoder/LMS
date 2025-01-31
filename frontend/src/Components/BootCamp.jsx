import React from 'react';
import Img from '../assets/image.png';

const ImageOverlayCard = () => {
    return (
        <div
            className="relative h-50 w-full bg-cover mb-4"
            style={{ backgroundImage: `url(${Img})` }}
        >
            
            <div className="w-full h-full overlay">
                <div className="bg-purple-500 w-30 h-30 relative left-[20%] top-[20%]">
                    <div className="">Future Bootcamp</div>
                    Ournext bootcamp plane
                </div>
            </div>
        </div>
    );
};

export default ImageOverlayCard;

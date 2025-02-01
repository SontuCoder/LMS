import React from 'react';
import Img from '../assets/image.png';

const ImageOverlayCard = () => {
    return (
        <div
            className="relative h-50 w-full bg-cover bg-center mb-4 md:h-70 lg:h-100"
            style={{ backgroundImage: `url(${Img})` }}
        >
            
            <div className="w-full h-full overlay">
                <div className="bg-purple-500 w-30 h-30 relative left-[10%] top-[20%] rounded-sm shadow-xl shadow-slate-900 md:left-[20%] md:w-40 md:h-40 lg:h-50 lg:w-50 ">
                    <div className="bg-[#ff8400] text-[10px] w-fit px-2 rounded-r-lg absolute mt-2 -left-1 font-bold md:px-4 md:py-1 md:text-sm">Future Bootcamp  
                    </div>
                    <span className="relative top-5 text-sm font-bold inline-block m-2 leading-4 md:top-10">Our next bootcamp plane</span>
                </div>
            </div>
        </div>
    );
};

export default ImageOverlayCard;

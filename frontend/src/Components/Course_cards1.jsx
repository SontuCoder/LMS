import React from 'react';
import Cur from '../assets/image.png'
import PropTypes from 'prop-types';
import { prototype } from 'postcss/lib/input';

const CourseCard = ({ imageUrl, title, description, price, discount }) => {
    return (
        <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white relative sm:w-[300px] m-2">
            {/* Discount Tag */}
            {discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                    {discount} OFF
                </div>
            )}

            {/* Course Image */}
            <div className="relative w-full">
                <img className="w-full h-[180px] object-cover" src={Cur} alt={title} />

                {/* Shape Divider */}
                <div className="absolute -bottom-0.5 left-0 w-full h-[30px] overflow-hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                        className="absolute w-full h-full"
                    >
                        {/* Light Opacity Layer */}
                        <path
                            fill="rgba(225, 225, 225, 1)" 
                            d="M0,256L1440,128L1440,320L0,320Z"
                        ></path>
                        <path
                            fill="rgba(225, 225, 225, 0.5)" 
                            d="M0,160L1440,0L1440,320L0,320Z"
                        ></path>
                        <path
                            fill="rgba(225, 225, 225, 0.5)" /* Light Purple */
                            d="M0,800L1440,900L1440,500L0,40Z"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Course Details */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>

            {/* Price and Action Button */}
            <div className="px-6 pt-2 pb-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">${price}</span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Enroll Now
                </button>
            </div>
        </div>
    );
};

CourseCard.PropTypes = {
    imageUrl: prototype.String,
    title:prototype.String,
    description:prototype.String,
    price:prototype.String,
    discount:prototype.String
}

export default CourseCard;

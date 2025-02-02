import React from 'react';
import Home_img from "../assets/logo.jpg";

const ReviewCard = ({ avatarUrl, name = "Sontu", rating=4, review ="Very good" }) => {
    // Function to render stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`${i <= rating ? 'text-yellow-400' : 'text-white'} `}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="rounded-lg overflow-hidden shadow-[0px_0px_10px_3px_var(--st)] review-card p-2 w-full max-w-100 m-2 sm:w-[45%] lg:w-[30%] cursor-pointer bottom-up">

            {/* User Avatar and Name */}
            <div className="flex items-center space-x-4 mb-2">
                <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={Home_img}
                    alt={name}
                />
                <div className=''>
                    <div className="font-bold text-lg flex text-wrap">{name}
                    <span className="ml-3 flex items-center space-x-1">
                        {renderStars(rating)}
                    </span>
                    </div>
                    <p className="text-[var(--st)] text-base font-semibold">{review}</p>
                </div>
            </div>

        </div>
    );
};

export default ReviewCard;
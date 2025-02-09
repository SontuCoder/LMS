import React from 'react';
import Img from "../assets/image.png";

const Course_card2 = () => {

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`${i <= rating ? 'text-yellow-500' : 'text-gray-300'} `}>
                    ★
                </span>
            );
        }
        return stars;
    };

    const cropName = (name, type)=>{
        if(name.length>17 && type==="name"){
            name = `${name.slice(0,17)}...`
        } else if(name.length>20 && type==="teacher"){
            name = `${name.slice(0,20)}...`
        }
        return name;
    }

    return (
        <div className='drop-shadow-lg mb-3 w-full flex p-2 gap-4 bg-[#f2f2f2] rounded-sm'>
            <div className="course-img w-20 h-20">
                <img src={Img} alt="" className=" w-full h-full object-cover" />
            </div>
            <div className="course-right">
                <div className="course-right-upper">
                    <h3 className="font-bold text-xl leading-5">{cropName("Full stack Developer","name")}</h3>
                    <p className=" text-sm font-semibold text-[var(--st)]">
                        {cropName("By: Subhadip Maity","teacher")}
                    </p>
                    <div className="rating mt-1">
                        <span className="text-sm font-semibold text-amber-600">4.7</span>
                        <span className="">
                            {renderStars(4)}
                        </span>
                    </div>
                    <p className="font-semibold mb-1">₹{599}</p>
                </div>
                <div className="course-right-lower">
                    <button className='bg-[var(--pa)] hover:bg-[var(--pa-hover)] cursor-pointer w-full my-1 rounded-2xl font-semibold text-md text-white py-1 transform transition-all duration-200 ease-in-out active:scale-95 hover:scale-105'>Enrol</button>
                </div>
            </div>
        </div>
    )
}

export default Course_card2
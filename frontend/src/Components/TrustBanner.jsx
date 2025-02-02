import React from "react";
import { Link } from "react-router-dom";
import User from '../assets/logo.jpg'


export default function TrustBanner() {
    return (
        <div className="py-1 flex flex-col sm:flex-row items-start gap-2">
            <div className="flex pr-5 -space-x-3 sm:-space-x-5 ">
                <img className="w-8 h-8 rounded-full border-2 border-white" src={User} alt="User 1" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src={User} alt="User 2" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src={User} alt="User 3" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src={User} alt="User 4" />
            </div>
            <p className="text-sm text-[var(--pt)]">
                <span className="font-medium">500K+</span> People already trusted us 
            <Link
                href="/courses"
                className="text-md font-extrabold text-[var(--span)] transition-colors ml-1 cursor-pointer"
            >
                --{">"} View Courses
            </Link>
            </p>
        </div>
    )
}


import React from 'react';
import { Link } from 'react-router-dom';
import User from "../assets/logo.jpg";

const ContactCard = () => {
    return (
        <div className="contactCard top-border flex items-center justify-between sm:justify-center p-6 max-w-3xl mx-auto gap-4 ">
            {/* User Avatars */}
            <div className="flex -space-x-5 sm:-space-x-2 left-up">
                <img className="w-12 h-12 rounded-full border-2 border-white" src={User} alt="User 1" />
                <img className="w-12 h-12 rounded-full border-2 border-white" src={User} alt="User 2" />
                <img className="w-12 h-12 rounded-full border-2 border-white" src={User} alt="User 3" />
                <img className="w-12 h-12 rounded-full border-2 border-white" src={User} alt="User 4" />
            </div>

            <div className="flex flex-col ml-15 sm:flex-row ">
            <div className='sm:mr-10 bottom-up'>
                <h3 className="text-xl font-bold text-[var(--pt)]">Need help?</h3>
                <p className="text-sm font-bold text-[var(--st)]">Contact our team anytime for assistance.</p>
            </div>

            <Link className="bg-[var(--pa)] hover:bg-[var(--pa-hover)] font-bold h-10 px-4 py-2 rounded-lg shadow-md w-[80%] max-w-300px mt-5 sm:mt-3 transform transition-all duration-200 ease-in-out active:scale-95 hover:scale-105 text-[var(--pt)] cursor-pointer flex items-center justify-center right-up">
                Contact
            </Link>
            </div>
        </div>
    )
}

export default ContactCard
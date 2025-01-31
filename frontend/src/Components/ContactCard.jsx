import React from 'react';
import User from "../assets/logo.jpg";

const ContactCard = () => {
    return (
        <div className="contactCard flex items-center justify-between sm:justify-center text-white p-6 max-w-3xl mx-auto">
            {/* User Avatars */}
            <div className="flex -space-x-5 sm:-space-x-2">
                <img className="w-12 h-12 rounded-full border-2 border-white" src={User} alt="User 1" />
                <img className="w-12 h-12 rounded-full border-2 border-white" src={User} alt="User 2" />
                <img className="w-12 h-12 rounded-full border-2 border-white" src={User} alt="User 3" />
                <img className="w-12 h-12 rounded-full border-2 border-white" src={User} alt="User 4" />
            </div>

            <div className="flex flex-col ml-15 sm:flex-row ">
            <div className='sm:mr-10'>
                <h3 className="text-lg font-semibold">Need help?</h3>
                <p className="text-sm text-gray-300">Contact our team anytime for assistance.</p>
            </div>

            <button className="bg-purple-500 hover:bg-purple-600 text-white h-10 px-4 py-2 rounded-lg shadow-md transition w-[50%] mt-5 sm:mt-3">
                Contact
            </button>
            </div>
        </div>
    )
}

export default ContactCard
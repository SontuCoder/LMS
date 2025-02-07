import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import user1 from '../assets/logo.jpg';
import user2 from '../assets/image.png';
import PropTypes from 'prop-types';

const UserIcon = ({ isLogin, onLogout }) => {
    const [iconOpen, setIconOpen] = useState(false);

    const iconClick = () => {
        setIconOpen((prev) => !prev);
    };

    const Logout = () => {
        setIconOpen((prev) => !prev);
        onLogout();
    }

    return (
        <>
            <div className="relative flex justify-center">
                <button className="logo cursor-pointer w-10" onClick={iconClick}>
                    <img
                        src={isLogin ? user1 : user2}
                        alt="logo"
                        className="rounded-full max-h-[100px] ring-1 shadow-[0_0_10px_rgba(255,255,255,0.6)] hover:scale-110 transition-all duration-200 ease-in-out active:scale-95"
                        width={40}
                        height={40}
                    />
                </button>

                <div
                    className={`w-30 rounded-sm bg-[#332c49] absolute top-10 right-0 ring-1 font-semibold flex flex-col justify-evenly items-center py-2 gap-2 transition-all duration-200 ease-in-out ${iconOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-90 invisible"
                        }`}
                >
                    {isLogin? <>
                        <Link className="text-zinc-50/50 hover:text-zinc-50 cursor-pointer transition-all duration-300 ease-in-out active:scale-95">
                            Profile
                        </Link>
                        <button className="text-zinc-50/50 hover:text-zinc-50 cursor-pointer transition-all duration-300 ease-in-out active:scale-90" onClick={Logout} >
                            Logout
                        </button>
                    </> : <>
                    <Link className="text-zinc-50/50 hover:text-zinc-50 cursor-pointer transition-all duration-300 ease-in-out active:scale-95" to="/login_signup">
                            Login
                        </Link>
                    </>}
                </div>

            </div>
        </>
    );
};

UserIcon.propTypes ={
    isLogin: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default UserIcon;

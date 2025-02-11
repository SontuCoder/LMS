import React, {useState, useEffect} from 'react';
import logo from '../assets/logo.jpg';
import Navbar from '../Components/Navbar';
import UserIcon from '../Components/UserIcon';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({isLogin,onLogout}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === "/";
    const [navOpen, setNavOpen] = useState(false);

    const [mode, setMode] = useState(() => localStorage.getItem("data-theme") === "dark");

    useEffect(() => {
        document.querySelector("body").setAttribute("data-theme", mode ? "dark" : "light");
    }, [mode]);

    const modeChange = (e) => {
        e.stopPropagation();
        setMode((prevMode) => {
            const newMode = !prevMode;
            document.querySelector("body").setAttribute("data-theme", newMode ? "dark" : "light");
            localStorage.setItem("data-theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    return (
        <header className='fixed top-0 left-0 w-full h-16 flex items-center z-40'>
            <div className=" headerdiv max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-8">

                <h1>
                    <a href="/" className='logo'>
                        <img src={logo} alt="logo" className='rounded-xl ring-1 shadow-[0_0_10px_rgba(255,255,255,0.6)] hover:scale-110 transition-all duration-200 ease-in-out' width={40} height={40} />
                    </a>
                </h1>

                <div className="flex items-center gap-4">
                {isHome? <div className=" w-[100%] relative flex justify-end ml:auto">
                    <button 
                        className='menu-button' 
                        onClick={()=>setNavOpen(!navOpen)}
                    >
                        <span className='material-symbols-rounded text-slate-200 '>
                            {navOpen? 'close' : 'menu'}
                        </span>
                    </button>

                    <Navbar navOpen={navOpen} setNavOpen={setNavOpen}/>
                </div>: <div></div>}

                <div className="flex justify-end">
                    <button
                        className='modeBtn text-2xl pt-1'
                        onClick={modeChange}
                    >
                        <span className="material-symbols-rounded cursor-pointer active:scale-95  transition-all duration-150 ease-in-out" 
                        >
                            {!mode? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                </div>

                <UserIcon isLogin={isLogin} onLogout={onLogout}/>
                </div>

            </div>
        </header>
    );
};

Header.propTypes ={
    isLogin: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default Header;
import React, {useState, useEffect} from 'react';
import logo from '../assets/logo.jpg';
import Navbar from '../Components/Navbar';

const Header = () => {

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
            <div className=" headerdiv max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-8 md:grid">

                <h1>
                    <a href="/" className='logo'>
                        <img src={logo} alt="logo" className='rounded-xl ring-1 shadow-[0_0_10px_rgba(255,255,255,0.6)] hover:scale-110 transition-all duration-200 ease-in-out' width={40} height={40} />
                    </a>
                </h1>

                <div className=" w-[100%] relative flex justify-end ml:auto">
                    <button 
                        className='menu-button' 
                        onClick={()=>setNavOpen(!navOpen)}
                    >
                        <span className='material-symbols-rounded text-slate-200 '>
                            {navOpen? 'close' : 'menu'}
                        </span>
                    </button>

                    <Navbar navOpen={navOpen} setNavOpen={setNavOpen}/>
                </div>

                <div className="flex justify-end">
                    <button
                        className='modeBtn text-2xl'
                        onClick={modeChange}
                    >
                        <span className="material-symbols-rounded cursor-pointer active:scale-95  transition-all duration-150 ease-in-out" 
                        >
                            {!mode? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                </div>

                <div className="">
                <a href="/" className='logo'>
                        <img src={logo} alt="logo" className='rounded-full ring-1 shadow-[0_0_10px_rgba(255,255,255,0.6)]  hover:scale-110 transition-all duration-200 ease-in-out' width={40} height={40} />
                    </a>
                </div>

            </div>
        </header>
    );
};

export default Header;
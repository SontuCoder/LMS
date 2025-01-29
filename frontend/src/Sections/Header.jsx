import React, {useState} from 'react';
import logo from '../assets/logo.jpg';
import Navbar from '../Components/Navbar';

const Header = () => {

    const [navOpen, setNavOpen] = useState(false);


    return (
        <header className='fixed top-0 left-0 w-full h-16 flex items-center z-40 bg-[#181822] border-b border-white'>
            <div className=" headerdiv max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-8 md:grid">

                <h1>
                    <a href="/" className='logo'>
                        <img src={logo} alt="logo" width={40} height={40} />
                    </a>
                </h1>

                <div className="  w-[100%] relative flex justify-end ml:auto">
                    <button 
                        className='menu-button' 
                        onClick={()=>setNavOpen(!navOpen)}
                    >
                        <span className='material-symbols-rounded text-slate-200 '>
                            {navOpen? 'close' : 'menu'}
                        </span>
                    </button>

                    <Navbar navOpen={navOpen}/>
                </div>

                <div className="flex justify-end">
                    <button
                        className='text-slate-200'
                        onClick={null}
                    >
                        <span className="material-symbols-rounded">
                            light_mode
                        </span>
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;
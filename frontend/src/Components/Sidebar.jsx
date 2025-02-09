import React,{useState} from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';


const navlinks = [
    {
        path:"/",
        name: "Home",
        icon: "back_arrow"
    }
]

const Sidebar = () => {
    const [isOpen, setisOpen] = useState(false);

    const toggleNavopen = ()=>setisOpen(!isOpen);

    return (
        <div className="main-container">
            <motion.div animate={{ width: isOpen? "200px" : "45px"}}
                transition={{ type: "spring", stiffness: 800, damping: 25, bounce: 1 }}
            style={{ transition: "none" }}
            className=' sidebar bg-[var(--header_bg)] text-zinc-50/50 hover:text-zinc-50 h-screen px-4 pt-8'>
            <div className="profile_nav_top flex justify-end w-full">
                <span className="material-symbols-rounded text-slate-200 " onClick={()=>toggleNavopen()}>{isOpen? "close" : "menu"}</span>
            </div>
            <div className="links">
                {navlinks.map(({path, name, icon},key)=>(
                    <NavLink to={path} key={key}>{isOpen && name}</NavLink>
                ))}
            </div>
            </motion.div>
        </div>
    )
}

export default Sidebar
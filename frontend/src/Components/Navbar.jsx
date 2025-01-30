import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';



const Navbar = ({navOpen, setNavOpen}) => {
    
    const lastActiveLink = useRef(null);
    const activeBox = useRef(null);

    const initActiveBox = () => {
        if (lastActiveLink.current && activeBox.current) {
            activeBox.current.style.top = `${lastActiveLink.current.offsetTop}px`;
            activeBox.current.style.left = `${lastActiveLink.current.offsetLeft}px`;
            activeBox.current.style.width = `${lastActiveLink.current.offsetWidth}px`;
            activeBox.current.style.height = `${lastActiveLink.current.offsetHeight}px`;
        }
    };

    const activeCurrentLink = (e) => {
        if (lastActiveLink.current) {
            lastActiveLink.current.classList.remove('active'); 
        }
        e.target.classList.add('active');
        lastActiveLink.current = e.target;

        if (activeBox.current) {
            activeBox.current.style.top = `${e.target.offsetTop}px`;
            activeBox.current.style.left = `${e.target.offsetLeft}px`;
            activeBox.current.style.width = `${e.target.offsetWidth}px`;
            activeBox.current.style.height = `${e.target.offsetHeight}px`;
        }
        setTimeout(()=>{
            setNavOpen(false);
        },500);
    }

    useEffect(() => {
        initActiveBox();
    },[]);

    window.addEventListener('resize', initActiveBox);

    const navItems = [
        {
            label: 'Home',
            link: '#home',
            className: 'nav-link active',
            ref: lastActiveLink
        },
        {
            label: 'Courses',
            link: '#courses',
            className: 'nav-link'
        },
        {
            label: 'Reviews',
            link: '#Reviews',
            className: 'nav-link'
        },
        {
            label: 'FAQ',
            link: '#FAQ',
            className: 'nav-link'
        },
        {
            label: 'Contact',
            link: '#contact',
            className: 'nav-link'
        }
    ];

    return (
        <nav className={`navbar ${navOpen? 'active' : ''}`}>
            {
            navItems.map(({label, link, className, ref},key)=> (
                <a 
                    href={link} 
                    key={key}
                    className={className} 
                    ref={key === 0 ? lastActiveLink : null}
                    onClick={(e) => {activeCurrentLink(e)}}
                >
                    {label}
                </a>
            ))}

            <div className="active-box"
                ref={activeBox}>
            </div>
        </nav>
    )
}


Navbar.propTypes = {
    navOpen: PropTypes.bool.isRequired,
    setNavOpen: PropTypes.func.isRequired
}

export default Navbar
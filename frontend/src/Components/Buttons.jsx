import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Button1 = ({ href, lable }) => {
    const navigate = useNavigate();

    const handleBtnClick = ()=>{
        navigate(href);
    }

    return (
        <a className="btn1 text-white bg-[var(--search)] zoom-up" onClick={()=>handleBtnClick()}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
                {lable}
            <p className='material-symbols-rounded relative left-5 sm:left-28 md:left-32 top-2 active:scale-95'>search</p>
        </a>
    )
}

Button1.proTypes = {
    herf : PropTypes.string.isRequired,
    lable : PropTypes.string.isRequired,
}


import React from 'react';
import PropTypes from 'prop-types';

export const Button1 = ({ href, lable, bg_color, color }) => {
    return (
        <a className={`btn1`}  style={{ backgroundColor: bg_color, color: color }} href={href}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
                {lable}
            <p className='material-symbols-rounded relative left-15 top-2'>search</p>
        </a>
    )
}

Button1.proTypes = {
    herf : PropTypes.string.isRequired,
    lable : PropTypes.string.isRequired,
    bg_color : PropTypes.string.isRequired,
    color : PropTypes.string.isRequired,

}


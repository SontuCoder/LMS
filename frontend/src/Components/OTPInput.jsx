import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const OTPInput = ({ length = 4, onComplete, correctOTP, shake }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        // allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // submit trigger
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) onComplete(combinedOtp);

        // Move to next input if current field is filled
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        // optional
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            // Move focus to the previous input field on backspace
            inputRefs.current[index - 1].focus();
        }
    };



    return (
        <div className="flex space-x-2 my-4  justify-evenly">
            {otp.map((value, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={value}
                    maxLength="1"
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onClick={(e) => handleClick(e)}
                    className={` w-12 h-12 text-center border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-slate-400 font-semibold text-lg focus:bg-slate-300 ${correctOTP? "":"border-red-600"} ${shake? "":"shake"}`}

                />
            ))}
        </div>
    );
};

OTPInput.propTypes = {
    onComplete: PropTypes.func.isRequired,
    correctOTP: PropTypes.bool.isRequired,
    shake: PropTypes.bool.isRequired
}

export default OTPInput;

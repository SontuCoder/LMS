import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import OTPInput from '../Components/OTPInput';

import I1 from '../assets/img/white-outline.png';
import I2 from '../assets/img/cloud.png';
import I3 from '../assets/img/coin.png';
import I4 from '../assets/img/dots.png';
import I5 from '../assets/img/rocket.png';
import I6 from '../assets/img/spring.png';
import I7 from '../assets/img/stars.png';

const LoginSignup = ({ onLogin }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [loginPage, setLoginPage] = useState(true);
    const [otpPage, setOtpPage] = useState(false);
    const [correctOTP, setcorrectOTP] = useState(true);
    const [shake, setShake] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const onLoginSubmit = (data) => {
        onLogin(data.email);
        navigate('/');
    };

    const onSignupSubmit = (data) => {
        console.log(data);
        setOtpPage(true);
    };

    const onComplete =(e)=>{
        setcorrectOTP(false);
        setShake(true);

        console.log(e);
        setTimeout(()=>{
            setShake(false);
        },300)
    }

    return (
        <div className="login-background flex items-center justify-center px-0 py-20 bg-no-repeat bg-cover min-h-screen bg-center">
            <div className="login-form-container flex max-w-[90%] border-1 border-[var(--st)] overflow-hidden">
                <AnimatePresence mode="wait">
                    <div className="login-left sm:flex items-center justify-center flex-col hidden sm:visible w-[55%] bg-[rgba(255,255,255,0.2)]">
                        <div className="relative">
                            <img src={I4} className="form-img dots absolute left-0 w-[400px]" />
                            <img src={I3} className="form-img coin absolute left-0 w-[400px]" />
                            <img src={I5} className="form-img roket absolute left-0 w-[400px]" />
                            <img src={I2} className="form-img cloud absolute left-0 w-[400px]" />
                            <img src={I6} className="form-img spring absolute left-0 w-[400px]" />
                            <img src={I7} className="form-img stars absolute left-0 w-[400px]" />
                            <img src={I1} className="form-img main w-[400px]" />
                        </div>
                        <p>You are Few Minutes Away To Boost Your Skills With <span className="">GenZTechno</span></p>
                    </div>

                    <div className="login-right w-full sm:w-[50%]">
                        <AnimatePresence mode="wait">
                            {!otpPage ? (
                                <motion.div
                                    key={loginPage ? "login-form" : "signup-form"}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    {loginPage ? (
                                        <div className="max-w-sm mx-auto p-6 h-full">
                                            <h2 className="relative text-3xl font-bold text-center mb-10">
                                                <span className='absolute left-0 top-1 cursor-pointer' onClick={() => navigate('/')}>
                                                    <i className='bx bx-left-arrow-alt'></i>
                                                </span>
                                                Login
                                            </h2>
                                            <form onSubmit={handleSubmit(onLoginSubmit)} className='w-full flex flex-col justify-center items-center'>
                                                <div className="mb-4">
                                                    <label htmlFor="email" className="block text-lg font-medium mb-2">
                                                        <i className='bx bxs-user-circle icon relative top-0.5'></i> Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        placeholder='Email...'
                                                        {...register('email', {
                                                            required: 'Email is required',
                                                            pattern: {
                                                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                                                message: 'Invalid email format'
                                                            }
                                                        })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                    />
                                                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                                </div>

                                                <div className="mb-6">
                                                    <label htmlFor="password" className="block text-lg font-medium mb-2">
                                                        <i className='bx bxs-lock-alt relative top-0.5'></i> Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            id="password"
                                                            placeholder='Password...'
                                                            {...register('password', {
                                                                required: 'Password is required',
                                                                minLength: {
                                                                    value: 8,
                                                                    message: 'Password must be at least 8 characters'
                                                                }
                                                            })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={togglePasswordVisibility}
                                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg"
                                                        >
                                                            {showPassword ? "🙉" : "🙈"}
                                                        </button>
                                                    </div>
                                                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                                                </div>

                                                <button type="submit" className="w-full max-w-[250px] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 active:scale-95">
                                                    Login
                                                </button>
                                            </form>
                                            <p className='text-xs my-2 font-semibold text-center'>If, You are a New user then, <button onClick={() => setLoginPage(prev => !prev)} className="text-[var(--span)]"> Signup</button> first.</p>
                                            <div className="social-auth-login w-full my-4 flex justify-evenly">
                                                <span className="social-auth shadow-lg w-10 h-10 flex justify-center items-center text-3xl bg-slate-400 rounded transition duration-200 hover:bg-slate-500 active:scale-95"><i className='bx bxl-google'></i></span>
                                                <span className="social-auth shadow-lg w-10 h-10 flex justify-center items-center text-3xl bg-slate-400 rounded transition duration-200 hover:bg-slate-500 active:scale-95"><i className='bx bxl-github'></i></span>
                                                <span className="social-auth shadow-lg w-10 h-10 flex justify-center items-center text-3xl bg-slate-400 rounded transition duration-200 hover:bg-slate-500 active:scale-95"><i className='bx bxl-linkedin' ></i></span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="max-w-sm mx-auto p-6  h-full" >
                                            <h2 className="text-3xl font-bold text-center mb-10">Sign Up</h2>
                                            <form onSubmit={handleSubmit(onSignupSubmit)} className='w-full flex flex-col justify-center items-center'>
                                                {/* Name Field */}
                                                <div className="mb-4">
                                                    <label htmlFor="name" className="block text-lg font-medium mb-2 "><i className='bx bxs-face icon relative top-0.5'></i> User Name</label>
                                                    <input
                                                        type="text"
                                                        id='name'
                                                        {...register('name', {
                                                            required: "Name is requird",
                                                        })}
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-md'
                                                    />
                                                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                                                </div>
                                                {/* Email Field */}
                                                <div className="mb-4 ">
                                                    <label htmlFor="email" className="block text-lg font-medium mb-2 "><i className='bx bxs-user-circle icon relative top-0.5'></i> Email</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        placeholder='Email...'
                                                        {...register('email', {
                                                            required: 'Email is required',
                                                            pattern: {
                                                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                                                message: 'Invalid email format'
                                                            }
                                                        })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md "
                                                    />
                                                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                                </div>

                                                {/* Password Field */}
                                                <div className="mb-6">
                                                    <label htmlFor="password" className="block text-lg font-medium mb-2"><i className='bx bxs-lock-alt relative top-0.5' ></i> Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            id="password"
                                                            placeholder='Password...'
                                                            {...register('password', {
                                                                required: 'Password is required',
                                                                minLength: {
                                                                    value: 8,
                                                                    message: 'Password must be at least 8 characters'
                                                                },
                                                                pattern: {
                                                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                                    message: 'Password must contain at least one letter, one number, and one special character (@, $, %, etc.)'
                                                                }
                                                            })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        />
                                                        {/* Toggle Visibility Button */}
                                                        <button
                                                            type="button"
                                                            onClick={togglePasswordVisibility}
                                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg">
                                                            {showPassword ? "🙉" : "🙈"}
                                                        </button>
                                                    </div>
                                                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                                                </div>

                                                {/* Submit Button */}
                                                <button type="submit" className="w-full max-w-[250px] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 active:scale-95">
                                                    Sign Up
                                                </button>
                                            </form>
                                            <p className='text-xs my-2 font-semibold text-center'>If, You have any account then, <button onClick={() => setLoginPage(prev => !prev)} className="text-[var(--span)]"> Login</button>.</p>
                                            <div className="social-auth-login w-full my-4 flex justify-evenly">
                                                <span className="social-auth shadow-lg w-10 h-10 flex justify-center items-center text-3xl bg-slate-400 rounded transition duration-200 hover:bg-slate-500 active:scale-95"><i className='bx bxl-google'></i></span>
                                                <span className="social-auth shadow-lg w-10 h-10 flex justify-center items-center text-3xl bg-slate-400 rounded transition duration-200 hover:bg-slate-500 active:scale-95"><i className='bx bxl-github'></i></span>
                                                <span className="social-auth shadow-lg w-10 h-10 flex justify-center items-center text-3xl bg-slate-400 rounded transition duration-200 hover:bg-slate-500 active:scale-95"><i className='bx bxl-linkedin' ></i></span>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key ={otpPage? "otp": "sign-up"}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="max-w-sm mx-auto p-6 h-full">
                                        <h2 className="text-3xl font-bold text-center mb-10">Enter OTP</h2>
                                        <p className="">Otp has been sent to your email.</p>
                                        <OTPInput onComplete ={onComplete}  correctOTP = {correctOTP} shake = {shake}/>
                                        <p className=""><span className='' onClick={() => setOtpPage(false)}><i className='bx bx-left-arrow-alt'></i></span> Go Back to Sign Up page.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
};

LoginSignup.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginSignup;

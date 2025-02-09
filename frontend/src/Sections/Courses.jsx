import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactLenis } from 'lenis/react';
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import Course_card2 from '../Components/Course_card2';


const Courses = ({ isLogin, onLogout }) => {
    const [selectedCourse, setSelectedCourse] = useState("");
    const navigate = useNavigate();

    const courses = [
        "Web Development",
        "Data Science",
        "Machine Learning",
        "Cyber Security",
        "UI/UX Design",
    ];

    const handleChange = (event) => {
        setSelectedCourse(event.target.value);
        console.log(event.target.value);
    };
    const navigateHome = ()=>{
        navigate('/');
    }

    return (
        <ReactLenis root>
            <div>
                <Header isLogin={isLogin} onLogout={onLogout} />
                <main className="relative top-10 flex flex-col items-center pt-6">
                    <div className="bg-slate-600 h-15 w-full flex items-center justify-between px-4 fixed z-10 shadow-2xl">
                        <button className="bg-white flex w-8 h-8 items-center justify-center rounded-full mr-2 hover:bg-slate-400 hover:scale-105 active:scale-95 transition duration-50 active:bg-slate-400 cursor-pointer" onClick={()=>navigateHome()}>
                            <span className="material-symbols-rounded">arrow_back</span>
                        </button>
                        <div className="flex items-center ">
                            <label htmlFor="course" className="text-md font-semibold text-center text-slate-200 mr-2">
                                Select a Course:
                            </label>
                            <select
                                id="course"
                                value={selectedCourse}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200 cursor-pointer"
                            >
                                <option value="" disabled>
                                    -- Choose a Course --
                                </option>
                                {courses.map((course, index) => (
                                    <option key={index} value={course} className='bg-slate-800'>
                                        {course}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="pt-20 flex flex-col w-full px-5 bg-[var(--b1)] min-h-screen">
                        <Course_card2/>
                        <Course_card2/>
                        <Course_card2/>
                    </div>
                </main>
            </div>
        </ReactLenis>
    )
}

Courses.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default Courses
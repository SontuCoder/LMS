import React from 'react'
import Home_Img from '../assets/College Home page pic 2.png';

const Hero = () => {
    return (
        <section className='home'>
            <div className="left-side-home  text-wrap w-[50%]">
                <h1 className="heading">
                    Gen<span className='text-[var(--nav_btn)]'>Z</span>Techno
                </h1>
                <p className='para'>
                    Learn, <span className='text-[var(--nav_btn)]'>Grow,</span> Succeed
                </p>
                <p className='para'>
                    Your Learning <span className='text-[var(--nav_btn)]'>Hub</span> Awaits!
                </p>
            </div>
            <div className="right-side-home flex flex-1 justify-center items-center relative">
                <div className="image-container relative w-[80%]">
                    <div className="blob w-[120%] h-[120%] absolute top-[50%] left-[50%] z-1 "></div>
                    <img src={Home_Img} alt="Students-Img" className='image w-[100%] relative z-2 '/>
                </div>
            </div>

        </section>
    )
}

export default Hero
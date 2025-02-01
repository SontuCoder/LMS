import React from 'react'
import Home_Img from '../assets/College Home page pic 2.png';
import {Button1} from '../Components/Buttons';

const Hero = () => {
    return (
        <div id="home" className="home scroll-mt-16">
            <section className='home-sec text-[var(--pt)]'>
            <div className="left-side-home text-wrap w-[50%]">
                <h1 className="heading">
                    Gen<span className='text-[var(--span)]'>Z</span>Techno
                </h1>
                <p className='para'>
                    Learn, <span className='text-[var(--span)]'>Grow,</span> Succeed
                </p>
                <p className='para mb-5'>
                    Your Learning <span className='text-[var(--span)]'>Hub</span> Awaits!
                </p>


                <Button1 href={'https://www.google.com'} lable={'All Courses'}  />
            </div>


            <div className="right-side-home flex flex-1 justify-center items-center relative w-[100%]">

                <div className="image-container relative h-[90%] w-[80%]">
                    <div className="blob w-[110%] h-[110%] absolute top-[50%] left-[50%] z-1 "></div>
                    <img src={Home_Img} alt="Students-Img" className='image w-[100%] relative z-2 '/>
                </div>
            </div>

        </section>
        </div>
    )
}

export default Hero
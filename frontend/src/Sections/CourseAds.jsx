import React from 'react'
import Home_Img from '../assets/College Home page pic 2.png'
import CourseCard from '../Components/Course_cards1';

const CourseAds = () => {
    return (
        <div className="course">
            {/* Waves */}
            <div className="custom-shape-divider-top-1738261877">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill-home"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill-home"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill-home"></path>
                </svg>
            </div>

            {/* background */}
            <div className="wrapper">
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
                <div className="round"></div>
            </div>

            <section className="content flex gap-4 mx-auto pt-20 sm:pt-10 pb-10 w-full lg:pt-20 flex-col sm:flex-row">
                <h2 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl sm:hidden">
                    Our <span className="text-[var(--span_home)]">Trending</span> Courses
                </h2>


                <div className="left-course sm:flex  sm:basis-[40%] md:basis-[30%] justify-center items-center relative z-4 hidden sm:visible flex-col">

                    <h2 className="text-center font-bold text-3xl sm:text-4xl  lg:text-5xl lg:mb-10 relative -top-10">
                        Our <span className="text-[var(--span_home)]">Trending</span> Courses
                    </h2>

                    <div className="image-container relative  w-[80%]">
                        <div className="blob w-[110%] h-[110%] absolute top-[100%] left-[100%] z-1 transform -translate-x-1/2 -translate-y-1/2"></div>
                        <img src={Home_Img} alt="Students-Img" className="image w-full relative z-2" />
                    </div>
                </div>


                <div className="right-course flex flex-wrap basis-[100%] sm:basis-[60%] md:basis-[70%] justify-evenly  items-center relative z-4 ">
                    <CourseCard
                        imageUrl="https://via.placeholder.com/300"
                        title="React Mastery"
                        description="Learn React from scratch and build real-world projects."
                        price={49.99}
                        discount="50%"
                    />
                    <CourseCard
                        imageUrl="https://via.placeholder.com/300"
                        title="React Mastery"
                        description="Learn React from scratch and build real-world projects."
                        price={49.99}
                        discount="50%"
                    />

                </div>
            </section>


        </div>
    )
}

export default CourseAds;
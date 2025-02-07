import { ReactLenis } from 'lenis/react';
import PropTypes from 'prop-types';

import CourseAds from "./Sections/CourseAds"
import FAQ from "./Sections/FAQ"
import Footer from "./Sections/Footer"
import Header from "./Sections/Header"
import Hero from "./Sections/Hero"
import Review from "./Sections/Review"

function App({isLogin,onLogout}) {

  return (
    <ReactLenis root>
      <div className="App">
        <Header isLogin={isLogin} onLogout={onLogout} />
        <main className="relative top-8 flex flex-col items-center pt-6">
          <Hero/>
          <CourseAds />
          <Review />
          <FAQ />
          <Footer />
        </main>
      </div>
    </ReactLenis>
  )
}

App.propTypes ={
    isLogin: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
}

export default App

import CourseAds from "./Sections/CourseAds"
import FAQ from "./Sections/FAQ"
import Footer from "./Sections/Footer"
import Header from "./Sections/Header"
import Hero from "./Sections/Hero"
import Review from "./Sections/Review"

function App() {

  return (
    <div className="App">
      <Header />
      <main className="relative top-8 flex flex-col items-center pt-6">
        <Hero />
        <CourseAds/>
        <Review />
        <FAQ/>
        <Footer/>
      </main>
    </div>
  )
}

export default App

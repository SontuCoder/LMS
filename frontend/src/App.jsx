import CourseAds from "./Sections/CourseAds"
import Header from "./Sections/Header"
import Hero from "./Sections/Hero"

function App() {

  return (
    <div className="App">
      <Header />
      <main className="relative top-8 flex flex-col items-center pt-6">
        <Hero />
        <CourseAds/>
      </main>
    </div>
  )
}

export default App
